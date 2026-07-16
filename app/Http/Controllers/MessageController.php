<?php

namespace App\Http\Controllers;

use App\Events\ConversationReadUpdated;
use App\Events\ConversationUnreadUpdated;
use App\Events\MessageSent;
use App\Events\UpdateLastMessage;
use App\Http\Requests\MessageStoreRequest;
use App\Http\Requests\UpdateLastReadRequest;
use App\Http\Resources\MessageResource;
use App\Models\Attachments;
use App\Models\ConversationMembers;
use App\Models\Conversations;
use App\Models\Messages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function store(MessageStoreRequest $req)
    {
        try {
            $user_id = Auth::user()->id;
            $images = $req->file('images');
            $message = Messages::query()->create([
                ...$req->safe()->except(['images', 'images.*']),
                'sender_id' => $user_id,
            ]);
            if ($images) {
                foreach ($images as $image) {
                    $path = $image->store('chat-images', 'public');
                    Attachments::query()->create([
                        'message_id' => $message->id,
                        'size' => $image->getSize(),
                        'type' => $image->getMimeType(),
                        'url' => $path
                    ]);
                }
            }
            Conversations::query()->where('id', '=', $message->conversation_id)->update([
                'updated_at' => now()
            ]);
            broadcast(new MessageSent($message))->toOthers();
            broadcast(new ConversationUnreadUpdated($message->conversation, $user_id))->toOthers();
            broadcast(new UpdateLastMessage($message, $user_id))->toOthers();
            return response()->json([
                'success' => true,
                'message' => "",
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function get(Conversations $conversation)
    {
        try {
            $user = Auth::user();
            $isMember = $conversation->members()->where('users.id', $user->id)->exists();
            if (!$isMember) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized',
                ], 403);
            }
            $messages = $conversation->messages()->with([
                'sender',
                'attachments',
                'replyTo',
            ])->latest()->paginate(10);
            return MessageResource::collection($messages);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    public function updateLastRead(Conversations $conversation)
    {
        try {
            $user = Auth::user();
            $last_read_at = now();
            $conversation->members()->updateExistingPivot(
                $user->id,
                [
                    'last_read_at' => $last_read_at
                ]
            );
            broadcast(new ConversationReadUpdated($conversation, $user->id, $last_read_at));
            return response()->json([
                'success' => true,
                'message' => ''
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}

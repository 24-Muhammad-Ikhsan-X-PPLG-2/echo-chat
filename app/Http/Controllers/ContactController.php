<?php

namespace App\Http\Controllers;

use App\Events\ContactUpdate;
use App\Http\Requests\AddContactRequest;
use App\Models\Conversations;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function add(AddContactRequest $req)
    {
        try {
            $userA = Auth::user();

            if ($req->string('email') == $userA->email) {
                return response()->json([
                    'success' => false,
                    'field' => [
                        'email' => 'Cannot add yourself.',
                    ],
                    'data' => null
                ]);
            }

            $userB = User::query()->where('email', '=', $req->string('email'))->first();

            if (!$userB) {
                return response()->json([
                    'success' => false,
                    'field' => [
                        'email' => 'Email not found.',
                    ],
                    'data' => null,
                ]);
            }

            // Buat direct_key
            $ids = [$userA->id, $userB->id];
            sort($ids);

            $directKey = implode(':', $ids);

            // Cari conversation
            $conversation = Conversations::query()->where('direct_key', '=', $directKey)->first();

            if ($conversation) {
                return response()->json([
                    'success' => false,
                    'field' => [
                        'email' => 'Conversation already exists.',
                    ],
                    'data' => null,
                ]);
            }

            // Buat conversation baru
            $conversation = Conversations::query()->create([
                'type' => 'direct',
                'direct_key' => $directKey,
            ]);

            $conversation->members()->attach([
                $userA->id,
                $userB->id,
            ]);

            broadcast(new ContactUpdate($conversation, $userA))->toOthers();

            return response()->json([
                'success' => true,
                'field' => null,
                'data' => [
                    'id' => $conversation->id,
                    'type' => $conversation->type,

                    'contact' => [
                        'id' => $userB->id,
                        'username' => $userB->username,
                        'avatar_url' => $userB->avatar_url,
                        'public_key' => $userB->public_key,
                    ],

                    'last_read_at' => null,

                    'last_message' => null,

                    'last_message_at' => null,
                    'unread_count' => 0,
                    'updated_at' => $conversation->updated_at
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'field' => null,
                'message' => $e->getMessage(),
                'data' => null,
            ], 500);
        }
    }
}

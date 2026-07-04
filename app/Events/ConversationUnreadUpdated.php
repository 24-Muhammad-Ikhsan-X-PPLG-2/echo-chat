<?php

namespace App\Events;

use App\Http\Resources\ConversationResource;
use App\Models\Conversations;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ConversationUnreadUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Conversations $conversation, public string $userId)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return $this->conversation->members->map(function ($member) {
            return new PrivateChannel("user.{$member->id}");
        })->all();
    }
    public function broadcastAs()
    {
        return 'conversation.unread';
    }
    public function broadcastWith()
    {
        return [
            'conversation_id' => $this->conversation->id,
            'user_id' => $this->userId,
        ];
    }
}

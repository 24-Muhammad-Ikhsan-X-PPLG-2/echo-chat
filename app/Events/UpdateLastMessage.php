<?php

namespace App\Events;

use App\Models\Messages;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UpdateLastMessage implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Messages $message, public String $user_id)
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
        return $this->message->conversation->members->map(function ($member) {
            return new PrivateChannel("user.{$member->id}");
        })->all();
    }
    public function broadcastAs()
    {
        return 'lastMessage.update';
    }
    public function broadcastWith()
    {
        return [
            'sender_id' => $this->user_id,
            'message' => [
                'content' => $this->message->content,
                'iv' => $this->message->iv,
                'type' => $this->message->message_type,
            ],
            'conversation_id' => $this->message->conversation_id,
            'public_key' => $this->message->sender->public_key
        ];
    }
}

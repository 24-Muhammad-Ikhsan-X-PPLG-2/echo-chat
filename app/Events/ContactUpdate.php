<?php

namespace App\Events;

use App\Models\Conversations;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ContactUpdate implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Conversations $conversation, public User $user)
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
        return 'contact.update';
    }
    public function broadcastWith()
    {
        return [
            'id' => $this->conversation->id,
            'type' => $this->conversation->type,

            'contact' => [
                'id' => $this->user->id,
                'username' => $this->user->username,
                'avatar_url' => $this->user->avatar_url,
                'public_key' => $this->user->public_key,
            ],

            'last_read_at' => null,

            'last_message' => null,

            'last_message_at' => null,
            'unread_count' => 0,
            'updated_at' => $this->conversation->updated_at,
        ];
    }
}

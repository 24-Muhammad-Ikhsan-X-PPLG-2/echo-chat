<?php

namespace App\Events;

use App\Models\Conversations;
use Carbon\Carbon;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ConversationReadUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public Conversations $conversation, public string $userId, public $lastReadAt)
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
        return 'conversation.read';
    }
    public function broadcastWith()
    {
        return [
            'conversation_id' => $this->conversation->id,
            'user_id' => $this->userId,
            'last_read_at' => $this->lastReadAt,
        ];
    }
}

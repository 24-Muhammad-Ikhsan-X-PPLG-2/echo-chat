<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConversationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $request->user();

        $contact = $this->members
            ->firstWhere('id', '!=', $user->id);
        $me = $this->members->firstWhere('id', $user->id);
        $unreadCount = $this->messages()
            ->where('sender_id', '!=', $user->id)
            ->when(
                $me?->pivot?->last_read_at,
                fn($q, $lastReadAt) => $q->where('created_at', '>', $lastReadAt)
            )
            ->count();
        $lastMessage = $this->messages()->latest('created_at')->first([
            'content',
            'iv',
            'sender_id'
        ]);
        return [
            'id' => $this->id,
            'type' => $this->type,

            'contact' => $contact ? [
                'id' => $contact->id,
                'username' => $contact->username,
                'avatar_url' => $contact->avatar_url,
                'public_key' => $contact->public_key,
                'last_seen' => $contact->last_seen,
            ] : null,

            'last_read_at' => $contact->pivot?->last_read_at,

            'last_message' => $lastMessage,

            'last_message_at' => $this->last_message_at,
            'unread_count' => $unreadCount,
            'updated_at' => $this->updated_at,
        ];
    }
}

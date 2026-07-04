<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'content' => $this->content,

            'type' => $this->message_type,

            'sender' => [
                'id' => $this->sender->id,
                'username' => $this->sender->username,
                'avatar_url' => $this->sender->avatar_url,
                'public_key' => $this->sender->public_key,
            ],

            'attachments' => $this->attachments,

            'reply_to' => $this->replyTo,
            'iv' => $this->iv,

            'created_at' => $this->created_at,
        ];
    }
}

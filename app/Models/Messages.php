<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'conversation_id',
    'sender_id',
    'content',
    'message_type',
    'reply_to',
    'iv'
)]
class Messages extends Model
{
    use HasUuids;

    public function conversation()
    {
        return $this->belongsTo(
            Conversations::class,
            'conversation_id'
        );
    }
    public function sender()
    {
        return $this->belongsTo(
            User::class,
            'sender_id'
        );
    }
    public function attachments()
    {
        return $this->hasMany(
            Attachments::class,
            'message_id'
        );
    }
    public function replyTo()
    {
        return $this->belongsTo(
            Messages::class,
            'reply_to'
        );
    }
    public function replies()
    {
        return $this->hasMany(
            Messages::class,
            'reply_to'
        );
    }
    public function reads()
    {
        return $this->hasMany(
            MessageReads::class,
            'message_id'
        );
    }
}

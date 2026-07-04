<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['type', 'direct_key', 'name', 'last_message_id', 'last_message_at', 'updated_at'])]
class Conversations extends Model
{
    use HasUuids;

    public function members()
    {
        return $this->belongsToMany(
            User::class,
            'conversation_members',
            'conversation_id',
            'user_id'
        )->using(ConversationMembers::class)->withPivot('last_read_at');
    }
    public function messages()
    {
        return $this->hasMany(
            Messages::class,
            'conversation_id'
        );
    }
    public function lastMessage()
    {
        return $this->belongsTo(
            Messages::class,
            'last_message_id'
        );
    }
}

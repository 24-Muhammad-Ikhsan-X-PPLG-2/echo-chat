<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Fillable([
    'conversation_id',
    'user_id',
    'role',
    'joined_at',
    'last_read_at'
])]
class ConversationMembers extends Pivot
{
    use HasUuids;
    protected $table = 'conversation_members';

    public function conversation()
    {
        return $this->belongsTo(
            Conversations::class,
            'conversation_id'
        );
    }
    public function user()
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }
    protected $casts = [
        'last_read_at' => 'datetime',
    ];
}

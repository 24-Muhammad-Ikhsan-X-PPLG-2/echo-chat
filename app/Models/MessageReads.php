<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'message_id',
    'user_id',
    'read_at',
)]
class MessageReads extends Model
{
    public $timestamps = false;

    public function message()
    {
        return $this->belongsTo(
            Messages::class,
            'message_id'
        );
    }
    public function user()
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }
}

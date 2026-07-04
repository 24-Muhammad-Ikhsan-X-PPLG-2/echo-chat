<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(
    'message_id',
    'url',
    'type',
    'size',
)]
class Attachments extends Model
{
    public function message()
    {
        return $this->belongsTo(
            Messages::class,
            'message_id'
        );
    }
}

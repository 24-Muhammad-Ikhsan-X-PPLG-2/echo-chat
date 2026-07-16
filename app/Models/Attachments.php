<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[Fillable(
    'message_id',
    'url',
    'type',
    'size',
)]
class Attachments extends Model
{
    public function getUrlAttribute($value): string
    {
        return Storage::disk('public')->url($value);
    }
    public function message()
    {
        return $this->belongsTo(
            Messages::class,
            'message_id'
        );
    }
}

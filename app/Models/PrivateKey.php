<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'user_id',
    'key',
    'iv',
    'salt'
])]
class PrivateKey extends Model
{
    use HasUuids;
    public $table = 'private_key';
    public function user()
    {
        return $this->belongsTo(
            User::class,
            'user_id'
        );
    }
}

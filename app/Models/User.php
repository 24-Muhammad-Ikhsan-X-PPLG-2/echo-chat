<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

/**
 * @property int $id
 * @property string $username
 * @property string $full_name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['username', 'full_name', 'email', 'password', 'public_key', 'last_seen'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasUuids;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    protected function username(): Attribute
    {
        return Attribute::make(
            set: fn($val) => strtolower(str_replace(' ', '', $val))
        );
    }
    public function conversations()
    {
        return $this->belongsToMany(
            Conversations::class,
            'conversation_members',
            'user_id',
            'conversation_id'
        );
    }
    public function messages()
    {
        return $this->hasMany(
            Messages::class,
            'sender_id'
        );
    }
    public function conversationMembers()
    {
        return $this->hasMany(
            ConversationMembers::class,
            'user_id'
        );
    }
}

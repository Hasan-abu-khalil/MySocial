<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

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

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    // التعليقات
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    // الإعجابات
    public function likes(): HasMany
    {
        return $this->hasMany(Like::class);
    }

    // المتابعون
    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'follows',
            'following_id',
            'follower_id'
        );
    }

    // المتابعين الذين يتابعهم المستخدم
    public function following(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'follows',
            'follower_id',
            'following_id'
        );
    }

    public function isFollowing(User $user): bool
    {
        return $this->following()
            ->where('following_id', $user->id)
            ->exists();
    }


    // القصص
    public function stories(): HasMany
    {
        return $this->hasMany(Story::class);
    }

    // الإشعارات
    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }
}

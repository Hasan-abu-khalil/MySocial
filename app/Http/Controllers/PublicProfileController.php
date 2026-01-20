<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class PublicProfileController extends Controller
{
    public function show($name)
    {
        $profileUser = User::where('name', $name)->firstOrFail();

        $canSeePosts = !$profileUser->is_private || auth()->user()?->isFollowing($profileUser);
        $posts = $canSeePosts ? $profileUser->posts()->with('media')->latest()->get() : collect();
        $isFollowing = auth()->check()
            ? auth()->user()->isFollowing($profileUser)
            : false;

        return Inertia::render('Profile/Public', [
            'profileUser' => $profileUser,
            'posts' => $posts,
            'canSeePosts' => $canSeePosts,
            'is_followed_by_auth' => $isFollowing,
        ]);

    }

}




 
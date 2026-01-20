<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with(['user', 'media', 'likes', 'comments.user'])
            ->latest()
            ->get();


        return Inertia::render('Posts/Feed', [
            'posts' => $posts,
            'authUser' => auth()->user(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'nullable|string|max:1000',
            // 'media.*' => 'nullable|mimes:jpg,jpeg,png,gif,mp4,mov,avi|max:20480',
        ]);

        $post = Post::create([
            'user_id' => auth()->id(),
            'content' => $request->content,
        ]);

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                $path = $file->store('posts', 'public');
                $type = str_contains($file->getMimeType(), 'video') ? 'video' : 'image';

                $post->media()->create([
                    'path' => $path,
                    'type' => $type,
                ]);
            }
        }

        return redirect()->route('feed');
    }
}

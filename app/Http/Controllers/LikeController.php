<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function toggle(Post $post)
    {
        $user = auth()->user();

        $existingLike = $post->likes()
            ->where('user_id', $user->id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
        } else {
            $post->likes()->create([
                'user_id' => $user->id,
            ]);
        }

        // ✅ هذا هو الحل
        return back();
    }
}

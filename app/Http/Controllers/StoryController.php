<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\StoryView;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoryController extends Controller
{
    public function index()
    {
        // جلب القصص الصالحة
        $stories = Story::with(['user', 'views'])
            ->where('expires_at', '>', now())
            ->latest()
            ->get();

        return Inertia::render('Stories/StoriesFeed', [
            'stories' => $stories,
            'authUser' => auth()->user(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'media' => 'required|file|mimes:jpg,jpeg,png,gif,mp4,mov,avi|max:20480'
        ]);

        $file = $request->file('media');
        $type = str_contains($file->getMimeType(), 'video') ? 'video' : 'image';
        $path = $file->store('stories', 'public');

        Story::create([
            'user_id' => auth()->id(),
            'type' => $type,
            'media_path' => $path,
            'expires_at' => now()->addHours(24),
        ]);

        return redirect()->back();
    }

    public function markViewed(Story $story)
    {
        // تسجيل المشاهدة
        StoryView::firstOrCreate([
            'story_id' => $story->id,
            'user_id' => auth()->id(),
        ]);

        return redirect()->back();
    }
}

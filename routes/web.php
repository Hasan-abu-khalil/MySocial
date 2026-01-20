<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicProfileController;
use App\Http\Controllers\StoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowController;
use Inertia\Inertia;


Route::middleware('auth')->group(function () {
    Route::get('/feed', [PostController::class, 'index'])->name('feed');
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::post('/posts/{post}/like', [LikeController::class, 'toggle']);
    Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
    Route::post('/users/{user}/follow', [FollowController::class, 'toggle']);

    // Stories
    Route::get('/stories', [StoryController::class, 'index'])->name('stories.index');
    Route::get('/stories/create', function () {
        return Inertia::render('Stories/CreateStory');
    })->name('stories.create');
    Route::post('/stories', [StoryController::class, 'store'])->name('stories.store');
    Route::post('/stories/{story}/view', [StoryController::class, 'markViewed'])->name('stories.view');

    Route::get('/users/{name}', [PublicProfileController::class, 'show'])
        ->name('profile.public');
    Route::post('/users/{user}/follow', [FollowController::class, 'toggle'])
        ->middleware('auth');


});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

<?php

namespace App\Http\Controllers;

use App\Models\StoryView;
use App\Http\Requests\StoreStoryViewRequest;
use App\Http\Requests\UpdateStoryViewRequest;

class StoryViewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStoryViewRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(StoryView $storyView)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StoryView $storyView)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStoryViewRequest $request, StoryView $storyView)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StoryView $storyView)
    {
        //
    }
}

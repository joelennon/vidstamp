<?php

namespace App\Http\Controllers\Api;

use App\Job;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class JobsController extends Controller
{
    public function index(Request $request)
    {
        $jobs = $request->user()->jobs()
            ->orderBy('updated_at', 'desc')
            ->get();

        return $jobs;
    }

    public function store(Request $request)
    {
        $video_path = $request->video->store('videos');

        $job = $request->user()->jobs()->create(
            [
                'video_path' => $video_path,
                'video_size' => Storage::size($video_path),
                'video_mime' => Storage::mimeType($video_path),
            ]
        );

        return $job;
    }

    public function show(Request $request, Job $job)
    {
        $this->authorize('view', $job);

        return $job;
    }
}

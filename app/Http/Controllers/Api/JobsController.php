<?php

namespace App\Http\Controllers\Api;

use App\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Jobs\ApplyWatermarkToVideo;
use Illuminate\Support\Facades\Log;
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
        $video = $request->video;
        $video_filename = $video->getClientOriginalName();
        $video_path = $video->store('videos');    

        $job = $request->user()->jobs()->create(
            [
                'video_filename' => $video_filename,
                'video_path' => $video_path,
                'video_size' => Storage::size($video_path),
                'video_mime' => Storage::mimeType($video_path),
                'status' => 'Queued',
                'queued_at' => Carbon::now(),
            ]
        );

        dispatch(new ApplyWatermarkToVideo($job));

        return $job;
    }

    public function show(Request $request, Job $job)
    {
        $this->authorize('view', $job);

        return $job;
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Job;
use App\Jobs\ApplyWatermarkToVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
        $this->validate(
            $request, 
            [
                'video' => 'mimes:mp4|max:10240',
                'watermark' => 'image|max:1024|dimensions:min_width=50,min_height=50,max_width=500,max_height=350',
            ]
        );

        $video = $request->video;
        $video_filename = $video->getClientOriginalName();
        $video_path = $video->store('videos');

        $watermark_path = $request->watermark->store('watermarks');

        $job = $request->user()->jobs()->create(
            [
                'video_filename' => $video_filename,
                'video_path' => $video_path,
                'watermark_path' => $watermark_path,
                'opacity' => $request->opacity ?: '0.5',
                'position' => $request->position ?: 'bottom-right',
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

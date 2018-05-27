<?php

namespace App\Http\Controllers\Api;

use App\Job;
use Illuminate\Http\Request;
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
        $video_path = $request->video->store('videos');

        $job = $request->user()->jobs()->create(
            [
                'video_path' => $video_path,
                'video_size' => Storage::size($video_path),
                'video_mime' => Storage::mimeType($video_path),
            ]
        );

        // Run job (move to queued job)
        $inputVideo = storage_path() . "/app/$job->video_path";
        $watermarkImage = public_path() . "/img/watermark.png";
        $outputVideo = str_replace('/videos/', '/videos-watermarked/', $inputVideo);
        
        $filter = '"[1]lut=a=val*0.5[a];[0][a]overlay=W-w-5:H-h-5"';
        $command = "ffmpeg -i $inputVideo -i $watermarkImage -filter_complex $filter $outputVideo";
        
        $result = exec($command, $output, $exitCode);

        Log::info($exitCode);
        Log::info($result);
        Log::info(json_encode($output));

        return $job;
    }

    public function show(Request $request, Job $job)
    {
        $this->authorize('view', $job);

        return $job;
    }
}

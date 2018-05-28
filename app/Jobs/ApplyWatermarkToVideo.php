<?php

namespace App\Jobs;

use App\Job;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class ApplyWatermarkToVideo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $watermarkJob;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Job $job)
    {
        $this->watermarkJob = $job;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $job = $this->watermarkJob;
        $job->status = 'Processing';
        $job->started_at = Carbon::now();
        $job->save();

        $inputPath = $job->video_path;
        $outputPath = str_replace('videos/', 'videos-watermarked/', $inputPath);

        $inputVideo = storage_path() . "/app/$inputPath";        
        $watermarkImage = storage_path() . "/app/$job->watermark_path";
        $outputVideo = storage_path() . "/app/$outputPath";

        $opacity = $job->opacity;
        $position = $job->position;

        $overlay = "W-w-50:H-h-50";

        if($position === 'top-right') {
            $overlay = "W-w-50:50";
        } else if($position === 'top-left') {
            $overlay = "50:50";
        } else if($position === 'bottom-left') {
            $overlay = "50:H-h-50";
        }

        // $filter = '"[1]lut=a=val*' . $opacity . '[a];[0][a]overlay=W-w-50:H-h-50"';
        $filter = '"[1]lut=a=val*' . $opacity . '[a];[0][a]overlay=' . $overlay . '"';
        $command = "ffmpeg -i $inputVideo -i $watermarkImage -filter_complex $filter $outputVideo";

        $result = exec($command, $output, $exitCode);

        Log::info("Result: $result");
        Log::info("Exit Code: $exitCode");
        Log::info("Output: " . json_encode($output));

        if ($exitCode === 0) {
            $job->output_video_path = $outputPath;
            $job->status = 'Complete';            
        } else {
            $job->status = 'Failed';
        }
        
        $job->ended_at = Carbon::now();
        $job->save();
    }
}

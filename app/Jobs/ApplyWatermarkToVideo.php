<?php

namespace App\Jobs;

use App\Job;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Carbon;
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
        $watermarkImage = public_path() . "/img/watermark.png";
        $outputVideo = storage_path() . "/app/$outputPath";

        $filter = '"[1]lut=a=val*0.5[a];[0][a]overlay=W-w-5:H-h-5"';
        $command = "ffmpeg -i $inputVideo -i $watermarkImage -filter_complex $filter $outputVideo";

        $result = exec($command, $output, $exitCode);


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

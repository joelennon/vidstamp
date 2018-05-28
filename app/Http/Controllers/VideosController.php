<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Job;
use Illuminate\Http\Request;

class VideosController extends Controller
{
    public function show(Request $request, Job $job)
    {
        $this->authorize('view', $job);

        $outputFile = $request->query('output') == '1';
        $downloadFile = $request->query('dl') == '1';

        $path = storage_path() . "/app/" .
            ($outputFile ? $job->output_video_path : $job->video_path);
        
        return $downloadFile ? response()->download($path, $job->video_filename) : response()->file($path);
    }
}

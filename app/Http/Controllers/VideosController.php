<?php

namespace App\Http\Controllers;

use App\Job;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VideosController extends Controller
{
    public function show(Request $request, Job $job)
    {        
        $this->authorize('view', $job);        
        $path = storage_path() . "/app/$job->video_path";        
        
        return response()->file($path);
    }
}

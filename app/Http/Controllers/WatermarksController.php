<?php

namespace App\Http\Controllers;

use App\Job;
use Illuminate\Http\Request;

class WatermarksController extends Controller
{
    public function show(Request $request, Job $job)
    {
        $this->authorize('view', $job);

        $downloadFile = $request->query('dl') == '1';
        $path = storage_path() . "/app/$job->watermark_path";
        
        return $downloadFile ? response()->download($path) : response()->file($path);
    }
}

<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        $job = $request->user()->jobs()->create();

        return $job;
    }
}

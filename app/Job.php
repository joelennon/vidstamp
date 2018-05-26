<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = [
        'video_path', 'video_size', 'video_mime',
    ];
    
}

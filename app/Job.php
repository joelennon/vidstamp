<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = [
        'video_path', 'video_size', 'video_mime',
    ];

    protected $appends = [
        'human_video_size',
    ];

    public function getHumanVideoSizeAttribute()
    {
        if ($bytes = $this->video_size) {
            $units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];

            for ($i = 0; $bytes > 1024; $i++) {
                $bytes /= 1024;
            }

            return round($bytes, 2) . ' ' . $units[$i];
        }
        
        return null;
    }
}

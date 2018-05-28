<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = [
        'video_filename', 'status', 'video_path', 'watermark_path',
        'opacity', 'position',
        'video_size', 'video_mime',
        'queued_at',
    ];

    protected $appends = [
        'human_video_size', 'formatted_opacity', 'formatted_position', 'job_duration',
    ];

    protected $dates = [
        'queued_at', 'started_at', 'ended_at',
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

    public function getFormattedOpacityAttribute()
    {
        return $this->opacity * 100 . '%';
    }

    public function getFormattedPositionAttribute()
    {
        return ucwords(str_replace('-', ' ', $this->position));
    }

    public function getJobDurationAttribute()
    {
        if($this->started_at && $this->ended_at) {
            return $this->started_at->diffForHumans($this->ended_at, true);
        }

        return null;
    }
}

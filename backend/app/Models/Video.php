<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $fillable = [
        'title',
        'type',
        'video_url',
        'file_path',
        'order',
        'is_active',
    ];
}

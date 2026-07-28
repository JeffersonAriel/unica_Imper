<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Video;

class VideoSeeder extends Seeder
{
    public function run(): void
    {
        Video::firstOrCreate(
            ['video_url' => 'https://www.youtube.com/watch?v=ScMzIvxBSi4'],
            [
                'title' => 'Assista ao manifesto Única',
                'type' => 'youtube',
                'order' => 0,
                'is_active' => true,
            ]
        );
    }
}

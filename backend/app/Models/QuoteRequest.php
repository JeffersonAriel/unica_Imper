<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuoteRequest extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 
        'area_size', 'geometry', 'details',
        'surface_type', 'condition',
        'thickness', 'purpose', 'exposure',
        'location', 'accessibility', 'infrastructure',
        'photos', 'status'
    ];

    protected $casts = [
        'photos' => 'array',
    ];
}

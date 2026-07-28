<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;
use App\Models\Testimonial;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/testimonials', function () {
    return Testimonial::where('is_active', true)
        ->orderBy('sort_order')
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($testimonial) {
            // Se o driver for local, a imagem fica em /storage/testimonials/...
            $testimonial->image_url = url('storage/' . $testimonial->image_path);
            return $testimonial;
        });
});

Route::post('/contact', [ContactController::class, 'store']);
Route::post('/quotes', [\App\Http\Controllers\Api\QuoteRequestController::class, 'store']);

// Public endpoints for frontend
Route::get('/gallery', function () {
    return App\Models\GalleryImage::where('is_active', true)->orderBy('order', 'asc')->get();
});

Route::get('/services', function () {
    return App\Models\Service::all();
});

Route::get('/videos', function () {
    return App\Models\Video::where('is_active', true)->orderBy('order', 'asc')->get();
});

Route::get('/settings', function () {
    return App\Models\Setting::all()->pluck('value', 'key');
});

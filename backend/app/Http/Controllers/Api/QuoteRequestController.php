<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QuoteRequest;
use Illuminate\Http\Request;

class QuoteRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:50',
            'area_size' => 'nullable|string|max:255',
            'geometry' => 'nullable|string|max:255',
            'details' => 'nullable|string',
            'surface_type' => 'nullable|string|max:255',
            'condition' => 'nullable|string',
            'thickness' => 'nullable|string|max:255',
            'purpose' => 'nullable|string|max:255',
            'exposure' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'accessibility' => 'nullable|string|max:255',
            'infrastructure' => 'nullable|string|max:255',
            'photos' => 'nullable|array',
            'photos.*' => 'image|mimes:jpeg,png,jpg,webp|max:5120', // max 5MB
        ]);

        $photoPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $path = $photo->store('quotes', 'public');
                $photoPaths[] = $path;
            }
        }

        $quote = QuoteRequest::create(array_merge($validated, [
            'photos' => $photoPaths,
            'status' => 'novo'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Orçamento enviado com sucesso!',
            'quote_id' => $quote->id
        ], 201);
    }
}

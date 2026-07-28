<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|min:10|max:20',
            'message' => 'required|string|min:10',
        ]);

        $lead = Lead::create([
            ...$validated,
            'status' => 'novo'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Solicitação recebida com sucesso.',
            'lead_id' => $lead->id
        ], 201);
    }
}

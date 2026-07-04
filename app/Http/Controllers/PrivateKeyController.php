<?php

namespace App\Http\Controllers;

use App\Models\PrivateKey;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PrivateKeyController extends Controller
{
    public static function store(String $key, String $iv, String $salt, String $user_id): void
    {
        PrivateKey::query()->create([
            'key' => $key,
            'iv' => $iv,
            'salt' => $salt,
            'user_id' => $user_id
        ]);
    }
    public function get()
    {
        try {
            $user = Auth::user();
            $privateKey = PrivateKey::query()->where('user_id', $user->id)->firstOrFail();
            return response()->json([
                'message' => 'found.',
                'data' => $privateKey
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'not found.',
                'data' => null,
            ], 404);
        }
    }
}

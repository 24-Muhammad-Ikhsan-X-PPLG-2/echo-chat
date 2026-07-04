<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LastSeenController extends Controller
{
    public function update()
    {
        try {
            $user = Auth::user();
            User::query()->where('id', '=', $user->id)->update([
                'last_seen' => now()
            ]);
            return response()->json([
                'success' => true,
                'message' => 'success.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
}

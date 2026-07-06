<?php

namespace App\Http\Controllers;

use App\Events\LastSeenUpdated;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LastSeenController extends Controller
{
    public function update()
    {
        try {
            $user = Auth::user();
            $now = now();
            User::query()->where('id', '=', $user->id)->update([
                'last_seen' => $now
            ]);
            broadcast(new LastSeenUpdated($user->id, $now))->toOthers();
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

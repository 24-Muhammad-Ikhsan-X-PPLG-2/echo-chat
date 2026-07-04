<?php

namespace App\Http\Controllers;

use App\Events\Typing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TypingController extends Controller
{
    public function on(String $conversation_id)
    {
        try {
            $user = Auth::user();
            broadcast(new Typing($conversation_id, $user->id, true))->toOthers();
            return response()->json([
                'success' => true,
                'message' => 'success.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
    public function off(String $conversation_id)
    {
        try {
            $user = Auth::user();
            broadcast(new Typing($conversation_id, $user->id, false))->toOthers();
            return response()->json([
                'success' => true,
                'message' => 'success.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConversationResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if (!$user) {
            return Inertia::render('welcome');
        }

        $conversations = $user->conversations()
            ->with([
                'members',
                'lastMessage'
            ])
            ->get();
        return Inertia::render('chat', [
            'conversations' => ConversationResource::collection($conversations),
        ]);
    }
    public function landing()
    {
        return Inertia::render('welcome');
    }
}

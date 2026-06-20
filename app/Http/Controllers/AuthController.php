<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('auth/signin');
    }
    public function loginP(LoginRequest $req)
    {
        $cred = $req->safe()->only([
            'email',
            'password'
        ]);
        $rememberMe = $req->boolean('remember');
        if (!Auth::attempt($cred, $rememberMe)) {
            return redirect('/auth/signin')->withErrors([
                'email' => "Email or password invalid.",
                'password' => "Email or password invalid.",
            ]);
        }
        $req->session()->regenerate();
        return redirect('/');
    }
}

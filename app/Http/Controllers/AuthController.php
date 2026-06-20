<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
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
            return back()->withErrors([
                'email' => "Email or password invalid.",
                'password' => "Email or password invalid.",
            ]);
        }
        $req->session()->regenerate();
        return redirect()->intended('/');
    }
    public function register()
    {
        return Inertia::render('auth/signup');
    }
    public function registerP(LoginRequest $req)
    {
        User::query()->create($req->validated());
        return redirect('/auth/signin')->with('success', 'Account created successfully. Please sign in to continue.');
    }
}

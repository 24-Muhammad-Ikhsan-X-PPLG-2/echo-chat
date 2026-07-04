<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LastSeenController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PrivateKeyController;
use App\Http\Controllers\TypingController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index']);
Route::prefix('auth')->middleware(['guest'])->group(function () {
    Route::get('/signin', [AuthController::class, 'login'])->name('login');
    Route::post('/signin', [AuthController::class, 'loginP']);
    Route::get('/signup', [AuthController::class, 'register'])->name('register');
    Route::post('/signup', [AuthController::class, 'registerP']);
});
Route::middleware(['auth'])->group(function () {
    Route::prefix('conversations')->group(function () {
        Route::get('/{conversation}/messages', [MessageController::class, 'get']);
        Route::post('/{conversation}/messages', [MessageController::class, 'store']);
        Route::patch('/{conversation}/read', [MessageController::class, 'updateLastRead']);
        Route::get('/{conversation}/typing/on', [TypingController::class, 'on']);
        Route::get('/{conversation}/typing/off', [TypingController::class, 'off']);
    });
    Route::get('/key/get', [PrivateKeyController::class, 'get']);
    Route::patch('/last_seen/update', [LastSeenController::class, 'update']);
    Route::post('/contact/add', [ContactController::class, 'add']);
});

Route::get('/landing', [HomeController::class, 'landing']);

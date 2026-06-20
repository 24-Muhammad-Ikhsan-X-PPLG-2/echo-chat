<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index']);
Route::prefix('auth')->middleware(['guest'])->group(function () {
    Route::get('/signin', [AuthController::class, 'login']);
});

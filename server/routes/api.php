<?php

use App\Http\Controllers\Shared\AuthController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v0.1'], function () {

  Route::group(['prefix' => 'auth'], function () {
    Route::middleware('custom.guest')->group(function () {
      Route::post('login', [AuthController::class, 'login']);
      Route::post('register', [AuthController::class, 'register']);
    });

    Route::middleware('cookie.auth')->group(function () {
      Route::post('logout', [AuthController::class, 'logout']);
      Route::post('me', [AuthController::class, 'me']);
    });
  });
});


Route::middleware('role:admin')->group(function () {
});

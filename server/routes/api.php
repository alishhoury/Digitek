<?php

use App\Http\Controllers\Customer\OrderController;
use App\Http\Controllers\Customer\ProductController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Customer\UserController;
use App\Http\Controllers\Customer\NotificationController;
use App\Http\Controllers\Shared\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Shared\Controller;
use Illuminate\Http\Request;

Route::group(['prefix' => 'v0.1', 'middleware' => 'throttle:60,1'], function () {

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

  Route::get('products', [ProductController::class, 'index']);
  Route::get('products/{product}', [ProductController::class, 'show']);


  Route::middleware('cookie.auth')->group(function () {
    Route::put('users/{user}', [UserController::class, 'update']);

    Route::post('orders', [OrderController::class, 'store']);
    Route::get('getUserOrders', [OrderController::class, 'getUserOrders']);
    Route::get('getByOrderNumber/{order_number}', [OrderController::class, 'getByOrderNumber']);
    Route::post('payOrder/{order}', [OrderController::class, 'payOrder']);
    Route::get('orders/{order}', [OrderController::class, 'show']);

    Route::get('notifications', [NotificationController::class, 'view']);
    Route::delete('notifications/clear', [NotificationController::class, 'clear']);

    Route::middleware('role:admin')->group(function () {
      Route::get('orders', [AdminOrderController::class, 'index']);
      Route::put('orders/{order}', [AdminOrderController::class, 'update']);

      Route::get('stock', [AdminProductController::class, 'index']);
      Route::get('retrieveProducts/{product}', [AdminProductController::class, 'show']);
      Route::post('products', [AdminProductController::class, 'store']);
      Route::put('products/{product}', [AdminProductController::class, 'update']);
      Route::delete('products/{product}', [AdminProductController::class, 'destroy']);
    });
  });
});

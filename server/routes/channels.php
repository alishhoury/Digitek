<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('admin.orders', function ($user) {
  return $user->role === 'admin';
});

Broadcast::channel('orders.{userId}', function ($user, $userId) {
  return (int) $user->id === (int) $userId;
});

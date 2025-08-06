<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Support\Facades\Log;

class SendOrderSms {
  public function handle(OrderPlaced $event) {
    $order = $event->order;

    Log::info('📱 Sending SMS for OrderPlaced', [
      'phone' => $order->user->phone ?? 'no-phone',
      'message' => "Thank you for your order #{$order->order_number}!",
    ]);
  }
}

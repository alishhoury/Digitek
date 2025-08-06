<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SendMockWebhook implements ShouldQueue {
  public function handle(OrderPlaced $event) {
    $order = $event->order;

    $payload = [
      'event' => 'order.placed',
      'data' => [
        'order_id' => $order->id,
        'order_number' => $order->order_number,
        'user_id' => $order->user_id,
        'total' => $order->total_price,
        'created_at' => $order->created_at,
      ],
    ];

    try {
      $response = Http::post('http://webserver/api/mock/webhook', $payload);

      Log::info('Mock webhook sent', [
        'payload' => $payload,
        'response' => $response->body(),
      ]);
    } catch (\Exception $e) {
      Log::error('Failed to send mock webhook', [
        'error' => $e->getMessage(),
        'payload' => $payload,
      ]);
    }
  }
}

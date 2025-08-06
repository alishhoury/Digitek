<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderPlaced implements ShouldBroadcast {
  use Dispatchable, SerializesModels;

  public $order;

  public function __construct(Order $order) {
    $this->order = $order;
  }

  public function broadcastOn(): PrivateChannel {
    return new PrivateChannel('admin.orders');
  }

  public function broadcastWith(): array {
    return [
      'id' => $this->order->id,
      'order_number' => $this->order->order_number,
      'total' => $this->order->total_price,
      'user_id' => $this->order->user_id,
      'created_at' => $this->order->created_at,
    ];
  }

  public function broadcastAs(): string {
    return 'order.placed';
  }
}

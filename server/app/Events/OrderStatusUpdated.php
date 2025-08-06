<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class OrderStatusUpdated implements ShouldBroadcast {
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $order;

  public function __construct($order) {
    $this->order = $order;
  }

  public function broadcastOn() {
    return [
      new Channel("orders.{$this->order->user_id}"),
      new Channel("admin.orders"),
    ];
  }

  public function broadcastAs() {
    return 'order.updated';
  }
}

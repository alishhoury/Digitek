<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewOrderNotification extends Notification {
    use Queueable;

    protected $order;

    public function __construct($order) {
        $this->order = $order;
    }

    public function via($notifiable) {
        return ['database'];
    }

    public function toDatabase($notifiable) {
        return [
            'title' => 'New Order',
            'message' => 'Order #' . $this->order->id . ' has been placed.',
            'order_id' => $this->order->id,
            'timestamp' => now()->toDateTimeString(),
        ];
    }
}


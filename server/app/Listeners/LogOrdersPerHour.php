<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
use App\Models\OrdersPerHour;
use App\Services\RevenueService;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class LogOrdersPerHour
{
    public function handle(OrderPlaced $event)
    {
        $order = $event->order;
        $createdAt = Carbon::parse($order->created_at);
        $revenue = RevenueService::calculateOrderRevenue($order);
        
        // Use firstOrCreate to avoid duplicates, then increment
        $record = OrdersPerHour::firstOrCreate(
            [
                'date' => $createdAt->toDateString(),
                'hour' => $createdAt->hour,
            ],
            [
                'order_count' => 0,
                'revenue' => 0,
            ]
        );
        
        // Use increment to avoid race conditions
        $record->increment('order_count');
        $record->increment('revenue', $revenue);
    }
}

<?php

namespace App\Services;

use App\Models\Order;

class RevenueService
{
    public static function calculateOrderRevenue(Order $order): float
    {
        if (!$order->relationLoaded('products')) {
            $order->load('products');
        }

        $totalRevenue = 0;
        
        foreach ($order->products as $product) {
            $sellingPrice = $product->pivot->price;
            $cost = $product->cost ?? 0;
            $quantity = $product->pivot->quantity;
            
            $productRevenue = ($sellingPrice - $cost) * $quantity;
            $totalRevenue += $productRevenue;
        }
        
        return $totalRevenue;
    }
}

<?php

namespace App\Services;

use App\Models\OrdersPerHour;

class OrderPerHourService {
    public function getOrdersPerHourData(){
        
        $today = now()->toDateString();
        $data = OrdersPerHour::where('date', $today)
            ->orderBy('hour')
            ->get(['id','hour', 'order_count', 'revenue']);
        return $data;
    }
  }


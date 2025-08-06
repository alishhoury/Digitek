<?php

namespace App\Http\Controllers;

use App\Models\OrdersPerHour;
use App\Http\Controllers\Shared\Controller;
use App\Services\OrderPerHourService;



class OrdersPerHourController extends Controller
{
    public function ordersPerHour()
    {
        try {
            $data = (new OrderPerHourService())->getOrdersPerHourData();
            return response()->json($data);
        } catch (\Exception $e) {
             echo $e->getMessage(); 
}
    }
}
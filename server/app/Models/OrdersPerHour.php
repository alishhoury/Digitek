<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrdersPerHour extends Model
{
    protected $table = 'orders_per_hour';
    
    protected $fillable = [
        'date',
        'hour',
        'order_count',
        'revenue'
    ];
}

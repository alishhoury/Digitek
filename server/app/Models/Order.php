<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model {
  /** @use HasFactory<\Database\Factories\OrderFactory> */
  use HasFactory;

  protected $fillable = [
    'user_id',
    'total_price',
    'status',
    'order_number'
  ];

  /**
   * Each order belongs to one user.
   */
  public function user() {
    return $this->belongsTo(User::class);
  }

  /**
   * Each order has many products (many-to-many).
   */
  public function products() {
    return $this->belongsToMany(Product::class)
      ->withPivot('quantity', 'price')
      ->withTimestamps();
  }
}

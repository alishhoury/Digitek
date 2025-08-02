<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
  /** @use HasFactory<\Database\Factories\ProductFactory> */
  use HasFactory;

  /**
   * The orders that include this product (many-to-many).
   */
  public function orders() {
    return $this->belongsToMany(Order::class)
      ->withPivot('quantity', 'price')
      ->withTimestamps();
  }
  protected $fillable = ['name', 'brand','description', 'price', 'cost', 'total_quantity', 'image', 'quantity_sold'];

}

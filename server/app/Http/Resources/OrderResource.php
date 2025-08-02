<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource {
  public function toArray(Request $request): array {
    return [
      'user_id' => $this->user_id,
      'total_price' => round($this->total_price, 2),
      'status' => $this->status,
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
      'products' => $this->products->map(function ($product) {
        return [
          'id' => $product->id,
          'name' => $product->name,
          'brand' => $product->brand,
          'description' => $product->description,
          'price' => $product->price,
          'image' => $product->image,
          'total_quantity' => $product->total_quantity,
          'created_at' => $product->created_at,
          'updated_at' => $product->updated_at,
          'pivot' => [
            'order_id' => $product->pivot->order_id,
            'product_id' => $product->pivot->product_id,
            'quantity' => $product->pivot->quantity,
            'price' => $product->pivot->price,
            'created_at' => $product->pivot->created_at,
            'updated_at' => $product->pivot->updated_at,
          ]
        ];
      }),
    ];
  }
}

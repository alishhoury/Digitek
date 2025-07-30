<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory {
  protected $model = Order::class;

  public function definition(): array {
    return [
      'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
      'total_price' => 0, // Will be updated in afterCreating
      'status' => fake()->randomElement(['pending', 'paid', 'packed', 'shipped']),
    ];
  }

  public function configure(): static {
    return $this->afterCreating(function (Order $order) {
      $products = Product::inRandomOrder()->take(rand(1, 5))->get();

      $total = 0;

      foreach ($products as $product) {
        $quantity = rand(1, 3);
        $price = $product->price;

        $order->products()->attach($product->id, [
          'quantity' => $quantity,
          'price' => $price,
        ]);

        $total += $quantity * $price;
      }

      $order->update(['total_price' => $total]);
    });
  }
}

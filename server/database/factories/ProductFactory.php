<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory {
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array {
    $cost = fake()->randomFloat(2, 10, 100);
    $price = $cost + fake()->randomFloat(2, 5, 50);
    $totalQuantity = fake()->numberBetween(10, 100);
    $quantitySold = fake()->numberBetween(0, $totalQuantity);

    return [
      'name' => fake()->words(3, true),
      'brand' => fake()->company(),
      'description' => fake()->paragraph(),
      'price' => $price,
      'cost' => $cost,
      'image' => fake()->imageUrl(640, 480, 'products', true),
      'total_quantity' => $totalQuantity,
      'quantity_sold' => $quantitySold,
    ];
  }
}

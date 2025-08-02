<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;

class OrderService {
  public function createOrder(int $userId, array $items) {
    return DB::transaction(function () use ($userId, $items) {
      $products = $this->getProducts($items);
      $this->validateQuantities($products, $items);

      [$totalPrice, $pivotData] = $this->processItems($products, $items);
      $order = $this->createOrderRecord($userId, $totalPrice);
      $this->attachProducts($order, $pivotData);

      return $order->load('products');
    });
  }

  public function payOrder(Order $order) {
    if ($order->status !== 'pending') {
      abort(400, 'Order is already paid or processed');
    }

    $order->status = 'paid';
    $order->save();

    return $order;
  }

  public function getUserOrders(int $userId) {
    return Order::where('user_id', $userId)
      ->latest()
      ->get();
  }

  public function getOrderByOrderNumber(string $orderNumber) {
    return Order::where('order_number', $orderNumber)->first();
  }

  private function getProducts(array $items) {
    $productIds = array_column($items, 'product_id');
    return Product::whereIn('id', $productIds)->lockForUpdate()->get();
  }

  private function validateQuantities(Collection $products, array $items) {
    foreach ($items as $item) {
      $product = $products->firstWhere('id', $item['product_id']);

      if (!$product) {
        throw ValidationException::withMessages([
          'products' => "Product ID {$item['product_id']} not found"
        ]);
      }

      if ($product->total_quantity < $item['quantity']) {
        throw ValidationException::withMessages([
          'products' => "Insufficient stock for product: {$product->name}"
        ]);
      }
    }
  }

  private function processItems(Collection $products, array $items) {
    $totalPrice = 0;
    $pivotData = [];

    foreach ($items as $item) {
      $product = $products->firstWhere('id', $item['product_id']);
      $quantity = $item['quantity'];
      $totalPrice += $product->price * $quantity;

      $pivotData[$product->id] = [
        'quantity' => $quantity,
        'price' => $product->price,
      ];

      $product->decrement('total_quantity', $quantity);
      $product->increment('quantity_sold', $quantity);
    }

    return [$totalPrice, $pivotData];
  }

  private function createOrderRecord(int $userId, float $totalPrice) {
    return Order::create([
      'user_id' => $userId,
      'total_price' => $totalPrice,
      'status' => 'pending',
      'order_number' => $this->generateOrderNumber(),
    ]);
  }

  private function generateOrderNumber(): string {
    do {
      $orderNumber = 'ORD' . random_int(100000, 999999);
    } while (Order::where('order_number', $orderNumber)->exists());

    return $orderNumber;
  }


  private function attachProducts(Order $order, array $pivotData): void {
    $order->products()->attach($pivotData);
  }
}

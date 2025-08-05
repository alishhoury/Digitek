<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderInvoiceMail;
use App\Models\User;
use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;


class OrderService {
  public function createOrder(int $userId, array $items) {
    return DB::transaction(function () use ($userId, $items) {
      $products = $this->getProducts($items);
      $this->validateQuantities($products, $items);

      [$totalPrice, $pivotData] = $this->processItems($products, $items);
      $order = $this->createOrderRecord($userId, $totalPrice);
      $this->attachProducts($order, $pivotData);

      $order->load('products');

      $user = User::find($userId);
      if ($user && $user->email){
        Mail::to($user->email)->send(new OrderInvoiceMail($order));

      }
      return $order;
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
    $order = Order::where('order_number', $orderNumber)->first();
    if (!$order) {
      abort(404, 'Order not found');
    }
    return $order;
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
  
  public static function updateOrderStatus(int $id, array $data){
    $order = Order::find($id);
    
    if (!$order) {
      return null;
    }
    $order->status = $data['status'] ?? $order->status;
    $order->save();

    AuditLog::create([
      'admin_id' => Auth::id(),
      'target_id' => $order->id,
      'target' => 'order_status',
      'action' => 'order_status_update',
      'changes' => $order->toArray(),
    ]);

    return $order;
  }
}

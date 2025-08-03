<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Shared\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Services\OrderService;

class OrderController extends Controller {
  /**
   * Display a listing of the resource.
   */
  public function index() {
    $orders = Order::with([
      'user:id,username',
      'products:id,name'
    ])->get();

    return response()->json($orders);
  }


  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreOrderRequest $request) {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(Order $order) {
    //
  }


  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateOrderRequest $request, Order $order) {
    $data = $request->all();
    $upOrder = OrderService::updateOrderStatus($order->id, $data);
    if (!$upOrder) {
      return response()->json([
        'success' => false,
        'message' => 'Order not found.'
      ], 404);
    }
    return response()->json([
      'success' => true,
      'product' => $upOrder,
    ]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Order $order) {
    //
  }
}

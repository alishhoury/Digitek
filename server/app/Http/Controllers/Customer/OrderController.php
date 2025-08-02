<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Shared\Controller;
use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Services\OrderService;

class OrderController extends Controller {
  /**
   * Display a listing of the resource.
   */
  public function index() {
    //
  }


  /**
   * Store a newly created resource in storage.
   */

  public function store(StoreOrderRequest $request) {
    $service = new OrderService();

    $order = $service->createOrder(
      auth('api')->id(),
      $request->validated()['products']
    );

    return $this->responseJSON(new OrderResource($order));
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
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Order $order) {
    //
  }
}

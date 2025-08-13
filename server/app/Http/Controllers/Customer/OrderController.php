<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Shared\Controller;
use App\Models\Order;
use App\Models\User;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Services\OrderService;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewOrderNotification;
use App\Events\OrderPlaced;
use App\Events\OrderStatusUpdated;
use Illuminate\Support\Facades\Cache;

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

    Cache::tags(['products'])->flush();


    event(new OrderPlaced($order));

    $admins = User::where('role', 'admin')->get();
    Notification::send($admins, new NewOrderNotification($order));

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

  public function payOrder(Order $order) {
    $service = new OrderService();
    $order = $service->payOrder($order);

    broadcast(new OrderStatusUpdated($order));

    return $this->responseJSON($order);
  }

  public function getUserOrders() {
    $service = new OrderService();
    $orders = $service->getUserOrders(auth('api')->id());

    return $this->responseJSON($orders);
  }

  public function getByOrderNumber($order_number) {
    $service = new OrderService();
    $order = $service->getOrderByOrderNumber($order_number);

    return $this->responseJSON(new OrderResource($order));
  }
}

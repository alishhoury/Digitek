<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Shared\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Services\ProductService;

class ProductController extends Controller {
  /**
   * Display a listing of the resource.
   */
  public function index() {
      $products = Product::all();
      return response()->json($products);
  }



  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreProductRequest $request) {
    $data = $request->all();

    $product = ProductService::addProduct($data);

    return response()->json([
      'success' => true,
      'product' => $product,
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show(Product $product) {
    //
  }


  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateProductRequest $request, Product $product) {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Product $product) {
    //
  }
}

<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Shared\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller {
  /**
   * Display a listing of the resource.
   */
  public function index() {

    $products = Product::all();
    return self::responseJSON($products, 'success', 200);

  }


  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreProductRequest $request) {
    //
  }

  /*
   * Display the specified resource.
   */
  public function show(Product $product) {
    return self::responseJSON($product, 'success', 200);
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

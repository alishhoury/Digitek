<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Shared\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Services\ProductService;
use Illuminate\Support\Facades\Cache;
use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller {
  /**
   * Display a listing of the resource.
   */
  public function index() {
    $cacheKey = 'admin:products:all';

    $products = Cache::tags(['products'])->remember($cacheKey, 60, function () {
      return Product::all();
  });

    return response()->json($products);
}



  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreProductRequest $request) {
    $data = $request->validated();

    $product = ProductService::addProduct($data);

  Cache::tags(['products'])->flush();


    return response()->json([
      'success' => true,
      'product' => $product,
    ]);
  }

  /**
   * Display the specified resource.
   */
  public function show($id) {
    $product = Product::find($id);
    if (!$product) {
      return response()->json(['message' => 'Product not found'], 404);
    }
    return response()->json([
      'success' => true,
      'product' => $product
    ]);
  }


  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateProductRequest $request, Product $product) {
    $data = $request->all();
    $upProduct = ProductService::updateProduct($product->id, $data);

    if (!$upProduct) {
        return response()->json([
            'success' => false,
            'message' => 'Product not found.'
        ], 404);
    }


  Cache::tags(['products'])->flush();


    return response()->json([
        'success' => true,
        'product' => $upProduct,
    ]);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Product $product) {
    $product->delete();

    AuditLog::create([
      'admin_id' => Auth::id(),
      'target_id' => $product->id,
      'target' => 'product',
      'action' => 'product_delete',
      'changes' => $product->toArray(),
    ]);

    Cache::tags(['products'])->flush();
    return response()->json(['message' => 'Product deleted successfully.']);
  }
}

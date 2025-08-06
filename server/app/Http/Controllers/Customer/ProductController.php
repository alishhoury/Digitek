<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Shared\Controller;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
class ProductController extends Controller {
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request) {
    $page = $request->get('page', 1);
    $search = $request->get('search', '');
    $cacheKey = "products:page:$page:search:$search";

    $products = Cache::tags(['products'])->remember($cacheKey, 60, function () use ($search) {
        $query = Product::query();

        if (!empty($search)) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        return $query->simplePaginate(10);
    });

    return self::responseJSON($products);
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
    return $this->responseJSON($product);
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

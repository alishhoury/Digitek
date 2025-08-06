<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class ProductSeeder extends Seeder {
    public function run()
    {
        $json = File::get(database_path('DummyProducts.json'));
        $products = json_decode($json, true);

        foreach ($products as $product) {
            Product::create($product);
        }
  }}
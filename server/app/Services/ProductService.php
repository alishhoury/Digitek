<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductService
{
    public static function addProduct(array $data) {
        $imagePath = null;

        if (!empty($data['image'])) {

            if (preg_match('/^data:image\/(\w+);base64,/', $data['image'], $type)) {
                $data['image'] = substr($data['image'], strpos($data['image'], ',') + 1);
                $type = strtolower($type[1]);
                if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
                    throw new \Exception('Invalid image type');
                }
            } else {
                throw new \Exception('Invalid base64 image format');
            }

            $imageData = base64_decode($data['image']);
            if ($imageData === false) {
                throw new \Exception('Base64 decode failed');
            }

            $fileName = Str::random(40) . '.' . $type;

            Storage::disk('local')->put($fileName, $imageData);

            $imagePath = 'private/' . $fileName;
        }

        return Product::create([
            'name' => $data['name'] ?? '',
            'price' => $data['price'] ?? 0,
            'total_quantity' => $data['total_quantity'] ?? 0,
            'cost' => $data['cost'] ?? 0,
            'brand' => $data['brand'] ?? '',
            'description' => $data['description'] ?? '',
            'image' => $imagePath,
        ]);
    }
}

<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;

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

            Storage::disk('public')->put($fileName, $imageData);

            $imagePath = 'storage/' . $fileName;
        }

        $product = Product::create([
            'name' => $data['name'] ?? '',
            'price' => $data['price'] ?? 0,
            'total_quantity' => $data['total_quantity'] ?? 0,
            'cost' => $data['cost'] ?? 0,
            'brand' => $data['brand'] ?? '',
            'description' => $data['description'] ?? '',
            'image' => $imagePath,
        ]);

        AuditLog::create([
            'admin_id' => Auth::id(),
            'target_id' => $product->id,
            'target' => 'product',
            'action' => 'product_create',
            'changes' => $product->toArray(),
        ]);

        return $product;
    }

    public static function updateProduct(int $id, array $data) {
        $product = Product::find($id);

        if (!$product) {
            return null;
        }

        $original = $product->toArray();

        if (!empty($data['image'])) {
            if (preg_match('/^data:image\/(\w+);base64,/', $data['image'], $type)) {
                $data['image'] = substr($data['image'], strpos($data['image'], ',') + 1);
                $type = strtolower($type[1]);

                if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
                    throw new \Exception('Invalid image type');
                }

                $imageData = base64_decode($data['image']);
                if ($imageData === false) {
                    throw new \Exception('Base64 decode failed');
                }

                $fileName = Str::random(40) . '.' . $type;

                if (!empty($product->image)) {
                    $oldPath = str_replace('storage/', '', $product->image);
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                    }
                }

                Storage::disk('public')->put($fileName, $imageData);
                $product->image = 'storage/' . $fileName;
            } else {
                throw new \Exception('Invalid image format. Base64 image required.');
            }
        }

        $product->name = $data['name'] ?? $product->name;
        $product->price = $data['price'] ?? $product->price;
        $product->total_quantity = $data['total_quantity'] ?? $product->total_quantity;
        $product->cost = $data['cost'] ?? $product->cost;
        $product->brand = $data['brand'] ?? $product->brand;
        $product->description = $data['description'] ?? $product->description;

        $product->save();

        $changes = [];
        foreach ($product->getChanges() as $key => $newValue) {
            $oldValue = $original[$key] ?? null;
            $changes[$key] = [
                'from' => $oldValue,
                'to' => $newValue
            ];
        }

        if (!empty($changes)) {
            AuditLog::create([
                'admin_id' => Auth::id(),
                'target_id' => $product->id,
                'target' => 'product',
                'action' => 'product_update',
                'changes' => $changes,
            ]);
        }

        return $product;
    }
}

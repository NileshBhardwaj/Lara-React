<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //
    public function fetch_product(){
        // dd("igcsdvc");
        $product = Product::all();
  
        $jsonData = json_decode($product, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            // Data is in valid JSON format.
            return response()->json($jsonData);

        }

    }
}
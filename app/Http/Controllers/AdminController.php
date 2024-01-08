<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    //
    public function admin()
    {
        return redirect('admin');
    }
    public function update_product(Request $request)
    {
        $product_id = $request->id;
        $price = $request->price;
        $quantity = $request->quantity;

        $products = Product::find($product_id);
        $products->quantity = $quantity;
        $products->price = $price;
        $products->update();
        return response()->json("Success");
    }
}

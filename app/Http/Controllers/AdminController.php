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
        // dd($request->all()); 
        if($request->hasFile('image')) {
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $fileName = time().'.'.$extension;
            $path = public_path().'/images';
            $file->move($path, $fileName);
    
          
            $id = $request->input('id');
    // dd($id);
           
            Product::where('id', $id)->update(['image' => $fileName]);
            // Product::where('id', $id)->update(['image_url' => asset('public/images/'.$fileName)]);

            return response()->json(['message' => 'User image  updated successfully']);
        }
        $product_id = $request->id;
        $price = $request->price;
        $quantity = $request->quantity;
        $image = $request->image;

        $products = Product::find($product_id);
        $products->quantity = $quantity;
        $products->price = $price;
        // $product->image = $image;
        $products->update();
        return response()->json("Success");
    }
}

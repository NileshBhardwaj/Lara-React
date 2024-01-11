<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Auth;
use Illuminate\Http\Request;

class CartController extends Controller
{
    //
    public function add_to_cart(Request $request)
    {

        $user = Auth::user()->id;

        $cart_get = Cart::where('product_id', $request->productId)
            ->where('user_id', $user)
            ->first();

        if ($cart_get) {
            // If the product and user ID already exist in the cart, increase the quantity
            $cart_get->quantity += 1;
            $cart_get->save();
        } else {
            // If not, create a new entry
            $product = Cart::create([
                'user_id' => $user,
                'product_id' => $request->productId,
                'quantity' => 1,
            ]);
        }

        $success = "Added to cart";
        return response()->json($success);
    }
    public function user_cart()
    {
        $user = Auth::user()->id;

        $get_cart = Cart::select('carts.*', 'products.price', 'products.name','products.image')
            ->join('products', 'carts.product_id', '=', 'products.id')
            ->where('user_id', $user)->get();
        // dd($get_cart);
        return response()->json($get_cart);

    }
    public function remove_cart(Request $request)
    {
        $user_id = Auth::user()->id;
        $product_id = $request->productId;

        $cart = Cart::where('user_id', $user_id)->where('product_id', $product_id)->first();

        if ($cart) {
            $cart->delete();
            return response()->json('Product removed from cart');
        } else {
            return response()->json('Product not found in cart');
        }
    }
    public function increase_quantity_cart(Request $request)
    {
        $user_id = Auth::user()->id;
        $product_id = $request->productId;

        $cart = cart::where('user_id', $user_id)->where('product_id', $product_id)->first();
        $cart->quantity += 1;
        $cart->save();
        return response()->json('Product Quantity Updated');
    }
    public function decrease_quantity_cart(Request $request)
    {
        $user_id = Auth::user()->id;
        $product_id = $request->productId;

        $cart = cart::where('user_id', $user_id)->where('product_id', $product_id)->first();
        $current_quantity = $request->quantity;
        // dd($current_quantity);
        if ($current_quantity == 1) {
            $cart->delete();
            return response()->json('Product removed from cart');
        }
        $cart->quantity -= 1;
        $cart->save();
        return response()->json('Product Quantity Updated');
    }
}

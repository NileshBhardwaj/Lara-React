<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Session;
use Stripe;

class StripeController extends Controller
{
    // public function stripe()
    // {
    //     return view('stripe');
    // }

    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function stripePost(Request $request)
    {
        $user = Auth::user()->id;
dd("uihdb");
      
        Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
        $customer = Stripe\Customer::create(array(

            "address" => [

                "line1" => "Godrej Chowk",

                "postal_code" => "160059",

                "city" => "Mohali",

                "state" => "PB",

                "country" => "IN",

            ],

            "email" => "demo@gmail.com",

            "name" => "Nilesh Bhardwaj",

            "source" => $request->token,

        ));
        $payment = Stripe\Charge::create([

            "amount" => $request->price * 100,

            "currency" => "usd",

            "customer" => $customer,

            "description" => "Test payment from LaraDev",

            "shipping" => [

                "name" => "Jenny Rosen",

                "address" => [

                    "line1" => "510 Townsend St",

                    "postal_code" => "98140",

                    "city" => "San Francisco",

                    "state" => "CA",

                    "country" => "US",

                ],

            ],

        ]);

        $id = $payment['id'];
        $amount = $payment['amount'];
        $user = Auth::user()->id;
        $date = Carbon::now();

        // $utcDate = Carbon::createFromFormat('Y-m-d\TH:i:s\Z', $date);
        //         $localDate = $utcDate->setTimezone('Asia/Kolkata');

        $capture_payment = Order::create([
            'user_id' => $user,
            'account_id' => "",
            'quantity' => '4',
            'price' => $amount / 100,
            'payment_id' => $id,
            'order_id' => 'isdgbivsildhvshil',
            'status' => "completed",
            'date' => $date,

        ]);
        Cart::where('user_id', $user)->delete();
        Session::flash('success', 'Payment successful!');

        return back();
    }
}

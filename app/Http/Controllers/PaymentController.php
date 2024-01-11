<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PaymentController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function index()
    {
        return view('paypal');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function payment(Request $request)
    {
        $request = $request->get('totalPrice');
        // dd($request);

        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $paypalToken = $provider->getAccessToken();

        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('paypal.payment.success'),
                "cancel_url" => route('paypal.payment/cancel'),
            ],

            "purchase_units" => [
                0 => [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => $request,
                    ],
                ],
            ],
        ]);
        // dd($response);
        //   $id=$response['id'];

        //     Session::put('id', $id);
        if (isset($response['id']) && $response['id'] != null) {

            foreach ($response['links'] as $links) {
                if ($links['rel'] == 'approve') {
                    return response()->json([
                        'location' => $links['href'],
                        'message' => 'success',
                    ]);
                }
            }

            return redirect()
                ->route('cancel.payment')
                ->with('error', 'Something went wrong.');

        } else {
            return redirect()
                ->route('create.payment')
                ->with('error', $response['message'] ?? 'Something went wrong.');
        }

    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function paymentCancel()
    {
        return redirect()
            ->route('cancel')
            ->with('error', $response['message'] ?? 'You have canceled the transaction.');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function paymentSuccess(Request $request)
    {
        $user = Auth::user()->id;
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request['token']);

        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            // dd($response);
            $id = $response['id'];
            $status = $response['status'];
            $payer_name = $response['payer'];
            $name = $payer_name['name'];
            $payer_email = $payer_name['email_address'];

            $payment_source = $response['purchase_units'];

            $payments = $payment_source['0'];

            $payments = $payments['payments'];

            $captures = $payments['captures'];

            $main = $captures['0'];

            $transaction_id = $main['id'];

            $amount = $main['amount'];

            $price = $amount['value'];

            $date = $main['create_time'];

            $utcDate = Carbon::createFromFormat('Y-m-d\TH:i:s\Z', $date);
            $localDate = $utcDate->setTimezone('Asia/Kolkata'); 

            $capture_payment = Order::create([
                'user_id' => $user,
                'account_id' => $payer_email,
                'quantity' => '4',
                'price' => $price,
                'payment_id' => $transaction_id,
                'order_id' => 'isdgbivsildhvshil',
                'status' => $status,
                'date' => $localDate,

            ]);
            // Delete all rows from the cart table where the user_id is equal to $user
            Cart::where('user_id', $user)->delete();

            return redirect()
                ->route('thankyou')
                ->with($response);
        } else {
            return redirect()
                ->route('thankyou')
                ->with('error', $response['message'] ?? 'Something went wrong.');
        }
    }
}

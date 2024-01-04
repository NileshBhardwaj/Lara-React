<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Auth;
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
            // Assuming you have the necessary data available
            // $data = response()->json($response);
            
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

<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
 */

Route::get('/', function () {
    return view('welcome');
});
Route::group(['middleware' => 'auth'], function () {
    Route::post('paypal/payment', [PaymentController::class, 'payment'])->name('paypal.payment');
    Route::get('paypal/payment/success', [PaymentController::class, 'paymentSuccess'])->name('paypal.payment.success');
    Route::get('paypal/payment/cancel', [PaymentController::class, 'paymentCancel'])->name('paypal.payment/cancel');

    Route::get('/execute-payment', [PaymentController::class, 'executePayment']);
    Route::get('/logout', [UserController::class, 'logOut']);

    Route::get('/products', [ProductController::class, 'fetch_product']);
    Route::post('/addToCart', [CartController::class, 'add_to_cart']);
    Route::get('/fetch_cart', [CartController::class, 'user_cart']);
    Route::post('/remove_Cart', [CartController::class, 'remove_cart']);
    Route::post('/increase_quantity', [CartController::class, 'increase_quantity_cart']);
    Route::post('/decrease_quantity', [CartController::class, 'decrease_quantity_cart']);
});
Auth::routes();

Route::group(['middleware' => 'auth'], function () {
    Route::get('/cart', function () {
        return view('home');
    });
    Route::get('/contact', function () {
        return view('home');
    });
    Route::get('/analytics', function () {
        return view('home');
    });
    Route::get('/about', function () {
        return view('home');
    });
    Route::get('/thankyou', function () {
        return view('home');
    })->name("thankyou");
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

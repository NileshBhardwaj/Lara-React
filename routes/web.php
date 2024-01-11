<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomAuth;
use App\Http\Controllers\RegisterController;


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
    return view('auth');
});
Route::get('/login-page', function () {
    return view('auth');
})->name('login-page');
Route::get('/signup-page', function () {
    return view('auth');
});
Route::get('/admin',[AdminController::class,'admin'])->middleware(['auth']);
Route::get('/payment-data',[AdminController::class,'payment_data'])->middleware(['auth']);


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


Route::get('/admin',function(){
    return view('admin');
})->middleware(['auth','role']);
Route::get('/product',function(){
    return view('admin');
})->middleware(['auth','role']);
Route::get('/payment-details',function(){
    return view('admin');
})->middleware(['auth','role']);

Route::post('/update-product',[AdminController::class,'update_product'])->middleware(['auth','role']);

Route::get('/register',[RegisterController::class,'create']);
Route::post('/log',[CustomAuth::class,'login'])->name('log');
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
    Route::get('/checkout', function () {
        return view('home');
    })->name("thankyou");
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

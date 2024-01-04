<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'user_id', 'total', 'payment_id', 'account_id', 'quantity', 'price', 'payment_id', 'status','order_id','payee_id',

    ];
}

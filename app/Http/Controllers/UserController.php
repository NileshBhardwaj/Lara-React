<?php

namespace App\Http\Controllers;
use App\Models\User;
use Validator;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
  
        public function logOut(Request $request) {
            Auth::logout();
            return redirect('/login');
        }
    
}

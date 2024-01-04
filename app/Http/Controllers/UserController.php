<?php

namespace App\Http\Controllers;
use App\Models\User;
use Validator;
use Auth;
use Illuminate\Http\Request;
use Session;
class UserController extends Controller
{
  
        public function logOut(Request $request) {
            Session::flush();
            Auth::logout();
            return redirect('/login');
        }
    
}

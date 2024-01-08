<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\User;
class CustomAuth extends Controller
{
    //
    public function login(Request $request)
    {

        // dd($request->all());
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);


        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();

            if ($user->hasRole('admin')) {

                $links = "http://127.0.0.1:8000/admin";
                return response()->json([
                    'location' => $links,
                   
                ]);
            } else {
            
                $links = "http://127.0.0.1:8000/home";
                return response()->json([
                    'location' => $links,
                   
                ]);
            }

        }
        else {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
        // dd($user->getRoleNames());

    }

}

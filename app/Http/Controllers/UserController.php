<?php

namespace App\Http\Controllers;
use App\Models\User;
use Validator;
use Auth;
use Illuminate\Http\Request;
use Session;
use App\Models\Country;
use App\Models\City;
use App\Models\State;
class UserController extends Controller
{
  
        public function logOut(Request $request) {
            Session::flush();
            Auth::logout();
            return redirect('/login');
        }
    

        public function getCountries()
        {
            $getCountries = Country::all();
            return response()->json($getCountries);  
        }
        public function getStates(Request $request)
        {
            $getStates = State::where('country_id','=',$request->id)->get();
            return response()->json($getStates);
        }
        public function getCity(Request $request)
        {
           $stateId = (int)$request->stateId;
            $getCity = City::where('state_id','=',$stateId)->get();
            return response()->json($getCity);
        }
}

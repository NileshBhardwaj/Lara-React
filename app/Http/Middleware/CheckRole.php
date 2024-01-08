<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Auth;
class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user(); 
        // dd($user->getRoleNames());

        if($user && $user->hasRole('admin')){ // Check if user is logged in and has admin role
            return $next($request);
        }
        else{
            Auth::logout();
            return redirect('/login-page');
            // dd("not accessible");
        }

       
    }
}
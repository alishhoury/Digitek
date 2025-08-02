<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class CookieAuth {
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @return mixed
   */
  public function handle($request, Closure $next) {
    try {
      $token = $request->cookie('jwt');
      if (!$token) {
        return response()->json(['message' => 'Unauthorized'], 401);
      }

      $jwt = JWTAuth::setToken($token);

      if (!$jwt->check()) {
        return response()->json(['message' => 'Unauthorized'], 401);
      }

      $user = $jwt->toUser();

      // Set the user on the default auth guard (or api if you want)
      auth('api')->setUser($user);
    } catch (Exception $e) {
      return response()->json(['message' => 'Unauthorized'], 401);
    }

    return $next($request);
  }
}

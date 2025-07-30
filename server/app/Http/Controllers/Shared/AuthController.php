<?php

namespace App\Http\Controllers\Shared;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\ResponseTrait;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller {
  use ResponseTrait;

  public function register(RegisterRequest $request) {
    [$token, $user] = AuthService::register($request->validated());
    return $this->respondWithToken($token, $user);
  }

  public function login(LoginRequest $request) {
    $credentials = $request->validated();

    $token = AuthService::login($credentials);

    if (!$token) {
      return $this->responseJSON('Unauthorized', 'error', 401);
    }

    return $this->respondWithToken($token, auth('api')->user());
  }

  public function me() {
    return $this->responseJSON(auth('api')->user());
  }

  public function logout() {
    $token = request()->cookie('jwt');
    AuthService::logout($token);

    $cookie = cookie()->forget('jwt');
    return $this->responseJSON('Successfully logged out')
      ->withCookie($cookie);
  }

  protected function respondWithToken($token, $user) {
    $cookie = cookie(
      'jwt',
      $token,
      JWTAuth::factory()->getTTL(),
      '/',
      null,
      true,   // secure
      true,   // httpOnly
      false,
      'Strict'
    );

    return $this->responseJSON($user)->withCookie($cookie);
  }
}

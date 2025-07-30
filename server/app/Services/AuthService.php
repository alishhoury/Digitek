<?php

namespace App\Services;

use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthService {
  public static function register(array $data) {
    $user = User::create([
      'username' => $data['username'],
      'email' => $data['email'],
      'password' => bcrypt($data['password']),
    ]);

    $token = auth('api')->login($user);
    return [$token, $user->fresh()];
  }

  public static function login(array $credentials) {
    if (!$token = auth('api')->attempt($credentials)) {
      return null;
    }
    return $token;
  }

  public static function logout($token) {
    if ($token) {
      JWTAuth::setToken($token)->invalidate();
    }
  }
}

<?php

namespace App\Services;

use App\Models\User;

class UserService {
  static function updateUser(User $user, $data) {
    $user->update($data);
    return $user;
  }
}

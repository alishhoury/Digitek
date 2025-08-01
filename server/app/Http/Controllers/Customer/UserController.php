<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Shared\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller {
  /**
   * Display a listing of the resource.
   */
  public function index() {
    //
  }


  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request) {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id) {
    //
  }


  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateUserRequest $request, User $user) {
    $updatedUser = UserService::updateUser($user, $request->validated());
    return $this->responseJSON($updatedUser);
  }


  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id) {
    //
  }
}

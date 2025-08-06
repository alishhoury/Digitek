<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Shared\Controller;
use Illuminate\Http\Request;
class NotificationController extends Controller {
    public function view(Request $request) {
        return $request->user()->unreadNotifications;
    }
    public function clear(Request $request){
        $request->user()->notifications()->delete();
        return response()->json(['message' => 'All notifications deleted']);
    }
}

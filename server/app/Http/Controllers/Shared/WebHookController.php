<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\Shared\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebHookController extends Controller {
  /**
   * Handle incoming webhooks from external services.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function handle(Request $request) {
    Log::info('Received mock webhook', [
      'headers' => $request->headers->all(),
      'body' => $request->all(),
    ]);

    return response()->json(['status' => 'received']);
  }
}

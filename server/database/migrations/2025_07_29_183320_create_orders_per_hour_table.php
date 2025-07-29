<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::create('orders_per_hour', function (Blueprint $table) {
      $table->id();
      $table->dateTime('hour');
      $table->integer('order_count')->default(0);
      $table->decimal('revenue', 10, 2)->default(0);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::dropIfExists('orders_per_hour');
  }
};

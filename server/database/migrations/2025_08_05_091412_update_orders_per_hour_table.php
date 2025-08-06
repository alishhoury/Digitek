<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::table('orders_per_hour', function (Blueprint $table) {
      $table->dropColumn('hour');
      $table->date('date')->after('id');
      $table->unsignedTinyInteger('hour')->after('date'); // 0–23
      $table->timestamps();
    });
  }

  public function down(): void {
    Schema::table('orders_per_hour', function (Blueprint $table) {
      $table->dropColumn(['date', 'hour', 'created_at', 'updated_at']);
      $table->dateTime('hour');
    });
  }
};

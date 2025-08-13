<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void {
    Schema::table('orders', function (Blueprint $table) {
      // Index for faster lookups by user and status
      $table->index('user_id');
      $table->index('status');

      // Unique index for fast and consistent order number lookups
      $table->unique('order_number');
    });

    Schema::table('orders_per_hour', function (Blueprint $table) {
      // Index for fast retrieval of daily stats
      $table->index(['date', 'hour']);
    });

    Schema::table('order_product', function (Blueprint $table) {
      // Indexes on foreign keys for efficient joins
      $table->index('order_id');
      $table->index('product_id');
    });

    Schema::table('products', function (Blueprint $table) {
      // Index for speeding up searches by product name
      $table->index('name');
    });

    Schema::table('users', function (Blueprint $table) {
      // Index for quick lookups by user role
      $table->index('role');
    });

    Schema::table('audit_logs', function (Blueprint $table) {
      // Index to find all logs related to a specific admin
      $table->index('admin_id');
      // Composite index to efficiently find logs for a specific target
      $table->index(['target', 'target_id']);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void {
    Schema::table('orders', function (Blueprint $table) {
      $table->dropIndex(['user_id']);
      $table->dropIndex(['status']);
      $table->dropUnique(['order_number']);
    });

    Schema::table('orders_per_hour', function (Blueprint $table) {
      $table->dropIndex(['orders_per_hour_date_hour_index']);
    });

    Schema::table('order_product', function (Blueprint $table) {
      $table->dropIndex(['order_id']);
      $table->dropIndex(['product_id']);
    });

    Schema::table('products', function (Blueprint $table) {
      $table->dropIndex(['name']);
    });

    Schema::table('users', function (Blueprint $table) {
      $table->dropIndex(['role']);
      $table->dropUnique(['email']);
    });

    Schema::table('audit_logs', function (Blueprint $table) {
      $table->dropIndex(['admin_id']);
      $table->dropIndex(['target', 'target_id']);
    });
  }
};

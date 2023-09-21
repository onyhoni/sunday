<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->string('awb');
            $table->string('package_id')->unique();
            $table->string('nama_pic');
            $table->string('account');
            $table->string('origin');
            $table->string('regional');
            $table->string('nama_kota');
            $table->string('customer_name');
            $table->string('seller_name');
            $table->string('merchant_id');
            $table->text('seller_address');
            $table->string('seller_phone');
            $table->text('destinasi');
            $table->string('service');
            $table->string('intruksi');
            $table->string('ins_value');
            $table->string('cod_flag');
            $table->string('cod_amount');
            $table->string('armada');
            $table->string('modul_entry');
            $table->string('ket');
            $table->string('qty');
            $table->string('weight');
            $table->string('create_time');
            $table->string('start_time');
            $table->string('date_request');
            $table->string('date_attempt');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};

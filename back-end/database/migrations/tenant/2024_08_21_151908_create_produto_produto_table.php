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
        Schema::create('produto_produto', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('produto_base_id');
            $table->uuid('produto_id');
            $table->timestamps();


            $table->foreign('produto_base_id')->references('id')->on('produtos')->onDelete('cascade');
            $table->foreign('produto_id')->references('id')->on('produtos')->onDelete('cascade');

            $table->unique(['produto_base_id', 'produto_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produto_produto');
    }
};

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
        Schema::create('produto_clientes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('produto_id')->constrained('produtos')->onDelete('cascade');
            $table->foreignUuid('cliente_id')->constrained('clientes')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produto_clientes');
    }
};

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
        Schema::create('entregas_produtos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('entrega_id')->constrained('entregas')->onDelete('cascade');
            $table->foreignUuid('produto_id')->constrained('produtos')->onDelete('cascade');
            $table->foreignUuid('unidade_id')->constrained('unidades')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entregas_produtos');
    }
};

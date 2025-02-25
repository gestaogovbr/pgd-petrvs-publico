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
        Schema::dropIfExists('entregas_produtos');

        if (!Schema::hasTable('planos_entregas_entregas_produtos')) {
            Schema::create('planos_entregas_entregas_produtos', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->foreignUuid('entrega_id')->constrained('planos_entregas_entregas')->onDelete('cascade');
                $table->foreignUuid('produto_id')->constrained('produtos')->onDelete('cascade');
                $table->timestamps();
                $table->softDeletes();

                $table->unique(['entrega_id', 'produto_id'], 'unique_entregas_produtos');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planos_entregas_produtos');

        Schema::create('entregas_produtos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('entrega_id')->constrained('entregas')->onDelete('cascade');
            $table->foreignUuid('produto_id')->constrained('produtos')->onDelete('cascade');
            $table->foreignUuid('unidade_id')->constrained('unidades')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['entrega_id', 'produto_id'], 'unique_entregas_produtos');
        });
    }
};

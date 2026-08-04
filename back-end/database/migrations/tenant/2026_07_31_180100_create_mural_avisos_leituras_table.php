<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mural_avisos_leituras', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('usuario_id');
            $table->dateTime('data_confirmacao');
            $table->timestamp('created_at')->nullable();

            $table->foreign('usuario_id')->references('id')->on('usuarios')->onDelete('cascade');
            $table->unique('usuario_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mural_avisos_leituras');
    }
};

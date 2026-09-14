<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sipec_busca_historicos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->dateTime('data_execucao');
            $table->json('resultado');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sipec_busca_historicos');
    }
};

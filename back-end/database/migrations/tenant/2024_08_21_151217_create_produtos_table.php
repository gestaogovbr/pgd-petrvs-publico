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
        Schema::create('produtos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nome',100)->nullable(false);
            $table->string('nome_fantasia',255)->nullable(true);
            $table->enum('tipo',['produto','servico'])->nullable(false);
            $table->string('descricao',255)->nullable(false);
            $table->text('url')->nullable(true);
            $table->timestamps();
            $table->softDeletes();
        });


        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produtos');
    }
};

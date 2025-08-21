<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tipos_modalidades_siape', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('tipo_modalidade_id')->nullable();
            $table->string('nome', 255);
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('tipo_modalidade_id')->references('id')->on('tipos_modalidades');
            $table->index(['nome']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('tipos_modalidades_siape');
    }
};
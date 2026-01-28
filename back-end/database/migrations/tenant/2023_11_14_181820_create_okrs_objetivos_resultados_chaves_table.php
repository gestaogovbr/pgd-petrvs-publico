<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('okrs_objetivos_resultados_chaves', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicial");
            $table->dateTime('data_fim')->nullable()->comment("Data final");
            $table->string("descricao", 256)->comment("Descrição");
            $table->json("meta")->comment("Meta para a entrega");
            $table->decimal('confianca', 5, 2)->nullable()->default(0)->comment("Nível % de confiança para atingir a meta");
            $table->json("realizado")->nullable()->comment("Valor realizado da entrega");
            $table->string('cor', 100)->comment("Cor do objetivo");
            // Chaves estrangeiras:
            $table->foreignUuid('okr_objetivo_id')->constrained("okrs_objetivos")->onDelete('restrict')->onUpdate('cascade')->comment("Objetivo do OKR");
            $table->foreignUuid('entrega_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Modelo de Entrega do Catálogo");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('okrs_objetivos_resultados_chaves');
    }
};

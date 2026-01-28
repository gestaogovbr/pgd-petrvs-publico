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
        Schema::create('ocorrencias', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicial da consolidacão");
            $table->dateTime('data_fim')->comment("Data final da consolidação");
            $table->longText('descricao')->comment("Descrição da ocorrência");
            // Chaves estrangeiras:
            $table->foreignUuid('plano_trabalho_id')->nullable()->constrained("planos_trabalhos")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de trabalho");
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ocorrencias');
    }
};

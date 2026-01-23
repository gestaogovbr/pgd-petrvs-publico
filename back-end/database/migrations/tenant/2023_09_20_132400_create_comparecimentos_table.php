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
        Schema::create('comparecimentos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->date('data_comparecimento')->comment("Data do comparecimento");
            $table->string('detalhamento')->comment("Detalhamento do comparecimento");
            // Chaves estrangeiras:
            $table->foreignUuid('plano_trabalho_consolidacao_id')->constrained('planos_trabalhos_consolidacoes')->onDelete('restrict')->onUpdate('cascade')->comment("Plano de trabalho consolidado onde foi inserido o registro de comparecimento.");
            $table->foreignUuid('unidade_id')->constrained('unidades')->onDelete('restrict')->onUpdate('cascade')->comment("Unidade de comparecimento.");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comparecimentos');
    }
};

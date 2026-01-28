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
        Schema::create('projetos_alocacoes_regras', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            // Chaves estrangeiras:
            $table->foreignUuid('projeto_alocacao_id')->constrained("projetos_alocacoes")->onDelete('restrict')->onUpdate('cascade')->comment("Alocação");
            $table->foreignUuid('regra_id')->constrained("projetos_regras")->onDelete('restrict')->onUpdate('cascade')->comment("Regra");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projetos_alocacoes_regras');
    }
};

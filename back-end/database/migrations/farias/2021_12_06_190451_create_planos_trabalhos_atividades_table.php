<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosTrabalhosAtividadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_trabalhos_atividades', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();   
            // Campos:
            // Chaves estrangeiras:
            $table->foreignUuid('plano_trabalho_id')->constrained("planos_trabalhos")->onDelete('restrict')->onUpdate('cascade')->comment("Plano de trabalho da atividade");
            $table->foreignUuid('atividade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Atividade do plano de trabalho");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('planos_trabalhos_atividades');
        Schema::enableForeignKeyConstraints();
    }
}

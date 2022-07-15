<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnidadesOrigemAtividadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unidades_origem_atividades', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');  
            $table->timestamps();
            // Campos:
            // Chaves estrangeiras:
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('Unidade');
            $table->foreignUuid('unidade_origem_atividade_id')->constrained("unidades")->onDelete('restrict')->onUpdate('cascade')->comment('Nova origem para buscar a lista de Atividades');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unidades_origem_atividades');
    }
}

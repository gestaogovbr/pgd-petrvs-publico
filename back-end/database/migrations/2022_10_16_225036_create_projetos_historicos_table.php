<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetosHistoricosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projetos_historicos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_hora')->useCurrent()->comment("Data e hora da modificação");
            $table->tinyInteger('linha_base')->default(0)->comment("Se é baseline");
            $table->tinyInteger('completo')->default(0)->comment("Se o delta corresponde ao objeto completo");
            $table->json('delta')->comment("Delta do objeto (ou objeto completo)");
            // Chaves estrangeiras:
            $table->foreignUuid('projeto_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projetos_historicos');
    }
}

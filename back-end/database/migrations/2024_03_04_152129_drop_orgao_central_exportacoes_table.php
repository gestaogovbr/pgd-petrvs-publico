<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropOrgaoCentralExportacoesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::dropIfExists('orgao_central_exportacoes');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::create('orgao_central_exportacoes', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamp('data_exportacao');
        //     $table->enum('tipo', ['PLANO_TRABALHO', 'PLANO_ENTREGA']);
        //     $table->json('parametros');
        //     $table->string('versao');
        //     $table->json('corpo');
        //     $table->json('retorno')->nullable();
        //     $table->json('hashs')->nullable();
        //     $table->timestamps();
        // });
    }
}

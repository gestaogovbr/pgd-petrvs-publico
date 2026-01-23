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
        // Schema::create('orgao_central_exportacoes', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        //     $table->dateTime('data_exportacao')->comment("Data da exportação para o Órgão Central");
        //     $table->enum('tipo', ['PLANO_TRABALHO', 'PLANO_ENTREGA'])->comment("Tipo de exportação realizada");
        //     $table->json('parametros')->comment("Parâmetro utilizados na exportação");
        //     $table->string('versao');
        //     $table->json('corpo');
        //     $table->json('retorno')->nullable();
        //     $table->json('hashs')->nullable();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::dropIfExists('orgao_central_exportacoes');
    }
};

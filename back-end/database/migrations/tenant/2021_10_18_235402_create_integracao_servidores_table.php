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
        Schema::create('integracao_servidores', function (Blueprint $table) {
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            $table->string('cpf_ativo', 50)->nullable();
            $table->string('data_modificacao', 50)->nullable();
            $table->string('cpf', 50)->nullable();
            $table->string('nome', 100)->nullable();
            $table->string('emailfuncional', 100)->nullable();
            $table->string('sexo', 50)->nullable();
            $table->string('municipio', 100)->nullable();
            $table->string('uf', 50)->nullable();
            $table->string('data_nascimento', 50)->nullable();
            $table->string('telefone', 50)->nullable();
            $table->string('vinculo_ativo', 50)->nullable();
            $table->string('matriculasiape', 50)->nullable();
            $table->string('cargo', 100)->nullable();
            $table->string('coduorgexercicio', 50)->nullable();
            $table->string('coduorglotacao', 50)->nullable();
            $table->string('codigo_servo_exercicio', 50)->nullable();
            $table->string('nomeguerra', 100)->nullable();
            $table->string('situacao_funcional', 50)->nullable();
            $table->string('codupag', 50)->nullable();
            $table->string('dataexercicionoorgao', 50)->nullable();
            $table->json('funcoes')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('integracao_servidores');
    }
};

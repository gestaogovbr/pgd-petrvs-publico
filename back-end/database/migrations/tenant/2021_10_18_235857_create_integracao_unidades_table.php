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
        Schema::create('integracao_unidades', function (Blueprint $table) {
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            $table->string('id_servo', 50)->nullable();
            $table->string('pai_servo', 50)->nullable();
            $table->string('codigo_siape', 50)->nullable();
            $table->string('pai_siape', 50)->nullable();
            $table->string('codupag', 50)->nullable();
            $table->string('nomeuorg', 200)->nullable();
            $table->string('siglauorg', 50)->nullable();
            $table->string('telefone', 50)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('natureza', 50)->nullable();
            $table->string('fronteira', 50)->nullable();
            $table->string('fuso_horario', 50)->nullable();
            $table->string('cod_uop', 50)->nullable();
            $table->string('cod_unidade', 50)->nullable();
            $table->string('tipo', 50)->nullable();
            $table->string('tipo_desc', 100)->nullable();
            $table->string('na_rodovia', 50)->nullable();
            $table->string('logradouro', 100)->nullable();
            $table->string('bairro', 100)->nullable();
            $table->string('cep', 50)->nullable();
            $table->string('ptn_ge_coordenada', 50)->nullable();
            $table->string('municipio_siafi_siape', 100)->nullable();
            $table->string('municipio_siscom', 100)->nullable();
            $table->string('municipio_ibge', 50)->nullable();
            $table->string('municipio_nome', 100)->nullable();
            $table->string('municipio_uf', 50)->nullable();
            $table->string('ativa', 50)->nullable();
            $table->string('regimental', 50)->nullable();
            $table->string('datamodificacao', 50)->nullable();
            $table->string('und_nu_adicional', 50)->nullable();
            $table->string('cnpjupag', 60)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('integracao_unidades');
    }
};

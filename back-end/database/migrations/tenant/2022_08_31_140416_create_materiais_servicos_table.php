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
        Schema::create('materiais_servicos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->enum('tipo', ["MATERIAL", "SERVICO"])->default("MATERIAL")->comment("Tipo");
            $table->string('codigo', 100)->nullable()->comment("Código");
            $table->string('referencia', 100)->nullable()->comment("Referência");
            $table->string('descricao', 256)->comment("Descrição");
            $table->enum('unidade_medida', ['UNIDADE', 'CAIXA', 'METRO', 'KILO', 'LITRO', 'DUZIA', 'MONETARIO', 'HORAS', 'DIAS', 'PACOTE'])->comment("Unidade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('materiais_servicos');
    }
};

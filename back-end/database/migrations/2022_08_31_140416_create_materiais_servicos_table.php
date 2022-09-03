<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMateriaisServicosTable extends Migration
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
            // Campos:
            $table->enum('tipo', ["MATERIAL", "SERVICO"])->default("MATERIAL")->comment("Tipo");
            $table->string('codigo', 100)->nullable()->comment("Código");
            $table->string('referencia', 100)->nullable()->comment("Referência");
            $table->string('descricao', 256)->comment("Descrição");
            $table->enum('unidade', ['UNIDADE', 'CAIXA', 'METRO', 'KILO', 'LITRO', 'DUZIA', 'FARDO', 'HORAS', 'DIAS', 'PACOTE', 'FRASCO'])->comment("Unidade");
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data final da vigência");
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
}

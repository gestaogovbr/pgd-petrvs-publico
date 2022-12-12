<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanosEntregas extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planos_entregas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicio da vigência do registro");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência do registro");
            $table->dateTime('inicio')->comment("Data inicio do planejamento");
            $table->dateTime('fim')->nullable()->comment("Data fim do planejamento");
            $table->string('nome', 256)->comment("Nome do plano estratégico/entregas");
            // Chaves estrangeiras:
            $table->foreignUuid('planejamento_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('cadeia_valor_id')->nullable()->constrained("cadeias_valores")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('unidade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planos_entregas');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramasParticipantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programas_participantes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->dateTime('data_inicio')->comment("Data inicio da vigência do registro");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência do registro");
            $table->tinyInteger('habilitado')->default(1)->comment("Se o perticipantes está habilitado para o programa");
            // Chaves estrangeiras:
            $table->foreignUuid('programa_id')->constrained("programas")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('usuario_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programas_participantes');
    }
}

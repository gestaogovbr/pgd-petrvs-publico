<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAfastamentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('afastamentos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->text('observacoes')->nullable()->comment("Observação sobre o afastamento");
            $table->dateTime('inicio_afastamento')->comment("Inicio do afastamento");
            $table->dateTime('fim_afastamento')->comment('Fim do afastamento');
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_motivo_afastamento_id')->nullable()->constrained('tipos_motivos_afastamentos')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('afastamentos');
    }
}

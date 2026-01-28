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
        Schema::create('afastamentos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->text('observacoes')->nullable()->comment("Observação sobre o afastamento");
            $table->dateTime('data_inicio')->comment("Inicio do afastamento");
            $table->dateTime('data_fim')->comment('Fim do afastamento');
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('Usuário');
            $table->foreignUuid('tipo_motivo_afastamento_id')->constrained('tipos_motivos_afastamentos')->onDelete('restrict')->onUpdate('cascade')->comment('Tipo do motivo de afastamento');
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
};

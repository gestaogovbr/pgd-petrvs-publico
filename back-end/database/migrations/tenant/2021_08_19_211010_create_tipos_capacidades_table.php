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
        Schema::create('tipos_capacidades', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('codigo', 256)->comment("Código da rotina no sistema (acesso)"); 
            $table->text('descricao')->comment("Descrição da capacidade (acesso)");
            $table->foreignUuid('grupo_id')->nullable()->constrained('tipos_capacidades')->onDelete('restrict')->onUpdate('cascade')->comment('Capacidade módulo superior (nó pai hierárquico)');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipos_capacidades');
    }
};

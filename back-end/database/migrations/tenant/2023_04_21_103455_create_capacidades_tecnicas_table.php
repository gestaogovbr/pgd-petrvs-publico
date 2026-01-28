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
        Schema::create('capacidades_tecnicas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome da capacidade técnica");
            $table->tinyInteger('ativo')->default(1)->comment("capacidade ativo ou inativo");
            // Chaves estrangeiras:
            $table->foreignUuid('area_tematica_id')->constrained("areas_tematicas")->onDelete('restrict')->onUpdate('cascade')->comment("FK Areas TEmaticas");           
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('capacidades_tecnicas');
    }
};

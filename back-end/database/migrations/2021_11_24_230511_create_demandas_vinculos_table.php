<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDemandasVinculosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('demandas_vinculos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->rememberToken();
            // Campos:
            $table->enum('tipo', ["GRUPO", "COLATERAL", "HIERARQUICO"])->comment("Tipo do vinculo");
            $table->dateTime('data_hora')->comment("Data e hora do inicio do relacionamento");
            // Chaves estrangeiras:
            $table->foreignUuid('demanda_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('demanda_vinculo_id')->nullable()->constrained('demandas_vinculos')->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('demandas_vinculos');
    }
}

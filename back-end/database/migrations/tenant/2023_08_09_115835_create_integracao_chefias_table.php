<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIntegracaoChefiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('integracao_chefias', function (Blueprint $table) {
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            
            $table->uuid('usuario_id');
            $table->uuid('unidade_id');
            $table->enum("tipo", ["TITULAR", "SUBSTITUTO"])->default("TITULAR")->comment("Classificação de chefia.");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('integracao_chefias');
    }
}

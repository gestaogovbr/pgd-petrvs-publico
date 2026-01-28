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
        Schema::create('okrs_objetivos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->integer('sequencia')->default(0)->comment("Sequência utilizada para ordenar os objetivos");
            $table->string('fundamentacao', 256)->comment("Fundamentação do objetivo");
            $table->string('nome', 256)->comment("Nome do objetivo");
            $table->string('cor', 100)->comment("Cor do objetivo");
            // Chaves estrangeiras:
            $table->foreignUuid('okr_id')->constrained("okrs")->onDelete('restrict')->onUpdate('cascade')->comment("OKR ao qual se refere o objetivo");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('okrs_objetivos');
    }
};

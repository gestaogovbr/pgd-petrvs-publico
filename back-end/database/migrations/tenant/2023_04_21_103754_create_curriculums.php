<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCurriculums extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('curriculums', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->longText('apresentação')->comment("Nome da área da graduação");
            $table->string('telefone',64)->comment("Nome da área da graduação");
            $table->json('idiomas')->nullable()->comment("Nome da área da graduação");
            $table->tinyInteger('ativo')->default(1)->comment("Curriculum ativa ou inativa");
           
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('cidade_id')->constrained("cidades")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('curriculums');
    }
}

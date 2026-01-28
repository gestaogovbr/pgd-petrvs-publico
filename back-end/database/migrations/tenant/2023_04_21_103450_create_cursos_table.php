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
        Schema::create('cursos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome do curso");
            $table->string('titulo', 64)->comment("Titulação do curso->Graduação, Pos, etc");
            $table->tinyInteger('ativo')->default(1)->comment("Curso ativo ou inativo");
            // Chaves estrangeiras:
            $table->foreignUuid('area_id')->constrained("areas_conhecimentos")->onDelete('restrict')->onUpdate('cascade')->comment("FK Area ID");
            $table->foreignUuid('tipo_curso_id')->constrained("tipos_cursos")->onDelete('restrict')->onUpdate('cascade')->comment("FK Tipo de Curso ID");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cursos');
    }
};

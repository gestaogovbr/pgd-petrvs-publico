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
        Schema::create('curriculums_graduacoes', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->tinyInteger('pretensao')->default(0)->comment("Pretende fazer o curso");
            // Chaves estrangeiras:
            $table->foreignUuid('curriculum_id')->constrained("curriculums")->onDelete('restrict')->onUpdate('cascade')->comment("FK Curriculum ID");
            $table->foreignUuid('curso_id')->constrained("cursos")->onDelete('restrict')->onUpdate('cascade')->comment("FK Cursos ID");
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('curriculums_graduacoes');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropProjetosEnvolvidos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::drop("projetos_envolvidos");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('projetos_envolvidos', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            // Chaves estrangeiras:
            $table->foreignUuid('projeto_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('recurso_id')->constrained("projetos_recursos")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('regra_id')->constrained("projetos_regras")->onDelete('restrict')->onUpdate('cascade');
        });
    }
}

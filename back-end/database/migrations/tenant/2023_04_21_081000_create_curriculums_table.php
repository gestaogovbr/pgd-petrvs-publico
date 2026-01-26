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
        Schema::create('curriculums', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->longText('apresentacao')->comment("Apresentação");
            $table->string('telefone',64)->comment("Telefone");
            $table->json('idiomas')->nullable()->comment("Idiomas que fala");
            $table->string('estado_civil',64)->nullable()->comment("Estado Civil");
            $table->tinyInteger('quantidade_filhos')->default(0)->comment("Qtde de filhos");
            $table->tinyInteger('ativo')->default(1)->comment("Curriculum ativa ou inativa");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->unique()->comment('Usuário');
            $table->foreignUuid('cidade_id')->constrained("cidades")->onDelete('restrict')->onUpdate('cascade')->comment('Cidade');
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
};

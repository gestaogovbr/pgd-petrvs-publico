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
        Schema::create('anexos', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome do arquivo com extensão");
            $table->string('descricao', 256)->comment("Descrição do anexo");
            $table->dateTime('data_comentario')->comment("Data e horário que foi feito o comentário");
            $table->string('path', 256)->nullable()->comment("Path relativo do arquivo");
            $table->text('base64')->nullable()->comment("Arquivo em formato base64");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('Referente ao Usuário');
            $table->foreignUuid('comentario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment('Referente ao Comentário');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('anexos');
    }
};

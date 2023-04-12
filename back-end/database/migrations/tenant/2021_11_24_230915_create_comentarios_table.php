<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComentariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comentarios', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->text('texto')->comment("Texto do comentário");
            $table->text('path')->nullable()->comment("Path dos ids dos comentários");
            $table->dateTime('data_hora')->comment("Data e horário que foi feito o comentário");
            $table->enum('tipo', ["COMENTARIO", "TECNICO", "GERENCIAL", "AVALIACAO"])->default("COMENTARIO")->comment("Tipo do comentário");
            $table->enum('privacidade', ["PUBLICO", "PRIVADO"])->default("PUBLICO")->comment("Nível de acesso ao comentário");
            // Chaves estrangeiras:
            $table->foreignUuid('usuario_id')->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("Usuário do comentário");
            $table->foreignUuid('comentario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade')->comment("comentário pai");
            $table->foreignUuid('demanda_id')->nullable()->constrained("demandas")->onDelete('restrict')->onUpdate('cascade')->comment("Demanda onde estão os comentários");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comentarios');
    }
}

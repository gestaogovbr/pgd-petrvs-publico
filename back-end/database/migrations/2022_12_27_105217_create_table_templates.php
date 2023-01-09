<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableTemplates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('templates', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            $table->integer('numero')->default(0)->comment("Número do template (Gerado pelo sistema)");
            $table->enum('tipo', ["TCR"])->comment("Especificação do tipo do template (interno do sistema)");
            $table->string('titulo', 256)->comment("Nome da tarefa");
            $table->text('conteudo')->nullable()->comment("Comentário predefinida para a tarefa");
            $table->json("data_set")->nullable()->comment("Dados da parametrização");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('templates');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('templates', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('codigo')->nullable()->comment("Código opcional para o template");
            $table->integer('numero')->unique()->default(0)->comment("Número do template (Gerado pelo sistema)");
            $table->enum('especie', ["SEI", "TCR", "OUTRO", "NOTIFICACAO"])->comment("Especificação da espécie do template (interno do sistema)");
            $table->string('titulo', 256)->comment("Título do template");
            $table->text('conteudo')->nullable()->comment("Comentário predefinida para a tarefa");
            $table->json("dataset")->nullable()->comment("Dados da parametrização");
            // Chaves estrangeiras:
            $table->foreignUuid('entidade_id')->nullable()->constrained('entidades')->onDelete('restrict')->onUpdate('cascade')->comment('Entidade');
            $table->foreignUuid('unidade_id')->nullable()->constrained('unidades')->onDelete('restrict')->onUpdate('cascade')->comment('Unidade');
        });
        // Cria sequencia template_numero
        Schema::table('sequences', function (Blueprint $table) {
            $table->integer('template_numero')->default(0)->comment("Sequencia numeria do número do template");
        });
        DB::unprepared('
            CREATE PROCEDURE sequence_template_numero() BEGIN
                UPDATE sequences SET template_numero = template_numero + 1;
                SELECT template_numero AS number FROM sequences;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS sequence_template_numero');
        Schema::table('sequences', function (Blueprint $table) {
            $table->dropColumn('template_numero');
        });
        Schema::dropIfExists('templates');
    }
};

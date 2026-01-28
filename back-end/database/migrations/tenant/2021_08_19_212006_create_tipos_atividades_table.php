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
        Schema::create('tipos_atividades', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('nome', 256)->comment("Nome do tipo de atividade");
            $table->float('esforco')->comment("Tempo previsto para a execução da atividade (Horas decimais)");
            $table->float('dias_planejado')->comment("Sugestão de dias para conclusão da atividade independente de quando iniciado (influência no prazo da atividade)");
            $table->json('etiquetas')->nullable()->comment("Nome das etiquetas para a atividade");
            $table->json('checklist')->nullable()->comment("Nome dos checklist para a atividade");
            $table->text('comentario')->nullable()->comment("Comentário predefinido para a atividade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipos_atividades');
    }
};

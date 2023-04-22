<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAtividadesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('atividades', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->string('nome', 256)->comment("Nome da classe de atividade");
            $table->float('tempo_pactuado')->comment("Tempo previsto para a execução da atividade (Horas decimais)");
            $table->float('dias_planejado')->comment("Sugestão de dias para conclusão da atividade independente de quando iniciado (influencia no prazo da demanda)");
            //$table->text('categoria')->nullable()->comment("Agrupamento de categoria para as atividades"); // Foi criado a tabela de TipoAtividade
            $table->float('tempo_minimo')->default(20.0)->comment("Tempo despendido mínimo aceitável para a atividade (% do tempo pactuado)");
            $table->tinyInteger('recalcula_prazo')->default(0)->comment("Recalcular o prazo de entrega depois de iniciada a demanda");
            $table->tinyInteger('desativa_produtividade')->default(0)->comment("Desativar o cálculo de produtividade e controle de tempo de execução (para atividades do tipo monitoramento)");
            $table->json('complexidade')->nullable()->comment("Graus de complexidade da atividade (complexidade, fator, tempo_pactuado, default)");
            $table->json('tipos_processo')->nullable()->comment("Configuração predefinidos de tipos associados de processos do Sei");
            $table->json('etiquetas_predefinidas')->nullable()->comment("Nome das etiquetas predefinidas para a demanda");
            $table->json('checklist_predefinidos')->nullable()->comment("Nome dos checklist predefinidas para a demanda");
            $table->text('comentario_predefinido')->nullable()->comment("Comentário predefinida para a demanda");
            $table->json('parametros_adotados')->nullable()->comment("Parametros adotados para definir a entrega da atividade (textual, para cumprir a IN65/2020-ME)");
            $table->json('entregas_esperadas')->nullable()->comment("Quais as entregas esperadas (textual, para cumprir a IN65/2020-ME)");
            $table->tinyInteger('homologado')->comment("Se a atividade foi homologada pela unidade gestora do teletrabalho");
            $table->dateTime('data_homologacao')->comment("Data em que houve a homologação");
            $table->dateTime('data_inicio')->comment("Data inicio da vigência");
            $table->dateTime('data_fim')->nullable()->comment("Data fim da vigência");
            // Chaves estrangeiras:
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_atividade_id')->nullable()->constrained("tipos_atividades")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('atividades');
    }
}

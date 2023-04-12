<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDemandasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('demandas', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            // Campos:
            $table->integer('numero')->unique()->comment("Número da demanda (Gerado pelo sistema)");
            $table->integer('id_requisicao')->nullable()->comment("ID da requisição do sistema integrado, caso seja o Sei será o ID_Documento");
            $table->string('numero_requisicao', 11)->nullable()->comment("Numero do documento de requisição, caso seja o Sei é o numero Sei");
            $table->integer('id_processo')->nullable()->comment("ID do processo, caso seja Sei será o ID do procedimento");
            $table->string('numero_processo', 50)->nullable()->comment("Número do processo, com a formatação de origem");
            $table->text('assunto')->nullable()->comment("Assunto da demanda");
            $table->dateTime('data_distribuicao')->comment("Data de cadastro da demanda");
            $table->float('carga_horaria')->nullable()->comment("Carga horária que será utilizada para todos os cálculos (vinda do plano de trabalho)");
            $table->float('tempo_planejado')->comment("Diferença entre data_distribuicao e prazo_entrega em horas (úteis ou corridas, configurada na unidade)");
            //$table->float('dias_planejado')->comment("Diferença entre data_distribuicao e prazo_entrega em dias (úteis ou corridas, configurada na unidade)");
            $table->dateTime('prazo_entrega')->comment("Data estipulada para entrega da demanda");
            $table->dateTime('data_inicio')->nullable()->comment("Data em que o usuário iniciou a atividade");
            $table->dateTime('data_entrega')->nullable()->comment("Data da entrega");
            $table->float('tempo_pactuado')->comment("Tempo calculado a partir da atividade e utilizando o fator_complexidade");
            $table->float('fator_complexidade')->default(1)->comment("Multiplicador do tempo da atividade");
            $table->float('tempo_despendido')->nullable()->comment("Calculado no fim da demanda, sendo o tempo líquido (considerando pausas)");
            //$table->float('dias_despendido')->nullable()->comment("Calculado no fim da demanda, sendo o tempo líquido (considerando pausas)");
            $table->integer('id_processo_entrega')->nullable()->comment("ID do processo de entrega, caso seja Sei será o ID do procedimento");
            $table->string('numero_processo_entrega', 50)->nullable()->comment("Número do processo de entrega, com a formatação de origem");
            $table->integer('id_documento_entrega')->nullable()->comment("ID da entrega, caso seja o Sei será o ID_Documento");
            $table->string('numero_documento_entrega', 11)->nullable()->comment("Numero do documento de entrega, caso seja o Sei é o numero Sei");
            $table->text('titulo_documento_entrega')->nullable()->comment("Numeração do tipo de documento no sistema integrado");
            $table->dateTime('data_arquivamento')->nullable()->comment("Data de arquivamento da demanda");
            $table->float('tempo_homologado')->nullable()->comment("Caso a avaliação seja positiva será igual ao tempo pactuado");
            $table->float('produtividade')->nullable()->comment("Diferença entre o tempo pactuado e o despendido");
            $table->json('etiquetas')->nullable()->comment("Etiquetas");
            $table->json('checklist')->nullable()->comment("Checklist");
            $table->integer('prioridade')->nullable()->comment("Nível de prioridade");
            $table->tinyInteger('recalcula_prazo')->comment("Recalcula data de entrega baseado nos dias planejado");
            // Chaves estrangeiras:
            $table->foreignUuid('atividade_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('demandante_id')->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('usuario_id')->nullable()->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('unidade_id')->constrained()->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_documento_requisicao_id')->nullable()->constrained('tipos_documentos')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_documento_entrega_id')->nullable()->constrained('tipos_documentos')->onDelete('restrict')->onUpdate('cascade');
            //$table->foreignUuid('tipo_requisicao_id')->nullable()->constrained('tipos_requisicoes')->onDelete('set null')->onUpdate('cascade');
            /* OBS.: 
            - avaliacao_id será adicionado pela migration 2021_08_20_174951_create_demandas_avaliacaos_table
            - Referenciado na tabela de anexos
            - Referenciado na tabela comentarios (gerencial)
            - Referenciado na tabela comentarios (tecnico)
            - Referenciado na tabela de demandas_vinculos
            - plano_id criado em 2021_08_20_174957_create_planos_table
            */
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('demandas');
    }
}

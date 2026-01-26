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
        Schema::create('unidades', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos
            $table->string('codigo', 12)->nullable()->comment('Código da unidade');
            $table->string('sigla', 100)->comment("Sigla da unidade");
            $table->string('nome', 256)->comment("Nome da unidade");
            $table->tinyInteger('instituidora')->default(0)->comment("Se a unidade é instituidora (Programas)");
            $table->text('path')->nullable()->comment('Path dos nós pais separados por /, ou NULL caso sejam nós raiz');
            $table->longText('texto_complementar_plano')->nullable()->comment("Campo de mensagem adicional do plano de trabalho");
            $table->tinyInteger("atividades_arquivamento_automatico")->default(0)->comment("Se arquiva automaticamente após conclusão");
            $table->tinyInteger("atividades_avaliacao_automatico")->default(0)->comment("");
            $table->integer("planos_prazo_comparecimento")->default(10)->comment("");
            $table->string('planos_tipo_prazo_comparecimento')->default('DIAS')->comment("");
            $table->dateTime('data_inativacao')->nullable()->comment("Data em que a unidade foi inativada, se for o caso");
            $table->set("distribuicao_forma_contagem_prazos", ["HORAS_CORRIDAS", "DIAS_CORRIDOS", "HORAS_UTEIS", "DIAS_UTEIS"])->default("DIAS_UTEIS")->comment("Forma da contagem de prazo");
            $table->set("entrega_forma_contagem_prazos", ["HORAS_CORRIDAS", "HORAS_UTEIS"])->default("HORAS_UTEIS")->comment("Forma da contagem de horas para entrega");
            $table->tinyInteger("autoedicao_subordinadas")->default(1)->comment("");
            $table->json("etiquetas")->nullable()->comment("Configuração das etiquetas que serão utilizadas nas atividades (contém nome, icone e cor)");
            $table->json('checklist')->nullable()->comment("Nome dos checklist");
            $table->json('notificacoes')->nullable()->comment("Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)");
            $table->json('expediente')->nullable()->comment("Configuração de expediente da unidade");
            
            // Chaves estrangeiras:
            $table->foreignUuid('cidade_id')->nullable()->constrained("cidades")->onDelete('restrict')->onUpdate('cascade')->comment('Cidade da unidade');
            $table->foreignUuid('unidade_pai_id')->nullable()->constrained("unidades")->onDelete('restrict')->onUpdate('cascade')->comment('Unidade superior (nó pai hierárquico)');
            $table->foreignUuid('entidade_id')->constrained("entidades")->onDelete('restrict')->onUpdate('cascade')->comment('Entidade da unidade');
            // Indices
            $table->index('codigo');
            $table->fulltext('path');
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unidades');
    }
};

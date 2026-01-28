<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('entidades', function (Blueprint $table) {
            // Configurações
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            // Campos:
            $table->string('sigla', 100)->unique()->comment("Sigla da entidade");
            $table->string('nome', 256)->comment("Nome da entidade");
            $table->enum("abrangencia", ["NACIONAL", "ESTADUAL", "MUNICIPAL"])->comment("Abrangência da entidade");
            $table->string("codigo_ibge", 8)->nullable()->comment("Código da UF ou do município (IBGE)");
            $table->string("uf", 2)->nullable()->comment("UF para feriados estaduais");
            $table->integer("carga_horaria_padrao")->default(8)->comment("Carga horária utilizada ao criar plano de trabalho");
            $table->tinyInteger("gravar_historico_processo")->default(0)->comment("Se grava andamento da atividade dentro do processo vinculado (Caso seja o SEI, será em Consultar Andamento)");
            $table->enum("layout_formulario_atividade", ["COMPLETO", "SIMPLIFICADO"])->default("COMPLETO")->comment("Layout para a tela do formulário de atividades (cadastro simplificado ou completo)");
            $table->json("campos_ocultos_atividade")->nullable()->comment("Campos que se deseja ocultar do formulário de atividade, com seu respectivo valor padrão, em caso de NULL será utilizado o valor default do banco");
            $table->json("nomenclatura")->nullable()->comment("Nomenclatura utilizada no sistema");
            $table->string("url_sei", 100)->nullable()->comment("URL base do SEI da entidade");
            $table->json('notificacoes')->nullable()->comment("Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)");
            $table->enum('forma_contagem_carga_horaria', ["DIA", "SEMANA", "MES"])->default("DIA")->comment("Forma de contagem padrão da carga horária");
            $table->text('api_public_key')->nullable()->comment("Chave pública de API");
            $table->text('api_private_key')->nullable()->comment("Chave privada de API");
            $table->json('expediente')->default(new Expression("('{\"domingo\":[],\"segunda\":[],\"terca\":[],\"quarta\":[],\"quinta\":[],\"sexta\":[],\"sabado\":[],\"especial\":[]}')"))->comment("Configuração de expediente");
            // Chaves estrangeiras:
            $table->foreignUuid('tipo_modalidade_id')->nullable()->constrained('tipos_modalidades')->onDelete('restrict')->onUpdate('cascade')->comment("Tipo de modalidade utilizada ao criar plano de trabalho");
            $table->foreignUuid('cidade_id')->nullable()->constrained('cidades')->onDelete('restrict')->onUpdate('cascade')->comment("Cidade onde está estabelecida a sede da entidade");
            $table->foreignUuid('gestor_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment('Usuário gestor da entidade');
            $table->foreignUuid('gestor_substituto_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment('Usuário gestor substituto da entidade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('entidades');
    }
};

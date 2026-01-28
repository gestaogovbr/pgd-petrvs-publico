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
        Schema::create('usuarios', function (Blueprint $table) {
            $situacoes = array(
                "ATIVO PERMANENTE",
                "APOSENTADO",
                "CEDIDO/REQUISITADO",
                "NOMEADO CARGO COMIS.",
                "SEM VÍNCULO",
                "TABELISTA(ESP/EMERG)",
                "NATUREZA ESPECIAL",
                "ATIVO EM OUTRO ÓRGÃO",
                "REDISTRIBUÍDO",
                "ATIVO TRANSITÓRIO",
                "EXCEDENTE À LOTAÇÃO",
                "CONTRATO TEMPORÁRIO",
                "EM DISPONIBILIDADE",
                "REQ.DE OUTROS ÓRGÃOS",
                "INSTITUIDOR PENSÃO",
                "REQ. MILITAR F. ARM",
                "APOSENTADO TCU733/94",
                "EXERC DESCENT CARREI",
                "EXERCÍCIO PROVISÓRIO",
                "CELETISTA",
                "ATIVO PERM L.8878/94",
                "ANISTIADO ADCT CF",
                "CELETISTA/EMPREGADO",
                "CLT ANS DEC JUDICIAL",
                "CLT ANS JUD. CEDIDO",
                "CLT-APOS.COMPLEMENTO",
                "CLT-APS.DEC.JUDICIAL",
                "INST.PS DEC JUD",
                "EMPREGO PÚBLICO",
                "REFORMA CBM / PM",
                "RESERVA CBM / PM",
                "REQUIS. MILITAR GDF",
                "ANIST.PUBLICO L10559",
                "ANIST.PRIVADO L10559",
                "ATIVO - DEC. JUDIC",
                "COLAB PCCTAE E MAGIS",
                "COLABORADOR ICT",
                "CLT ANS -DEC 6657/08",
                "EXERC. 7  ART93 8112",
                "CEDIDO SUS/LEI 8270",
                "INST.ANIST.PUBLICO",
                "INST.ANIST.PRIVADO",
                "CELETISTA DEC.JUDIC.",
                "CONTR.TEMPORARIO CLT",
                "EMPREGO PCC/EX-TERRI",
                "EXC. INDISCIPLINA",
                "CONT.PROF.SUBSTITUTO",
                "ESTAGIÁRIO",
                "ESTAGIÁRIO SIGEPE",
                "RESIDÊNCIA E PMM",
                "APOSENTADO TEMPORARI",
                "CEDIDO DF EST MUNIC.",
                "EXERC. DESCEN. CDT",
                "EXERC. LEI 13681/18",
                "PENSIONISTA",
                "BENEFICIÁRIO PENSÃO",
                "QE/MRE - CEDIDO",
                "QUADRO ESPEC.-QE/MRE",
            );

            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->softDeletes();
            $table->rememberToken();
            // Campos:
            $table->string('email', 100)->unique()->comment("E-mail do usuário");
            $table->string('nome', 256)->comment("Nome do usuário");
            $table->string('password')->nullable()->comment("Senha do usuário");
            $table->string('cpf', 14)->comment("CPF do usuário");
            $table->string('matricula', 10)->nullable()->comment("Matrícula funcional do usuário");
            $table->string('apelido', 100)->comment("Apelido/Nome de guerra/Nome social");
            $table->string('telefone', 50)->nullable()->comment("Telefone do usuário");
            $table->date('data_nascimento')->nullable()->comment("Data de nascimento do servidor");
            $table->string('id_google', 50)->nullable()->comment('Id associado com o usuário do login do google');
            $table->string('url_foto', 255)->nullable()->comment('URL da foto do usuário (temporário)');
            $table->longText('texto_complementar_plano')->nullable()->comment("Campo de mensagem adicional do plano de trabalho");
            $table->text('foto_perfil')->nullable()->comment("Foto padrão do perfil");
            $table->text('foto_google')->nullable()->comment("Foto do G-Suit (Google)");
            $table->text('foto_microsoft')->nullable()->comment("Foto do Azure (Microsoft)");
            $table->text('foto_firebase')->nullable()->comment("Foto do Firebase (Google, Facebook, Instagram, Twiter, etc...)");
            $table->text('id_super')->nullable()->comment("Id do usuário no SUPER");
            $table->char('uf', 2)->nullable()->comment("UF do usuário");
            $table->timestamp('email_verified_at')->nullable()->comment("Data de verificação do e-mail do usuário");
            $table->enum('sexo', ["MASCULINO", "FEMININO"])->nullable()->comment("Sexo do usuário");
            $table->enum("situacao_funcional", $situacoes)->default("ATIVO PERMANENTE")->comment("Vínculo do usuário com a administração");
            $table->json('config')->nullable()->comment("Configurações do usuário");
            $table->json('notificacoes')->nullable()->comment("Configurações das notificações (Se envia e-mail, whatsapp, tipos, templates)");
            $table->json('metadados')->nullable()->comment("Metadados do usuário");
            // Chaves estrangeiras:
            $table->foreignUuid('perfil_id')->nullable()->constrained('perfis')->onDelete('restrict')->onUpdate('cascade')->comment("Perfil do usuário");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            // Configurações:
            $table->uuid('id');
            $table->primary('id');
            $table->timestamps();
            $table->rememberToken();
            // Campos:
            $table->string('email', 100)->unique()->comment("Email do usuário");
            $table->string('nome', 256)->comment("Nome do usuário");
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('cpf', 14)->comment("CPF do usuário");
            $table->string('matricula', 10)->nullable()->comment("Matrícula funcional do usuário");
            $table->string('apelido', 100)->comment("Apelido/Nome de guerra/Nome social");
            $table->string('telefone', 50)->nullable()->comment("Telefone do usuário");
            $table->enum('sexo', ["MASCULINO", "FEMININO"])->nullable();
            $table->json('config')->nullable();
            $table->dateTime('data_inicio');
            $table->dateTime('data_fim')->nullable();
            $table->string('id_google', 50)->nullable()->comment('Id associado com o usuário do login do google');
            $table->string('url_foto', 255)->nullable()->comment('Url da foto do usuário (temporário)');
            $table->json('metadados')->nullable()->comment("Metadados");
            // Chaves estrangeiras:
            $table->foreignUuid('perfil_id')->nullable()->constrained('perfis')->onDelete('restrict')->onUpdate('cascade');
            /* Obs.: 
            - Referenciado na tabela de anexos
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
        Schema::dropIfExists('usuarios');
    }
}

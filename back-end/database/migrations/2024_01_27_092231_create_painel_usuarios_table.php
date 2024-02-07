<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePainelUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('painel_usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('email', 100)->unique()->comment("E-mail do usuário");
            $table->string('nome', 256)->comment("Nome do usuário");
            $table->string('password')->comment("Senha do usuário");
            $table->string('cpf', 14)->comment("CPF do usuário");
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('painel_usuarios');
    }
}

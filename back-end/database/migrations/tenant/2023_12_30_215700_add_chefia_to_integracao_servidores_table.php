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
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->string('cpf_chefia_imediata', 50)
                ->nullable()
                ->comment("Registra CPF da chefia imediata informado pelo Siape.");
            $table->string('email_chefia_imediata', 50)
                ->nullable()
                ->comment("Registra e-mail da chefia imediata informado pelo Siape.");
        });
        //
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('integracao_servidores', function (Blueprint $table) {
            $table->dropColumn('cpf_chefia_imediata');
            $table->dropColumn('email_chefia_imediata');
            //
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrafficTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('log')->create('traffic', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id')->nullable()->comment('Usuário que criou o registro');
            $table->dateTime('date_time')->useCurrent()->comment('Data e hora do registro');
            $table->text('url')->comment('Url solicitada na requisição');
            $table->json('request')->comment('Dados da requisição');
            $table->json('response')->comment('Dados da resposta');
            $table->index(['date_time']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('log')->dropIfExists('traffic');
    }
}

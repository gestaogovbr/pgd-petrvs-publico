<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class JobAgendamentos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_agendamentos', function (Blueprint $table) {
            $table->id();
            $table->string('nome_do_job');
            $table->boolean('diario')->default(false); // True para diário, false para não diário
            $table->time('horario')->nullable(); // Horário de execução para agendamentos diários
            $table->string('expressao_cron')->nullable(); // Para agendamentos não diários
            $table->boolean('ativo')->default(true); // Status do agendamento
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
        Schema::dropIfExists('job_agendamentos');
    }
}

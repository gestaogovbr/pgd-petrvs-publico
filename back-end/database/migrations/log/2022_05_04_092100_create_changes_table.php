<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChangesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('log')->create('changes', function (Blueprint $table) {
            $table->id();
            $table->uuid('user_id')->nullable()->comment('Usuário que criou o registro');
            $table->dateTime('date_time')->useCurrent()->comment('Data e hora do registro');
            $table->string('table_name', 100)->comment('Nome da tabela');
            $table->uuid('row_id')->comment('Id do registro');
            $table->enum('type', ["ADD", "EDIT", "DELETE"])->comment('Qual operação o log está registrando');
            $table->json('delta')->comment('Alterações');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('log')->dropIfExists('changes');
    }
}

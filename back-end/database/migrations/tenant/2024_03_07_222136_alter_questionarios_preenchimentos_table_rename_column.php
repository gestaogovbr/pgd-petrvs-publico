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
      Schema::table('questionarios_preenchimentos', function (Blueprint $table) {
        $table->renameColumn('data_respostas', 'data_preenchimento');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table('questionarios_preenchimentos', function (Blueprint $table) {
        $table->renameColumn('data_preenchimento','data_respostas');
      });
    }
};

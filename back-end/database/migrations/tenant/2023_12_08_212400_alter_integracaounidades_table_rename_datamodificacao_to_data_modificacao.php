<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
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
        Schema::table('integracao_unidades', function (Blueprint $table) {
            $table->renameColumn("datamodificacao", "data_modificacao");
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('integracao_unidades', function (Blueprint $table) {
            $table->renameColumn("data_modificacao", "datamodificacao");
        });
    }
};

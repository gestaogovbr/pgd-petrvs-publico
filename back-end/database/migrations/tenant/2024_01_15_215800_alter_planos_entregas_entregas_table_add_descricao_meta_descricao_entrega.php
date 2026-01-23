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
        Schema::table('planos_entregas_entregas', function (Blueprint $table) {
            $table->longText("descricao_meta")->comment("Descrição da meta");
            $table->longText("descricao_entrega")->comment("Descrição do título da entrega");
        });
    }

    public function down()
    {
        Schema::table('planos_entregas_entregas', function (Blueprint $table) {
            $table->dropColumn('descricao_meta');
            $table->dropColumn('descricao_entrega');
        });
    }
};

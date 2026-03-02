<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('planos_entregas_entregas', function (Blueprint $table) {
            $table->dropForeign(['entrega_pai_id']);
        });
    }

    public function down()
    {
        Schema::table('planos_entregas_entregas', function (Blueprint $table) {
            $table->foreign('entrega_pai_id')
                ->references('id')->on('planos_entregas_entregas')
                ->onDelete('restrict')
                ->onUpdate('cascade');
        });
    }
};

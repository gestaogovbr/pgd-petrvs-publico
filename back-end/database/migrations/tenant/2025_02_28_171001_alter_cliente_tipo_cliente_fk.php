<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
      Schema::table('clientes', function (Blueprint $table) {
        $table->dropForeign(['tipo_cliente_id']);        
        $table->foreign('tipo_cliente_id')
            ->references('id')
            ->on('tipos_clientes')
            ->onDelete('restrict'); 
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
      Schema::table('clientes', function (Blueprint $table) {
        $table->dropForeign(['tipo_cliente_id']);

        $table->foreign('tipo_cliente_id')
            ->references('id')
            ->on('tipos_clientes')
            ->onDelete('cascade');
    });
    }
};

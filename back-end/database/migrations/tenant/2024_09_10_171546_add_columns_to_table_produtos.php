<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('produtos', function (Blueprint $table) {
                $table->uuid('unidade_id')->nullable(false); 
                $table->timestamp('data_ativado')->nullable(); 
                $table->timestamp('data_desativado')->nullable(); 
                
                $table->bigInteger('identificador')->unsigned()->nullable(false);

                $table->foreign('unidade_id')->references('id')->on('unidades');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('produtos', function (Blueprint $table) {
            $table->dropForeign(['unidade_id']);
            

            $table->dropColumn(['unidade_id', 'data_ativado', 'data_desativado', 'identificador']);
        });
    }
};

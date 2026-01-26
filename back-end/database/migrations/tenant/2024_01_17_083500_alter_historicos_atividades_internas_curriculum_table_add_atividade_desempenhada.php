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
        //DB::statement('ALTER TABLE curriculums_profissionais CHANGE ano_ingresso integer null;');
        Schema::table('historicos_atividades_internas_curriculum', function (Blueprint $table) {
            $table->string('atividade_desempenhada', 256)->nullable()->comment("Atividade desempenhada na instituição");
        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('historicos_atividades_internas_curriculum', function (Blueprint $table) {
            $table->dropColumn(['atividade_desempenhada']);
        });
    }
};

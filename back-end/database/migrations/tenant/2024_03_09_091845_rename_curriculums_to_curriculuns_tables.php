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
        Schema::rename('curriculums', 'curriculuns');
        Schema::rename('curriculums_graduacoes', 'curriculuns_graduacoes');
        Schema::rename('curriculums_profissionais', 'curriculuns_profissionais');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::rename('curriculuns', 'curriculums');
      Schema::rename('curriculuns_graduacoes', 'curriculums_graduacoes');
      Schema::rename('curriculuns_profissionais', 'curriculums_profissionais');
    }
};

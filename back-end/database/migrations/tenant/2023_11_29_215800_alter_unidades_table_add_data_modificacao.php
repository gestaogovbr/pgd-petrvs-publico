<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUnidadesAddDataModificacaoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('unidades', function (Blueprint $table) {
            $table->dateTime('datamodificacao')->nullable()->comment("Data de modificação informado pelo SIAPE.");
        });
    }

    public function down()
    {
        Schema::table('unidades', function (Blueprint $table) {
            $table->dropColumn('datamodificacao');
        });
    }
}

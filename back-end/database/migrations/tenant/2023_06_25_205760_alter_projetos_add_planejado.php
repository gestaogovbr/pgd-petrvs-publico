<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AlterPlanosTrabalhosEntregasAddCampos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projetos', function (Blueprint $table) {
            $table->dateTime('usa_baseline')->default(1)->comment("Se o projeto utiliza baseline");
            $table->dateTime('inicio_baseline')->nullable()->comment("Inicio do projeto (Baseline)");
            $table->dateTime('termino_baseline')->nullable()->comment("Fim do projeto (Baseline)");
        });
        DB::statement("ALTER TABLE `projetos` RENAME COLUMN `usar_horas` TO `usa_horas`");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projetos', function (Blueprint $table) {
            $table->dropColumn('inicio_baseline');
            $table->dropColumn('termino_baseline');
        });
        DB::statement("ALTER TABLE `projetos` RENAME COLUMN `usa_horas` TO `usar_horas`");
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterTemplatesTableAddCodigoEntidadeUnidade extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('templates', function (Blueprint $table) {
            $table->string('codigo')->nullable()->comment("Código opcional para o template");
            $table->foreignUuid('entidade_id')->nullable()->constrained('entidades')->onDelete('restrict')->onUpdate('cascade')->comment('Entidade');
            $table->foreignUuid('unidade_id')->nullable()->constrained('unidades')->onDelete('restrict')->onUpdate('cascade')->comment('Unidade');
        });
        DB::statement("ALTER TABLE templates MODIFY especie ENUM('TERMO_ADESAO', 'SEI', 'TCR', 'NOTIFICACAO') COMMENT 'Especificação da espécie do documento (interno do sistema)'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('templates', function (Blueprint $table) {
            $table->dropColumn('codigo');
            $table->dropForeign('entidade_id');
            $table->dropColumn('entidade_id');
            $table->dropForeign('unidade_id');
            $table->dropColumn('unidade_id');
        });
        DB::statement("ALTER TABLE templates MODIFY especie ENUM('TERMO_ADESAO', 'SEI', 'TCR') COMMENT 'Especificação da espécie do documento (interno do sistema)'");
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class DropAdesaoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("DELETE FROM templates WHERE especie = 'TCR_CANCELAMENTO'");
        DB::statement("ALTER TABLE templates MODIFY especie ENUM('TERMO_ADESAO', 'SEI', 'TCR') COMMENT 'Especificação da espécie do template (interno do sistema)'");
        DB::statement("DELETE FROM documentos WHERE especie = 'TCR_CANCELAMENTO'");
        DB::statement("ALTER TABLE documentos MODIFY especie ENUM('TERMO_ADESAO', 'SEI', 'TCR') COMMENT 'Especificação da espécie do documento (interno do sistema)'");

        /*  Note by Farias: na tabela 'entidades' eu já excluí esses campos.
            Como as tabelas 'documentos' e 'templates' não estão comigo, não apaguei esta migration.

            Schema::table('entidades', function (Blueprint $table) {
            if(Schema::hasColumn('entidades', 'template_adesao_id')) {
                $table->dropForeign(['template_adesao_id']);
                $table->dropColumn('template_adesao_id');
            }
            if(Schema::hasColumn('entidades', 'template_adesao_cancelamento_id')) {
                $table->dropForeign(['template_adesao_cancelamento_id']);
                $table->dropColumn('template_adesao_cancelamento_id');
            }
        }); */
        if(Schema::hasColumn('documentos', 'programa_adesao_id')) {
            Schema::table('documentos', function (Blueprint $table) {
                $table->dropForeign(['programa_adesao_id']);
                $table->dropColumn('programa_adesao_id');
            });
        }
        Schema::disableForeignKeyConstraints();

/*      Note by Farias: também já apaguei estas três tabelas, pois estão na minha pasta.
        Schema::dropIfExists("programas_adesoes_unidades");
        Schema::dropIfExists("programas_adesoes_usuarios");
        Schema::dropIfExists("programas_adesoes"); */
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Irreversível
    }
}

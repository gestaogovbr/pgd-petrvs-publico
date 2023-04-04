<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterProgramasTableAddTemplateTcr extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('programas', function (Blueprint $table) {
            $table->tinyInteger('termo_obrigatorio')->default(0)->comment("Se o termo é obrigatório");
            $table->foreignUuid('template_tcr_id')->nullable()->constrained("templates")->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('tipo_documento_tcr_id')->nullable()->constrained("tipos_documentos")->onDelete('restrict')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('programas', function (Blueprint $table) {
            $table->dropColumn('termo_obrigatorio');
            $table->dropForeign(['template_tcr_id']);
            $table->dropColumn('template_tcr_id');
            $table->dropForeign(['tipo_documento_tcr_id']);
            $table->dropColumn('tipo_documento_tcr_id');
        });
    }
}

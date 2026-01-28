<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE documentos CHANGE especie especie ENUM('SEI', 'TCR', 'OUTRO', 'NOTIFICACAO', 'RELATORIO')");
        DB::statement("ALTER TABLE documentos CHANGE tipo tipo ENUM('HTML', 'PDF', 'LINK', 'REPORT')");

        Schema::table('documentos', function (Blueprint $table) {
            $table->foreignUuid('usuario_id')->nullable()->constrained("usuarios")->onDelete('restrict')->onUpdate('cascade')->comment("Usuário que salvou o documento");
        });

    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE documentos CHANGE especie especie ENUM('SEI', 'TCR', 'OUTRO', 'NOTIFICACAO')");
        DB::statement("ALTER TABLE documentos CHANGE tipo tipo ENUM('HTML', 'PDF', 'LINK')");

        Schema::table('documentos', function (Blueprint $table) {
            $table->dropForeign(['usuario_id']);
            $table->dropColumn('usuario_id');
        });

    }
};

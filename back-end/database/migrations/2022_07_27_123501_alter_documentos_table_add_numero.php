<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Documento;

class AlterDocumentosTableAddNumero extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documentos', function (Blueprint $table) {
            $table->integer('numero')->default(0)->comment("Número do documento (Gerado pelo sistema)");
        });
        $numero = 1;
        foreach (Documento::all() as $documento) {
            $documento->numero = $numero;
            $numero++;
            $documento->save();
        }
        Schema::table('documentos', function (Blueprint $table) {
            $table->unique(['numero']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('documentos', function (Blueprint $table) {
            $table->dropUnique(['numero']);
            $table->dropColumn('numero');
        });
    }
}

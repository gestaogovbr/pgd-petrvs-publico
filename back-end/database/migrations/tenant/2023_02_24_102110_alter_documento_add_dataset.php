<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class AlterDocumentoAddDataset extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('documentos', function (Blueprint $table) {
            $table->json("dataset")->nullable()->comment("Definição das variáveis disponíveis para o template");
        });
        if(Schema::hasColumn('documentos', 'data_source')) DB::statement("ALTER TABLE documentos RENAME COLUMN data_source TO datasource;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if(Schema::hasColumn('documentos', 'datasource')) DB::statement("ALTER TABLE documentos RENAME COLUMN datasource TO data_source;");
        Schema::table('documentos', function (Blueprint $table) {
            if(Schema::hasColumn('documentos', 'dataset')) $table->dropColumn("dataset");
        });
    }
}

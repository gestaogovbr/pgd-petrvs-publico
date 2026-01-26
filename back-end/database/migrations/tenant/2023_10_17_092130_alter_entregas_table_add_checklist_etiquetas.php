<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
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
        Schema::table('entregas', function (Blueprint $table) {
            $table->json('checklist')->nullable()->comment("Checklist");
            $table->json('etiquetas')->nullable()->comment("Etiquetas");
        });
    }

    public function down()
    {
        Schema::table('entregas', function (Blueprint $table) {
            $table->dropColumn('checklist');
            $table->dropColumn('etiquetas');
        });
    }
};

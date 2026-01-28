<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->foreignUuid('okr_id')->nullable()->constrained("okrs")->onDelete('restrict')->onUpdate('cascade')->comment("OKR");
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->dropForeign(['okr_id']);
            $table->dropColumn('okr_id');
        });
    }
};

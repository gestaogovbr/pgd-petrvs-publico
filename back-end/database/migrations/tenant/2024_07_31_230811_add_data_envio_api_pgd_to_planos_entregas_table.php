<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->timestamp('data_envio_api_pgd')->nullable()->after('okr_id');
        });
    }

    public function down()
    {
        Schema::table('planos_entregas', function (Blueprint $table) {
            $table->dropColumn('data_envio_api_pgd');
        });
    }
};

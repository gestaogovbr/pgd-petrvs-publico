<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterChangesTableAddTableNameRowIdIndex extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('log')->table('changes', function (Blueprint $table) {
            $table->index(['table_name','row_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('log')->table('changes', function (Blueprint $table) {
            $table->dropIndex(['table_name','row_id']);
        });
    }
}

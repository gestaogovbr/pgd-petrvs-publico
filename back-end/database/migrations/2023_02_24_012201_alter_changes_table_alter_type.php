<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterChangesTableAlterType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::connection("log")->statement("ALTER TABLE changes MODIFY COLUMN type ENUM('ADD', 'EDIT', 'SOFT_DELETE', 'DELETE')");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::connection("log")->statement("ALTER TABLE changes MODIFY COLUMN type ENUM('ADD', 'EDIT', 'DELETE')");
    }
}

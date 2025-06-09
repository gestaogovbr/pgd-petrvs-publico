<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');

        try{
            if (Schema::hasTable('telescope_entries_tags')) {
                DB::table('telescope_entries_tags')->truncate();
            }

            if (Schema::hasTable('telescope_entries')) {
                DB::table('telescope_entries')->truncate();
            }

            if (Schema::hasTable('telescope_monitoring')) {
                DB::table('telescope_monitoring')->truncate();
            }
        }finally {
            DB::statement('SET FOREIGN_KEY_CHECKS = 1;');
        }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

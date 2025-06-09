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
        if (Schema::hasTable('telescope_entries_tags')) {
            DB::table('telescope_entries_tags')->truncate();
        }

        if (Schema::hasTable('telescope_entries')) {
            DB::table('telescope_entries')->truncate();
        }

        if (Schema::hasTable('telescope_monitoring')) {
            DB::table('telescope_monitoring')->truncate();
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

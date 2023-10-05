<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TruncateAllTables extends Command
{
    protected $signature = 'db:truncate-all';

    protected $description = 'Truncate all tables in the database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $tables = DB::connection()->getDoctrineSchemaManager()->listTableNames();

        foreach ($tables as $table) {
            if (Schema::hasTable($table)) {
                DB::table($table)->delete();
                $this->info("Table $table truncated.");
            }
        }

        $this->info('All tables truncated.');
    }
}

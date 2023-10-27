<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

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
        // Obtenha uma lista de todas as tabelas no banco de dados
        $tables = DB::select('SHOW TABLES');

        foreach ($tables as $table) {
            $table = reset($table); // O nome da tabela está no primeiro elemento do array retornado

            // Execute a instrução SQL para truncar a tabela
            DB::table($table)->truncate();

            $this->info("Table $table truncated.");
        }

        $this->info('All tables truncated.');
    }
}

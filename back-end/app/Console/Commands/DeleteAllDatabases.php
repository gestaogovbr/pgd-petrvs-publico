<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;

class DeleteAllDatabases extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:delete-all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete all databases';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Verifique se o APP_ENV é "production" e pare o comando se for
        if (app()->environment('production')) {
            $this->error('This command cannot be run in the "production" environment.');
            return;
        }
        // Conecta ao banco de dados padrão (informações no .env)
        $defaultConnection = config('database.default');
        $connectionConfig = config("database.connections.$defaultConnection");

        $dbName = $connectionConfig['database'];
        $dbHost = $connectionConfig['host'];
        $dbPort = $connectionConfig['port'];
        $dbUsername = $connectionConfig['username'];
        $dbPassword = $connectionConfig['password'];

        $pdo = new \PDO("mysql:host=$dbHost;port=$dbPort", $dbUsername, $dbPassword);

        // Lista todos os bancos de dados
        $stmt = $pdo->query("SHOW DATABASES");
        $databases = $stmt->fetchAll(\PDO::FETCH_COLUMN);

        // Exclui os bancos de dados, exceto o banco de dados padrão e bancos de sistema
        foreach ($databases as $database) {
            if ($database !== $dbName && !in_array($database, ['sys', 'mysql', 'information_schema', 'performance_schema'])) {
                DB::purge($defaultConnection);
                DB::connection($defaultConnection)->statement("DROP DATABASE IF EXISTS $database");
                $this->info("Database $database deleted.");
            }
        }

        $this->info('All databases deleted except the default one.');
    }

}

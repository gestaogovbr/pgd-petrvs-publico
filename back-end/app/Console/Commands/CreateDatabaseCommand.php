<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Config;

class CreateDatabaseCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create Central Database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try{
            $dbname = env("DB_DATABASE");
            $connection = env("DB_CONNECTION");
            /* Remove informação de database da conexão com o banco, pois o Laravel verifica toda vez */
            Config::set("database.connections." . $connection . ".database", null);
            DB::purge('log');
            $hasDb = DB::connection($connection)->select("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = "."'".$dbname."'");
            if(empty($hasDb)) {
                DB::connection($connection)->select('CREATE DATABASE '. $dbname);
                $this->info("Database '$dbname' created for '$connection' connection");
            } else {
                $this->info("Database $dbname already exists for $connection connection");
            }
        }
        catch (\Exception $e){
            $this->error($e->getMessage());
        }
    }
}

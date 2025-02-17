<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class JobScheduleSeeder extends Seeder
{
    public function run(): void
    {
        config(['database.connections.mysql.database' => 'petrvs']); 
        DB::reconnect('mysql');
        DB::purge('mysql');

        DB::connection('mysql')->table('jobs_schedules')->upsert([
            [
                'id'=> '7d255930-5549-11ef-bc8d-0242ac180002',
                'nome' => 'Enviar dados ao PGD',
                'classe' => 'PGDExportarDadosJob',
                'ativo' => true,
                'expressao_cron' => '*/2 * * * *',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'deleted_at' => null,
                'parameters' => '[]'
            ]
          ], 'classe');
    }
}

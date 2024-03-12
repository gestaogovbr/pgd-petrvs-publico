<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RemoveCpfMaskForTenantsSeeder extends Seeder
{
  public function run()
  {
    $tenantDatabases = ['petrvs_mgi'];

    foreach ($tenantDatabases as $dbName) {
      config(['database.connections.mysql.database' => $dbName]);
      DB::reconnect('mysql');
      DB::purge('mysql');

      $databaseExists = DB::connection('mysql')->select("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?", [$dbName]);

      if (!empty($databaseExists)) {
        DB::connection('mysql')->table('usuarios')->get()->each(function ($user) {
          $cpfSemMascara = preg_replace('/[^0-9]/', '', $user->cpf);
          DB::connection('mysql')->table('usuarios')
            ->where('id', $user->id)
            ->update(['cpf' => $cpfSemMascara]);
        });
      }
    }
  }
}

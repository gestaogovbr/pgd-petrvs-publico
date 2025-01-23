<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DeployHMGSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   *
   * @return void
   */
  public function run()
  {
    $this->call([
      CidadeSeeder::class,
      FeriadoSeeder::class,
      PerfilSeeder::class,
      TipoCapacidadeSeeder::class,
      CapacidadeSeeder::class,
      NomenclaturaSeeder::class,
      TipoMotivoAfastamentoSeeder::class,
      JobScheduleSeeder::class,
      TipoClientesSeeder::class
    ]);
  }
}

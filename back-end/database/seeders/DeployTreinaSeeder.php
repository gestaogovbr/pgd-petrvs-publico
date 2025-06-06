<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class DeployTreinaSeeder extends Seeder
{
  /**
   * Run the database seeds.
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
      In24_TreinaSeeder::class,
      FuncaoSeeder::class,      
      NomenclaturaSeeder::class,
    ]);
  }
}

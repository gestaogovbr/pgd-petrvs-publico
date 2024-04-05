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
      In24_TreinaSeeder::class,
      TipoCapacidadeSeeder::class,
      CapacidadeSeeder::class,
      FuncaoSeeder::class,      
      NomenclaturaSeeder::class,
    ]);
  }
}

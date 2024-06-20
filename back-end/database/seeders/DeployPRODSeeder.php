<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class DeployPRODSeeder extends Seeder
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
        FuncaoSeeder::class,
        In24_2023Seeder::class,
        TipoMotivoAfastamentoSeeder::class
    ]);
  }
}

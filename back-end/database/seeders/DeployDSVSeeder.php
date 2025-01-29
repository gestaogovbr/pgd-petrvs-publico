<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DeployDSVSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   *
   * @return void
   */
    public function run()
    {
        $this->call(CidadeSeeder::class);
        sleep(2);

        $this->call(FeriadoSeeder::class);
        sleep(2);

        $this->call(PerfilSeeder::class);
        sleep(2);

        $this->call(TipoCapacidadeSeeder::class);
        sleep(2);

        $this->call(CapacidadeSeeder::class);
        sleep(2);

        $this->call(NomenclaturaSeeder::class);
        sleep(2);

        $this->call(TipoMotivoAfastamentoSeeder::class);
        sleep(2);

        $this->call(In24_2023Seeder::class);
        sleep(2);

        $this->call(TipoClientesSeeder::class);
        sleep(2);
    }
}

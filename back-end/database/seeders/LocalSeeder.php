<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LocalSeeder extends Seeder
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
            UnidadePrfSeeder::class,
            LotacaoSeeder::class,
            DemandaEntregaSeeder::class,
            UnidadeOrigemAtividadeSeeder::class

        ]);
    }
}

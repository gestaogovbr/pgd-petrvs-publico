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
        $this->call([
            TipoCapacidadeSeeder::class,
            // CapacidadeSeeder::class,
        ]);
    }
}

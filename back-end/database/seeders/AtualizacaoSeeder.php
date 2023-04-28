<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\TipoCapacidadeSeeder;

class AtualizacaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            TipoCapacidadeSeeder::class
        ]);
    }
}

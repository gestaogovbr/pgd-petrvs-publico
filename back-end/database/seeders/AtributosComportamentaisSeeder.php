<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AtributosComportamentaisSeeder extends Seeder
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
               AtributoComportamentalB5Seeder::class,
               AtributoComportamentalDASSSeeder::class,
               AtributoComportamentalSRQ20Seeder::class,
               AtributoComportamentalSoftSkillSeeder::class
           ]);
    }
}

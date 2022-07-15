<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
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
            EntidadeSeeder::class,
            FeriadoSeeder::class,
            PerfilSeeder::class,
            TipoCapacidadeSeeder::class,
            CapacidadeSeeder::class,
            UsuarioSeeder::class,
            TipoAvaliacaoSeeder::class,
            TipoJustificativaSeeder::class,
            TipoAvaliacaoJustificativaSeeder::class,
            UnidadePrfSeeder::class,

            //Após a execução das Seeds acima, executar a rotina de integração com o comando
            //http://localhost:8000/api/integracao?servidores=true&unidades=true&entidade=52d78c7d-e0c1-422b-b094-2ca5958d5ac1
            //ou sudo curl -G 'http://localhost/api/integracao' -d servidores=true -d unidades=true -d entidade=52d78c7d-e0c1-422b-b094-2ca5958d5ac1
        ]);
    }
}

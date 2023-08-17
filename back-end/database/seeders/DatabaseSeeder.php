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
            FeriadoSeeder::class,
            PerfilSeeder::class,
            TipoCapacidadeSeeder::class,
            EntidadeSeeder::class,
            UnidadePrfSeeder::class,
            UsuarioSeeder::class,
/*             TipoAvaliacaoSeeder::class,
            TipoJustificativaSeeder::class,
            TipoAvaliacaoJustificativaSeeder::class,
            AreaConhecimentoSeeder::class,
            TipoCursoSeeder::class,
            CursoSeeder::class,
            MateriaSeeder::class,
            CargoSeeder::class,
            FuncaoSeeder::class,
            CentroTreinamentoSeeder::class,
            GrupoEspecializadoSeeder::class, */
            

            /*Após a execução das Seeds acima, executar a rotina de integração com o comando
            http://localhost[:porta]/api/integracao?servidores=true&unidades=true&entidade=[ID da entidade]
            ou sudo curl -G 'http://localhost/api/integracao' -d servidores=true -d unidades=true -d entidade=[ID da entidade]
            */

        ]);
    }
}

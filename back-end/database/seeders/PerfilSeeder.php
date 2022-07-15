<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Perfil;
use App\Services\PerfilService;

class PerfilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $perfilService = new PerfilService();
        // carrega o arquivo perfis.csv para a tabela perfis no banco de dados
        $dadosPerfis = $perfilService->perfis;
        foreach($dadosPerfis as $linha)
        {
            $registro = $linha;
            $perfil = Perfil::where('id', $registro[0])->first() ?? new Perfil();
            $perfil->fill([
                'id' => $registro[0],
                'nivel' => $registro[1],
                'nome' => $registro[2],
                'descricao' => $registro[3]
            ]);
            $perfil->save();
        }
    }
}

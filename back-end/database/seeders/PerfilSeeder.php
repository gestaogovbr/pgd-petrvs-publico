<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Perfil;
use App\Models\Usuario;
use App\Services\PerfilService;
use App\Services\UtilService;

class PerfilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $perfilService = new PerfilService();
        $utilService = new UtilService();
        // carrega os vetores perfis e developers, existentes em PerfilService
        $developerId = ((config('petrvs') ?: [])['ids-fixos'] ?: [])['developer-id'] ?: $utilService->uuid("Desenvolvedor");
        $dadosPerfis = array_map(fn($perfil) => array_merge([$utilService->uuid($perfil[1])], $perfil), $perfilService->perfis);
        $developers = $perfilService->developers;
        foreach($dadosPerfis as $linha) {
            $registro = $linha;
            $perfil = Perfil::where('id', $registro[0])->first() ?? new Perfil();
            $perfil->fill([
                'id' => $registro[2] == 'Desenvolvedor' ? $developerId : $registro[0],
                'nivel' => $registro[1],
                'nome' => $registro[2],
                'descricao' => $registro[3]
            ]);
            $perfil->save();
            if($registro[2] == 'Desenvolvedor'){
                // atribui o perfil de DESENVOLVEDOR a todos os Devs
                Usuario::whereIn('cpf', array_map(fn($d) => $d[0], $developers))->update(['perfil_id' => $registro[0]]);
            }
        }
    }
}

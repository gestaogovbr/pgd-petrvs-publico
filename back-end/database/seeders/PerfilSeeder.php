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
  public function run()
  {
    $perfilService = new PerfilService();
    $utilService = new UtilService();
    // carrega os vetores perfis e developers, existentes em PerfilService
    $dadosPerfis = array_map(fn ($perfil) => array_merge([$utilService->uuid($perfil[1])], $perfil), $perfilService->perfis);
    $developers = $perfilService->developers;
    foreach ($dadosPerfis as $registro) {
      $perfil = Perfil::where('id', $registro[0])->first() ?? new Perfil();
      $perfil->fill([
        'id' => $registro[0],
        'nivel' => $registro[1],
        'nome' => $registro[2],
        'descricao' => $registro[3]
      ]);
      $perfil->save();
    }
    // atribui o perfil de DESENVOLVEDOR a todos os Devs
    Usuario::whereIn('cpf', array_map(fn ($d) => $d[0], $developers))->update(['perfil_id' => $utilService->uuid('Desenvolvedor')]);
  }
}

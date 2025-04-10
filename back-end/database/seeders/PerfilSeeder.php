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
    
    foreach ($perfilService->perfis as $registro) {
      $novoPerfil = [
        'id' => $utilService->uuid($registro[0]),
        'nivel' => $registro[0],
        'nome' => $registro[1],
        'descricao' => $registro[2]
      ];
      Perfil::firstOrCreate(['nivel' => $registro[0]], $novoPerfil);
      // Atualiza somente a coluna nome e descrição
      Perfil::where('nivel', $registro[0])->update(['nome' => $registro[1], 'descricao' => $registro[2]]);

    }
  }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Programa;
class AjusteTreinaSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $programas = Programa::all();
    foreach ($programas as $programa) {
      $programa->checklist_avaliacao_entregas_plano_entrega = [];
      $programa->checklist_avaliacao_entregas_plano_trabalho = [];
      $programa->plano_trabalho_criterios_avaliacao = [];
      $programa->save();
    }
  }
}

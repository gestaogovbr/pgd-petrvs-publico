<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoMotivoAfastamento;
use Database\Seeders\ZAfastamentoSeeder;
use DateTime;

class ZTipoMotivoAfastamentoSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $tipos_motivos_afastamentos = [
      'LIC. TRATAMENTO DE SAÚDE - EST',
      'VIAGEM A SERVIÇO NO PAÍS COM ÔNUS',
      'LIC. POR MOTIVO DE DOENÇA EM PESSOA DA FAMÍLIA - EST',
      'FÉRIAS'
    ];
    //$tipos_motivos_afastamentos = ZAfastamentoSeeder::tipos_motivos_afastamentos;
    foreach ($tipos_motivos_afastamentos as $tipo_motivo_afastamento) {
      $tipo_motivo = TipoMotivoAfastamento::where('nome', '=', $tipo_motivo_afastamento)->first();
      if (!$tipo_motivo) {
        $tipo_motivo = new TipoMotivoAfastamento();
        $tipo_motivo->fill([
          'nome' => $tipo_motivo_afastamento,
          'icone' => "fas fa-grin",
          'cor' => "#254983",
          'horas' => random_int(0, 1),
          'integracao' => random_int(0, 1),
          'data_inicio' => new DateTime()
        ]);
        $tipo_motivo->save();
      }
    }
  }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Afastamento;
use App\Models\TipoMotivoAfastamento;
use Ramsey\Uuid\Uuid;
use DateTime;
use Artisan;

class ZAfastamentoSeeder extends Seeder
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
    $usuarios = [
      '9465b95b-bc67-46a4-a2a5-4c81effdfb2d', 'c09bda44-247e-4d06-a250-a54166393254',
      'c79526f0-e673-492b-9aa2-af319cf9ec3d', '503192d6-4a47-4cc6-a556-176a892ebcd3'
    ];
    $tipos_motivos_afastamentos_id = TipoMotivoAfastamento::whereIn('nome', $tipos_motivos_afastamentos)->get()->map(function ($item) {
      return $item->id;
    })->toArray();
    if (count($tipos_motivos_afastamentos_id) != count($tipos_motivos_afastamentos)) {
      Artisan::call('db:seed --class=ZTipoMotivoAfastamentoSeeder');
      $tipos_motivos_afastamentos_id = TipoMotivoAfastamento::whereIn('nome', $tipos_motivos_afastamentos)->get()->map(function ($item) {
        return $item->id;
      })->toArray();
    }
    $dias_afastamento = [2, 5, 10, 20];
    $qde_registros = 10;

    // timestamp(01/01/2022) = strtotime('2022-01-01') = 1641006000
    // timestamp(30/10/2022) = strtotime('2022-10-30') = 1667098800
    for ($i = 0; $i < $qde_registros; $i++) {
      $ia = random_int(1641006000, 1667098800);
      $afastamento = new Afastamento();
      $afastamento->fill([
        'data_inicio' => new DateTime(date('Y-m-d H:i:s', $ia)),
        'data_fim' => new DateTime(date('Y-m-d H:i:s', $ia + $dias_afastamento[random_int(0, 3)] * 86400)),
        'usuario_id' => $usuarios[random_int(0, 3)],
        'tipo_motivo_afastamento_id' => $tipos_motivos_afastamentos_id[random_int(0, 3)],
      ]);
      $afastamento->save();
    };
  }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\TipoAvaliacaoJustificativa;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use DateTime;

class TipoAvaliacaoJustificativaSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $teste = [
      [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000001',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000001'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000001',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000002'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000001',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000003'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000001',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000004'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000001',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000005'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000002',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000001'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000002',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000002'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000002',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000003'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000002',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000004'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000002',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000005'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000003',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000001'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000003',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000002'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000003',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000003'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000003',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000004'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000003',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000005'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000004',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000001'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000004',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000002'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000004',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000003'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000004',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000004'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000004',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000005'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000005',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000001'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000005',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000002'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000005',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000003'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000005',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000004'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000005',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000005'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000006',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000013'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000006',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000014'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000006',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000015'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000006',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000016'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000007',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000013'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000007',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000014'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000007',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000015'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000007',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000016'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000008',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000013'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000008',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000014'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000008',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000015'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000008',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000016'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000009',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000013'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000009',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000014'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000009',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000015'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000009',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000016'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000010',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000006'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000010',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000007'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000010',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000008'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000010',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000009'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000010',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000010'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000010',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000011'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000010',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000012'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000011',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000006'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000011',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000007'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000011',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000008'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000011',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000009'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000011',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000010'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000011',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000011'
      ], [
        'tipo_avaliacao_id' =>       'aaaaaaaa-bbbb-cccc-dddd-000000000011',
        'tipo_justificativa_id' =>   'aaaaaaaa-bbbb-cccc-eeee-000000000012'
      ]
    ];

    foreach ($teste as $tipo) {
      $avalia = new TipoAvaliacaoJustificativa();
      $avalia->fill([
        'tipo_avaliacao_id' => $tipo['tipo_avaliacao_id'],
        'tipo_justificativa_id' => $tipo['tipo_justificativa_id'],
      ]);
      $avalia->save();
    };
  }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoMotivoAfastamento;
use Illuminate\Support\Str;
use App\Services\UtilService;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Facades\Log;
use App\Services\ServiceBase;
use Carbon\Carbon;

class TipoMotivoAfastamentoSeeder extends Seeder
{

  public $utilService;

  /**
   * Run the database seeds.
   *
   * @return void
   */

   public function __construct(UtilService $utilService)
   {
     $this->utilService = $utilService;
   }

  public function run()
  {
    try {
      $rows = [
        ['tipo' => 'Desconto', 'horas' => 'Horas',  'nome' => 'Afastamento para ações de desenvolvimento'],
        ['tipo' => 'Desconto', 'horas' => 'Horas',  'nome' => 'Comparecimento para fins de saúde (não se aplica para teletrabalho integral)'],
        ['tipo' => 'Desconto', 'horas' => 'Dias',   'nome' => 'Doação de sangue'],
        ['tipo' => 'Desconto', 'horas' => 'Dias',   'nome' => 'Feriado municipal/distrital/estadual'],
        ['tipo' => 'Desconto', 'horas' => 'Dias',   'nome' => 'Férias'],
        ['tipo' => 'Desconto', 'horas' => 'Dias',   'nome' => 'Greve (participação)'],
        ['tipo' => 'Desconto', 'horas' => 'Dias',   'nome' => 'Licença capacitação'],
        ['tipo' => 'Desconto', 'horas' => 'Dias',   'nome' => 'Licença gala (casamento) '],
        ['tipo' => 'Desconto', 'horas' => 'Dias',   'nome' => 'Licença gestante/maternidade/paternidade/adotante '],
        ['tipo' => 'Desconto', 'horas' => 'Dias',   'nome' => 'Licença nojo (falecimento de pessoa da família)'],
        ['tipo' => 'Desconto', 'horas' => 'Dias',   'nome' => 'Recesso (usufruto)'],
        ['tipo' => 'Desconto', 'horas' => 'Horas',   'nome' => 'Redução de jornada sem redução salarial'],
        ['tipo' => 'Desconto', 'horas' => 'Dias',   'nome' => 'Tratamento de saúde (participante, dependente ou familiar)'],
        ['tipo' => 'Desconto', 'horas' => 'Horas',   'nome' => 'Outras hipóteses (subtração de carga horária)'],
        ['tipo' => 'Acréscimo', 'horas' => 'Dias',  'nome' => 'Greve (compensação)'],
        ['tipo' => 'Acréscimo', 'horas' => 'Dias',  'nome' => 'Política de consequência do PGD (compensação)'],
        ['tipo' => 'Acréscimo', 'horas' => 'Dias',   'nome' => 'Recesso (compensação)'],
        ['tipo' => 'Acréscimo', 'horas' => 'Horas',  'nome' => 'Outras hipóteses (compensação)']
      ];

      foreach ($rows as $row) {      
        $data = Carbon::now()->format(ServiceBase::ISO8601_FORMAT);
        $cod = TipoMotivoAfastamento::count() + 1;
        $sigla = preg_replace('/[^a-zA-Z0-9]/', '', $row['nome']);
        $sigla = substr($sigla, 0, 3) . $cod;
  
        TipoMotivoAfastamento::firstOrCreate(['nome' => $row['nome']], [
          "id" => UtilService::uuid($row['nome']),
          "data_inicio" => $data,
          "data_fim" =>  $data,
          "situacao" => "S",
          "codigo" => $cod,
          "sigla" => $sigla,
          "nome" => $row['nome'],
          "icone" => "bi bi-folder",
          "cor" => "#198754",
          "horas" => $row['horas'] == "Horas" ? true : false,
          "calculo" => $row['tipo'] == "Desconto" ? 'DECRESCIMO' : 'ACRESCIMO',
          "integracao" => true,
        ]);
      }
    } catch (\Exception $e) {
      echo ("Erro ao importar tipos de motivos de afastamentos: " . $e->getMessage(). "\n");
      Log::error("Erro ao importar tipos de motivos de afastamentos: " . $e->getMessage());
    }
  }
}
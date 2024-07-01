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
      #TipoMotivoAfastamento::whereNotNull('id')->delete();
      $file = public_path('tipos_motivos_afastamentos.xlsx');
      Excel::import(new ImportarMotivos($this->utilService), $file);
    } catch (\Exception $e) {
      echo ("Erro ao importar tipos de motivos de afastamentos: " . $e->getMessage(). "\n");
      Log::error("Erro ao importar tipos de motivos de afastamentos: " . $e->getMessage());
    }
  }
}

class ImportarMotivos implements ToCollection
{

  public function __construct(public UtilService $utilService)
   {
   }

  public function collection(Collection $rows)
  {

    // Pulando a primeira linha (cabeçalho)
    $rows = $rows->skip(1);

    foreach ($rows as $row) {      
      $data = Carbon::now()->format(ServiceBase::ISO8601_FORMAT);
      $cod = TipoMotivoAfastamento::count() + 1;
      $sigla = preg_replace('/[^a-zA-Z0-9]/', '', $row[2]);
      $sigla = substr($sigla, 0, 3) . $cod;

      TipoMotivoAfastamento::firstOrCreate(['nome' => $row[2]], [
        "id" => $this->utilService->uuid($row[2]),
        "data_inicio" => $data,
        "data_fim" =>  $data,
        "situacao" => "S",
        "codigo" => $cod,
        "sigla" => $sigla,
        "nome" => $row[2],
        "icone" => "bi bi-folder",
        "cor" => "#198754",
        "horas" => $row[1] == "Horas" ? true : false,
        "calculo" => $row[0] == "Desconto" ? 'DECRESCIMO' : 'ACRESCIMO',
        "integracao" => true,
      ]);
    }
  }
}

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
      $data_inicio = Carbon::createFromFormat('Y-m-d', '1899-12-30')->addDays($row[1])->format(ServiceBase::ISO8601_FORMAT);
      $data_fim = Carbon::createFromFormat('Y-m-d', '1899-12-30')->addDays($row[2])->format(ServiceBase::ISO8601_FORMAT);

      TipoMotivoAfastamento::firstOrCreate(['codigo' => $row[5]], [
        "id" => $this->utilService->uuid($row[0]),
        "data_inicio" => $data_inicio,
        "data_fim" =>  $data_fim,
        "situacao" => $row[3],
        "codigo" => $row[5],
        "sigla" => $row[6],
        "nome" => $row[7],
        "icone" => "bi bi-folder",
        "cor" => "#198754",
        "horas" => false,
        "integracao" => true,
      ]);
    }
  }
}

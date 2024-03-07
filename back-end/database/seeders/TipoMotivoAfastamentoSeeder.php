<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoMotivoAfastamento;
use Illuminate\Support\Str;
use App\Services\UtilService;

class TipoMotivoAfastamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Inserção em massa partindo do CSV
        $file = database_path('seeders/arquivos_csv/afastamentos.csv');
        $csv_reader = new BulkSeeder($file, ';');

        $timenow = now();

        $utilservice = New UtilService();

        foreach($csv_reader->csvToArray($bulk = 1000) as $data){
          // Preprocessamento do array
            foreach($data as $key => $entry){
                $data[$key]['id'] = Str::uuid();
                $data[$key]['nome'] = $data[$key]['afastamento'];
                $data[$key]['created_at'] = $timenow;
                $data[$key]['updated_at'] = $timenow;

                $data[$key]['data_inicio'] = $data[$key]['data_inicio'];
                $data[$key]['data_fim'] = $data[$key]['data_fim'];
                $data[$key]['icone']= "bi bi-folder";
                $data[$key]['cor']= "#198754";
                unset($data[$key]["afastamento"]);
            }
            TipoMotivoAfastamento::insert($data);
        }
    }
}

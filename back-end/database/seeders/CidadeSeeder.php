<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\BulkSeeeder;
use App\Models\Cidade;
use App\Services\UtilService;

class CidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        $utilService = new UtilService();

        $file = database_path('seeders/arquivos_csv/cidades.csv');
        $csv_reader = new BulkSeeeder($file, ";");

        $timenow = now();

        foreach($csv_reader->csvToArray($bulk = 1000) as $data){
            // Preprocessamento do array
            foreach($data as $key => $entry){
                // Inserindo dados faltantes uma vez que método insert
                // insertOrIgnore não o faz.
                $data[$key]['id'] = $utilService->uuid($data[$key]['codigo_ibge']);
                $data[$key]['nome'] = mb_convert_encoding($data[$key]['nome'],
                    "UTF-8",
                    "ISO-8859-1"
                );
                $data[$key]['created_at'] = $timenow;
                $data[$key]['updated_at'] = $timenow;
            }
            Cidade::upsert($data, "id");
            }
     }
}

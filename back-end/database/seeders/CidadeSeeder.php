<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\BulkSeeeder;
use App\Models\Cidade;

class CidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $file = database_path('seeders/arquivos_csv/cidades.csv');
        $csv_reader = new BulkSeeeder($file, ";");
    
        $timenow = now();
    
        foreach($csv_reader->csvToArray() as $data){
            // Preprocessamento do array
            foreach($data as $key => $entry){
                // Inserindo dados faltantes uma vez que método insert
                // insertOrIgnore não o faz. 
                $data[$key]['created_at'] = $timenow;
                $data[$key]['updated_at'] = $timenow;
            }
            Cidade::insertOrIgnore($data);
        }

        // Explicação e fonte:
        // https://medium.com/emanuelg-blog/programa%C3%A7%C3%A3o-orientada-
        // a-objetos-em-php-o-m%C3%A9todo-construtor-597b83a7d3da

        /* 
        Modelo inicial de seeder
        
        // carrega o arquivo CIDADES.CSV para a tabela CIDADES no banco de dados
        $csv = array_map('str_getcsv', file('database/seeders/arquivos_csv/cidades.csv'));
        array_shift($csv); // exclui a primeira linha do arquivo (os cabeçalhos)
        foreach($csv as $linha)
        {
            $registro = str_getcsv($linha[0], ';');
            $cidade = new Cidade();
            $cidade->fill([
                'codigo_ibge' => $registro[0],
                'uf' => $registro[1],
                'nome' => mb_convert_encoding($registro[2], "UTF-8", "ISO-8859-1"),
                'tipo' => $registro[3],
                'timezone' => $registro[4]
            ]);
            $cidade->save();
        }
        */
    }
}


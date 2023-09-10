<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cidade;
use Illuminate\Support\Str;

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
        $csv_reader = new readLargeCSV($file, ";");
    
        $cur_time = now();
    
        foreach($csv_reader->csvToArray() as $data){
            // Preprocessing of the array.
            foreach($data as $key => $entry){
                // Laravel doesn't add timestamps on its own when inserting in chunks.
                $data[$key]['id'] = (string) Str::uuid(); 
                $data[$key]['created_at'] = $cur_time;
                $data[$key]['updated_at'] = $cur_time;
            }
            Cidade::insertOrIgnore($data);

        }

        /* Modelo inicial de seeder
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

// Explicação e fonte:
// https://medium.com/emanuelg-blog/programa%C3%A7%C3%A3o-orientada-a-objetos-em-php-o-m%C3%A9todo-construtor-597b83a7d3da

class readLargeCSV{

    private $file, $delimiter, $iterator, $header;

    public function __construct($filename, $delimiter = "\t"){
        $this->file = fopen($filename, 'r');
        $this->delimiter = $delimiter;
        $this->iterator = 0;
        $this->header = null;
    }

    public function csvToArray()
    {
        $data = array();
        while (($row = fgetcsv($this->file, 1000, $this->delimiter)) !== false)
        {
            $is_mul_1000 = false;
            if(!$this->header){
                $this->header = $row;
            }
            else{
                $this->iterator++;
                $data[] = array_combine($this->header, array_map("utf8_encode", $row));
                if($this->iterator != 0 && $this->iterator % 1000 == 0){
                    $is_mul_1000 = true;
                    $chunk = $data;
                    $data = array();
                    yield $chunk;
                }
            }
        }
        fclose($this->file);
        if(!$is_mul_1000){
            yield $data;
        }
        return;
    }
}
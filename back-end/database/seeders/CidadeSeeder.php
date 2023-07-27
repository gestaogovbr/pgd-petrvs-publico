<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
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
    }
}

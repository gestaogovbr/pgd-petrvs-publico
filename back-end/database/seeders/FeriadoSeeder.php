<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Feriado;

class FeriadoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // carrega o arquivo FERIADOS.CSV para a tabela FERIADOS no banco de dados
        $csv = array_map('str_getcsv', file('database/seeders/arquivos_csv/feriados.csv'));
        array_shift($csv); // exclui a primeira linha do arquivo (os cabeçalhos)
        foreach($csv as $linha)
        {
            $registro = str_getcsv($linha[0], ';');
            $feriado = new Feriado();
            $feriado->fill([
                'nome' => utf8_encode($registro[0]),
                'dia' => $registro[1],
                'mes' => $registro[2],
                'tipoDia' => $registro[3],
                'recorrente' => $registro[4],
                'abrangencia' => $registro[5]
            ]);
            $feriado->save();
        }
    }
}

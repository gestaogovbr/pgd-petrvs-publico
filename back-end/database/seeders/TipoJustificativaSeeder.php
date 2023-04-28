<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TipoJustificativa;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use DateTime;

class TipoJustificativaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teste = [
            [ "nome" => "Fora do prazo" ], 
            [ "nome" => "Fora do tema" ],
            [ "nome" => "Motivação técnica insuficiente" ],
            [ "nome" => "Abandono de atividade" ],
            [ "nome" => "Entrega incompreensível" ],
            [ "nome" => "Entregou antes do prazo" ],
            [ "nome" => "Superou os objetivos" ],
            [ "nome" => "Apresentou novas alternativas" ],
            [ "nome" => "Contribuiu para a unidade" ],
            [ "nome" => "Criou parâmetro a ser seguido" ],
            [ "nome" => "Superou os limites da sua função" ],
            [ "nome" => "Superou os objetivos" ],
            [ "nome" => "Buscou referência em outras áreas" ],
            [ "nome" => "Entregar dentro do prazo" ],
            [ "nome" => "Entregar dentro das expectativas" ],
            [ "nome" => "Superar a média da equipe" ],
            [ "nome" => "Superar a expectativa individual" ]
        ];

        $num = 1;
        foreach ($teste as $tipo) {
            $avalia = new TipoJustificativa();
            $avalia->fill([
                'nome' => $tipo['nome'],
            ]);
            //$avalia->save();
            $avalia->id = 'aaaaaaaa-bbbb-cccc-eeee-' . str_pad($num, 12, '0', STR_PAD_LEFT);
            $avalia->save();
            $num++;
        };
    }
}

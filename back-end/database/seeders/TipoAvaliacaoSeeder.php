<?php

namespace Database\Seeders;

use App\Models\TipoAvaliacao;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use DateTime;

class TipoAvaliacaoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teste = [
               [
                "nota_atribuida" => 0,
                "nome" => "Péssimo",
                "aceita_entrega" => 0,
                "pergunta" => "Por quê não aceitar a atividade?",
                "icone" => "far fa-tired",
                "cor" => "#E21621"
            ], [
                "nota_atribuida" => 1,
                "nome" => "Péssimo",
                "aceita_entrega" => 0,
                "pergunta" => "Por quê não aceitar a atividade?",
                "icone" => "far fa-angry",
                "cor" => "#E21621"
            ], [
                "nota_atribuida" => 2,
                "nome" => "Ruim",
                "aceita_entrega" => 0,
                "pergunta" => "Por quê não aceitar a atividade?",
                "icone" => "far fa-frown-open",
                "cor" => "#E21621"
            ], [
                "nota_atribuida" => 3,
                "nome" => "Ruim",
                "aceita_entrega" => 0,
                "pergunta" => "Por quê não aceitar a atividade?",
                "icone" => "far fa-sad-tear",
                "cor" => "#EA5827"
            ], [
                "nota_atribuida" => 4,
                "nome" => "Ruim",
                "aceita_entrega" => 0,
                "pergunta" => "Por quê não aceitar a atividade?",
                "icone" => "far fa-frown",
                "cor" => "#EA5827"
            ], [
                "nota_atribuida" => 5,
                "nome" => "Regular",
                "aceita_entrega" => 1,
                "pergunta" => "O que pode melhorar?",
                "icone" => "far fa-meh",
                "cor" => "#F7AA33"
            ], [
                "nota_atribuida" => 6,
                "nome" => "Bom",
                "aceita_entrega" => 1,
                "pergunta" => "O que pode melhorar?",
                "icone" => "far fa-smile",
                "cor" => "#F7AA33"
            ], [
                "nota_atribuida" => 7,
                "nome" => "Bom",
                "aceita_entrega" => 1,
                "pergunta" => "O que pode melhorar?",
                "icone" => "far fa-grin",
                "cor" => "#8DBF41"
            ], [
                "nota_atribuida" => 8,
                "nome" => "Bom",
                "aceita_entrega" => 1,
                "pergunta" => "O que pode melhorar?",
                "icone" => "far fa-smile-beam",
                "cor" => "#8DBF41"
            ], [
                "nota_atribuida" => 9,
                "nome" => "Excelente",
                "aceita_entrega" => 1,
                "pergunta" => "Do que você gostou?",
                "icone" => "far fa-laugh-beam",
                "cor" => "#4CB04E"
            ], [
                "nota_atribuida" => 10,
                "nome" => "Excelente",
                "aceita_entrega" => 1,
                "pergunta" => "Do que você gostou?",
                "icone" => "far fa-grin-stars",
                "cor" => "#4CB04E"
            ]
        ];

        $num = 1;
        foreach ($teste as $aval) {
            $avalia = new TipoAvaliacao();
            $avalia->fill([
                'nota_atribuida' => $aval['nota_atribuida'],
                'nome' => $aval['nome'],
                'aceita_entrega' => $aval['aceita_entrega'],
                'pergunta' => $aval['pergunta'],
                'icone' => $aval['icone'],
                'cor' => $aval['cor']
            ]);
            //$avalia->save();
            $avalia->id = 'aaaaaaaa-bbbb-cccc-dddd-' . str_pad($num, 12, '0', STR_PAD_LEFT);
            $avalia->save();
            $num++;
        };
    }
}

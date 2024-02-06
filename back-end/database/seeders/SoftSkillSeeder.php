<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Questionario;
use App\Models\QuestionarioPergunta;
use Ramsey\Uuid\Uuid;

class SoftSkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
        //$uuid = Uuid::uuid4();
        $questionario = new Questionario();
        $questionario->fill([
            'nome'=> 'Soft Skill',
            'codigo'=> 'SOFTSKILL',
            'tipo'=> 'INTERNO',
            'versao'=> 1
        ]);
        $questionario->save();

        $uuid = Questionario::where('codigo','SOFTSKILL')->first()?->id;
        //[{"key": "muito Inadequado", "data": {"_status": "ADD", "opcaoResposta": "muito Inadequado", "valorResposta": "1"}, "value": "muito Inadequado - 1"}, {"key": "Relativamente Inadequado", "data": {"_status": "ADD", "opcaoResposta": "Relativamente Inadequado", "valorResposta": "2"}, "value": "Relativamente Inadequado - 2"}, {"key": "Nem Adequado, Nem inadequado", "data": {"_status": "ADD", "opcaoResposta": "Nem Adequado, Nem inadequado", "valorResposta": "3"}, "value": "Nem Adequado, Nem inadequado - 3"}, {"key": "Relativamente Adequado", "data": {"_status": "ADD", "opcaoResposta": "Relativamente Adequado", "valorResposta": "4"}, "value": "Relativamente Adequado - 4"}, {"key": "Muito Adequado", "data": {"_status": "ADD", "opcaoResposta": "Muito Adequado", "valorResposta": "5"}, "value": "Muito Adequado - 5"}]
        $sequencia = 1;
        $perguntas =
            [
                ['sequencia' => $sequencia,'pergunta' => 'Comunicacao','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                /*['sequencia' => $sequencia,'pergunta' => 'Lideranca','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                ['sequencia' => $sequencia,'pergunta' => 'Resolucao de problemas','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                ['sequencia' => $sequencia,'pergunta' => 'Criatividade e curiosidade','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                ['sequencia' => $sequencia,'pergunta' => 'Pensamento critico','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                ['sequencia' => $sequencia,'pergunta' => 'Habilidades com pessoas e equipes','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                ['sequencia' => $sequencia,'pergunta' => 'Adaptabilidade e resiliencia','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                ['sequencia' => $sequencia,'pergunta' => 'Etica','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
               */

        //    ];
            //{"max": 100, "min": 1}
        // $resposta = [{min: 0 , max: 20}];

        // foreach($perguntas as $pergunta){
        //     $perguntaNovo = new QuestionarioPergunta();
        //     $perguntaNovo->fill([
        //         'sequencia'=> $sequencia,
        //         'pergunta'=> $pergunta['pergunta'],
        //         'tipo'=> $pergunta['tipo'],
        //         'criado_versao'=> $pergunta['criado_versao'],
        //         'deletado_versao'=> $pergunta['deletado_versao'],
        //         'respostas' => $resposta,
        //         'questionario_id'=> $uuid
        //     ]);
        //     $perguntaNovo->save();
        //     $sequencia++;
        // }
    }
}

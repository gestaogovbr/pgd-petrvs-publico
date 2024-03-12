<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Questionario;
use App\Models\QuestionarioPergunta;
use Ramsey\Uuid\Uuid;

class AtributoComportamentalDISCSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    //Analise as opções e enumere-as de 1 a 4. A opção com a qual você MAIS se identifica, insira o NÚMERO 4 na respectiva caixinha, e aquela com a qual você MENOS tem afinidade, assinale com um NÚMERO 1. Lembre-se que não podem ocorrer empates, logo um mesmo número não pode ser usado duas vezes na mesma questão. Seu resultado poderá estar entre 26 e 104.
    //$uuid = Uuid::uuid4();

    /*
        $questionario = new Questionario();
        $questionario->fill([
            'nome'=> 'Disc',
            'codigo'=> 'DISC',
            'tipo'=> 'INTERNO',
            'versao'=> 1
        ]);
        $questionario->save();

        $uuid = Questionario::where('codigo','DAS21')->first()?->id;
        //[{"key": "muito Inadequado", "data": {"_status": "ADD", "opcaoResposta": "muito Inadequado", "valorResposta": "1"}, "value": "muito Inadequado - 1"}, {"key": "Relativamente Inadequado", "data": {"_status": "ADD", "opcaoResposta": "Relativamente Inadequado", "valorResposta": "2"}, "value": "Relativamente Inadequado - 2"}, {"key": "Nem Adequado, Nem inadequado", "data": {"_status": "ADD", "opcaoResposta": "Nem Adequado, Nem inadequado", "valorResposta": "3"}, "value": "Nem Adequado, Nem inadequado - 3"}, {"key": "Relativamente Adequado", "data": {"_status": "ADD", "opcaoResposta": "Relativamente Adequado", "valorResposta": "4"}, "value": "Relativamente Adequado - 4"}, {"key": "Muito Adequado", "data": {"_status": "ADD", "opcaoResposta": "Muito Adequado", "valorResposta": "5"}, "value": "Muito Adequado - 5"}]
        $sequencia = 1;
        $perguntas =
            [
                ['sequencia' => $sequencia,'pergunta' => 'Em um restaurante estou esperando uma mesa e o garçom me diz que em 10 minutos terei uma mesa, porém passam 20 minutos:','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],


            ];

        $respostas =[
                        ["key" => "Me aborreço e digo ao garçom que já se passou o dobro do tempo, e lhe informo que se demorar muito irei embora e eles perderão um cliente.","data" => ["_status" => "ADD","opcaoResposta" => "Me aborreço e digo ao garçom que já se passou o dobro do tempo, e lhe informo que se demorar muito irei embora e eles perderão um cliente.","valorResposta" => "1"],"value" => "Me aborreço e digo ao garçom que já se passou o dobro do tempo, e lhe informo que se demorar muito irei embora e eles perderão um cliente. - 1"],
                        ["key" => "Não me dou conta pois estou envolvido em uma conversa.","data" => ["_status" => "ADD","opcaoResposta" => "Não me dou conta pois estou envolvido em uma conversa.","valorResposta" => "2"],"value" => "Não me dou conta pois estou envolvido em uma conversa. - 2"],
                        ["key" => "Não me fixo ao tempo, ainda que eu saiba do atraso, não falo nada.","data" => ["_status" => "ADD","opcaoResposta" => "Não me fixo ao tempo, ainda que eu saiba do atraso, não falo nada.","valorResposta" => "3"],"value" => "Não me fixo ao tempo, ainda que eu saiba do atraso, não falo nada. - 3"],
                        ["key" => "Informo ao Garçom exatamente a hora que cheguei e exatamente o tempo que passou e peço que por favor me diga com exatidão quanto tempo ainda falta para que eu possa tomar uma decisão.","data" => ["_status" => "ADD","opcaoResposta" => "Informo ao Garçom exatamente a hora que cheguei e exatamente o tempo que passou e peço que por favor me diga com exatidão quanto tempo ainda falta para que eu possa tomar uma decisão.","valorResposta" => "4"],"value" => "Informo ao Garçom exatamente a hora que cheguei e exatamente o tempo que passou e peço que por favor me diga com exatidão quanto tempo ainda falta para que eu possa tomar uma decisão. - 4"],
                    ];

        foreach($perguntas as $pergunta){
            $perguntaNovo = new QuestionarioPergunta();
            $perguntaNovo->fill([
                'sequencia'=> $sequencia,
                'pergunta'=> $pergunta['pergunta'],
                'tipo'=> $pergunta['tipo'],
                'criado_versao'=> $pergunta['criado_versao'],
                'deletado_versao'=> $pergunta['deletado_versao'],
                'respostas' => $respostas,
                'questionario_id'=> $uuid
            ]);
            $perguntaNovo->save();
            $sequencia++;
        }*/
  }
}

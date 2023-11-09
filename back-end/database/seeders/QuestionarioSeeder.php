<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Questionario;
//
class TipoCursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $perguntas =  [  
            ['tipo'=>'interno','nome'=>'Big Five','pergunta'=>{'key' : '9017a8b1aaf2662c2a547d9665ce67dd',
                                                                 'value':'Pergunta: Perg1 - Tipo de Resposta: Resposta Única - Opções da resposta: Muito Inadequado - Relativamente Inadequado - Nem Adequado, Nem Inadequado - Relativamente Adequado - Muito Adequado'  
                                                                 //{"key": "9017a8b1aaf2662c2a547d9665ce67b8",
                                                                 //"value": "Pergunta: perg1 - Tipo de Resposta: Resposta Única - Opção de Resposta: resp1 - Valor: 1 - resp2 - Valor: 2 - resp3 - Valor: 3",    
                                                                 //"data":{
                                                                        //"tipo": {"key": "UNICA", "value": "Resposta Única"}, 
                                                                        //"_status": "ADD", 
                                                                        //"pergunta": "perg1", 
                                                                        //"opcaoResposta": [{
                                                                                    //  "key": "a1866c1e61653fd2a77033750c72c90c", 
                                                                                    //  "data": {
                                                                                    //           "opcao": "resp1", 
                                                                                    //           "valor": "1", 
                                                                                    //           "_status": "ADD"}, 
                                                                                    //           "value": "resp1 - 1"
                                                                                    //          },{
                                                                                    //  "key": "bb1797702574859ad9bab93694ed779d", 
                                                                                    //  "data": {
                                                                                    //           "opcao": "resp2", 
                                                                                    //           "valor": "2", 
                                                                                    //           "_status": "ADD"}, "value": "resp2 - 2"}, {
                                                                                    //  "key": "6ae899e50b6df45e52866e3ac8c2ba65", "data": {"opcao": "resp3", "valor": "3", "_status": "ADD"}, "value": "resp3 - 3"}]} 
                                                                 {'data':{


                                                                         }
                                                                 }
                                                              }],
            
        ];
        foreach($perguntas as $p){
            $p = new Questionario();
            $p->fill([
                'tipo'=> $p['tipo'],
                'nome'=> $p['nome'],
                'pergunta'=> $p['pergunta'],
            ]);
            $p->save();
        }
    }
}

//[{"key": "9017a8b1aaf2662c2a547d9665ce67b8", "data": {"tipo": {"key": "UNICA", "value": "Resposta Única"}, "_status": "ADD", "pergunta": "perg1", "opcaoResposta": [{"key": "a1866c1e61653fd2a77033750c72c90c", "data": {"opcao": "resp1", "valor": "1", "_status": "ADD"}, "value": "resp1 - 1"}, {"key": "bb1797702574859ad9bab93694ed779d", "data": {"opcao": "resp2", "valor": "2", "_status": "ADD"}, "value": "resp2 - 2"}, {"key": "6ae899e50b6df45e52866e3ac8c2ba65", "data": {"opcao": "resp3", "valor": "3", "_status": "ADD"}, "value": "resp3 - 3"}]}, "value": "Pergunta: perg1 - Tipo de Resposta: Resposta Única - Opção de Resposta: resp1 - Valor: 1 - resp2 - Valor: 2 - resp3 - Valor: 3"}, {"key": "d771355108f23acf3e96f49ea8acbac5", "data": {"tipo": {"key": "SWITCH", "value": "Sim/Não"}, "_status": "ADD", "pergunta": {"valor": "", "pergunta": "perg2"}, "opcaoResposta": {"key": "UNICA", "value": "Resposta Única"}}, "value": "Pergunta: perg2 - Tipo de Resposta: Sim/Não - Opção de Resposta: Sim/Não"}, {"key": "1ad99ec6c90fe89b75cf8d0f21142831", "data": {"tipo": {"key": "LISTA", "value": "Lista"}, "_status": "ADD", "pergunta": "perg3", "opcaoResposta": [{"key": "db48915f17fcd2fe3d87a38998017980", "data": {"opcao": "list1", "valor": "1", "_status": "ADD"}, "value": "lis1 - 1"}, {"key": "659ed390abd2cdce422c7ba1f2514618", "data": {"opcao": "list2", "valor": "2", "_status": "ADD"}, "value": "list2 - 2"}, {"key": "9e637728a390d0514ce9a589ae94132e", "data": {"opcao": "list3", "valor": "3", "_status": "ADD"}, "value": "list3 - 3"}]}, "value": "Pergunta: perg3 - Tipo de Resposta: Lista - Opção de Resposta: list1 - Valor: 1 - list2 - Valor: 2 - list3 - Valor: 3"}]
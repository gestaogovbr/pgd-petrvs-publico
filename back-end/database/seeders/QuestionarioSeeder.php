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
                                                                 //"value": "Pergunta: Perg3 - Tipo de Resposta: Resposta Única - Opções da resposta: 1 - 2 - 3"   
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

//[{[{"key": "9017a8b1aaf2662c2a547d9665ce67b8", "data": {"tipo": {"key": "SWITCH", "value": "Sim/Não"}, "_status": "ADD", "pergunta": "Perg1", "opcaoResposta": "UNICA"}, "value": "Pergunta: Perg1 - Tipo de Resposta: Sim/Não - Opções da resposta: Sim/Não"}, {"key": "d771355108f23acf3e96f49ea8acbac5", "data": {"tipo": {"key": "LISTA", "value": "Lista"}, "_status": "ADD", "pergunta": "Perg2", "opcaoResposta": [{"key": "c4ca4238a0b923820dcc509a6f75849b", "data": {"_status": "ADD"}, "value": "1"}, {"key": "c81e728d9d4c2f636f067f89cc14862c", "data": {"_status": "ADD"}, "value": "2"}, {"key": "eccbc87e4b5ce2fe28308fd9f2a7baf3", "data": {"_status": "ADD"}, "value": "3"}]}, "value": "Pergunta: Perg2 - Tipo de Resposta: Lista - Opções da resposta: 1 - 2 - 3"}, {"key": "1ad99ec6c90fe89b75cf8d0f21142831", "data": {"tipo": {"key": "UNICA", "value": "Resposta Única"}, "_status": "ADD", "pergunta": "Perg3", "opcaoResposta": [{"key": "c4ca4238a0b923820dcc509a6f75849b", "data": {"_status": "ADD"}, "value": "1"}, {"key": "c81e728d9d4c2f636f067f89cc14862c", "data": {"_status": "ADD"}, "value": "2"}, {"key": "eccbc87e4b5ce2fe28308fd9f2a7baf3", "data": {"_status": "ADD"}, "value": "3"}]}, "value": "Pergunta: Perg3 - Tipo de Resposta: Resposta Única - Opções da resposta: 1 - 2 - 3"}]
    //"key": "9017a8b1aaf2662c2a547d9665ce67b8", 
//    "value": "Pergunta: Perg1 - Tipo de Resposta: Sim/Não - Opções da resposta: Sim/Não"
//    "data": {
 //             "tipo": {"key": "SWITCH", "value": "Sim/Não"}, 
//              "pergunta": "Perg1", 
//              "opcaoResposta": "UNICA"}, 
//              "value": "Pergunta: Perg1 - Tipo de Resposta: Sim/Não - Opções da resposta: Sim/Não"}
        //      "_status": "ADD", 
 
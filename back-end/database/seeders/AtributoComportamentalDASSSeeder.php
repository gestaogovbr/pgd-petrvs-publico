<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Questionario;
use App\Models\QuestionarioPergunta;
use Ramsey\Uuid\Uuid;

class AtributoComportamentalDASSSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //$uuid = Uuid::uuid4();
        $questionario = new Questionario();
        $questionario->fill([
            'nome'=> 'DASS - 21',
            'codigo'=> 'DAS21',
            'tipo'=> 'INTERNO',
            'versao'=> 1
        ]);
        $questionario->save();
        
        $uuid = Questionario::where('codigo','DAS21')->first()?->id;
        //[{"key": "muito Inadequado", "data": {"_status": "ADD", "opcaoResposta": "muito Inadequado", "valorResposta": "1"}, "value": "muito Inadequado - 1"}, {"key": "Relativamente Inadequado", "data": {"_status": "ADD", "opcaoResposta": "Relativamente Inadequado", "valorResposta": "2"}, "value": "Relativamente Inadequado - 2"}, {"key": "Nem Adequado, Nem inadequado", "data": {"_status": "ADD", "opcaoResposta": "Nem Adequado, Nem inadequado", "valorResposta": "3"}, "value": "Nem Adequado, Nem inadequado - 3"}, {"key": "Relativamente Adequado", "data": {"_status": "ADD", "opcaoResposta": "Relativamente Adequado", "valorResposta": "4"}, "value": "Relativamente Adequado - 4"}, {"key": "Muito Adequado", "data": {"_status": "ADD", "opcaoResposta": "Muito Adequado", "valorResposta": "5"}, "value": "Muito Adequado - 5"}]
        $sequencia = 1;
        $perguntas =   
            [
                ['sequencia' => $sequencia,'pergunta' => 'Achei difícil me acalmar.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Senti minha boca seca.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Não consegui vivenciar nenhum sentimento positivo.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                ['sequencia' => $sequencia,'pergunta' => 'Tive dificuldade em respirar em alguns momentos. (Ex. Respiração ofegante, falta de ar, sem ter feito nenhum esforço físico).','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Achei difícil ter iniciativa para fazer as coisas.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Tive a tendência de reagir de forma exagerada às situações.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Senti tremores (Ex. Nas mãos).','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Senti que estava sempre nervoso.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Preocupei-me com situações em que eu pudesse entrar em pânico e parecesse ridículo(a).','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Senti que não tinha nada a desejar.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Senti-me agitado.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Achei difícial relaxar.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Senti-me depressivo(a) e sem ânimo.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Fui intolerante com as coisas que me impediam de continuar o que eu estava fazendo.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Senti que ia entrar em pânico.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Não consegui me entusiasmar com nada.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Senti que não tinha valor como pessoa.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Senti que estava pouco emotivo(a)/sensível demais.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                ['sequencia' => $sequencia,'pergunta' => 'Sabia que meu coração estava alterado mesmo não tendo feito nenhum esforço físico (Ex. Aumento da frequência cardíaca, disritmia cardíaca).','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Senti medo sem motivo.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
                ['sequencia' => $sequencia,'pergunta' => 'Senti que a vida não tinha sentido.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],   
                
            ];
        
        $respostas =[
                        ["key" => "Não se aplicou de maneira alguma","data" => ["_status" => "ADD","opcaoResposta" => "Não se aplicou de maneira alguma.","valorResposta" => "0"],"value" => "Não se aplicou de maneira alguma. - 0"], 
                        ["key" => "Aplicou-se em algum grau, ou por pouco tempo","data" => ["_status" => "ADD","opcaoResposta" => "Aplicou-se em algum grau, ou por pouco tempo.","valorResposta" => "1"],"value" => "Aplicou-se em algum grau, ou por pouco tempo. - 1"], 
                        ["key" => "Aplicou-se em um grau considerável, ou por uma boa parte do tempo","data" => ["_status" => "ADD","opcaoResposta" => "Aplicou-se em um grau considerável, ou por uma boa parte do tempo.","valorResposta" => "2"],"value" => "Aplicou-se em um grau considerável, ou por uma boa parte do tempo. - 2"], 
                        ["key" => "Aplicou-se muito, ou na maioria do tempo","data" => ["_status" => "ADD","opcaoResposta" => "Aplicou-se muito, ou na maioria do tempo.","valorResposta" => "3"],"value" => "Aplicou-se muito, ou na maioria do tempo. - 3"], 
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
        }
    }
}


<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Questionario;
use App\Models\QuestionarioPergunta;
use Ramsey\Uuid\Uuid;

class AtributoComportamentalQVTSeeder extends Seeder
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
            'nome'=> 'Qualidade de Vida no Trabalho',
            'codigo'=> 'QVT',
            'tipo'=> 'INTERNO',
            'versao'=> 1
        ]);
        $questionario->save();
        
        $uuid = Questionario::where('codigo','QVT')->first()?->id;
        
        $sequencia = 1;

        $perguntaNovo = new QuestionarioPergunta();
        $perguntas =
        $respostas = [['']];   
        [
            ['sequencia' => $sequencia,'pergunta' => 'Você concorda em participar desta pesquisa, de forma anônima, cujos dados são coletados sem identificação dos respondentes, e serão analisados para subsidiar a formulação de ações de melhoria da Qualidade de Vida no Trabalho na PRF, e estudos da SEGES/MGI sobre o tema?','tipo' => 'SWICTH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid]
        ]
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

        $perguntaNovo = new QuestionarioPergunta();
        $perguntas =   
        [
            ['sequencia' => $sequencia,'pergunta' => 'Qual a sua idade?','tipo' => 'TEXT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
        ]
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

        $perguntaNovo = new QuestionarioPergunta();
        $perguntas =   
        [
            ['sequencia' => $sequencia,'pergunta' => 'Informe o seu sexo.','tipo' => 'TEXT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],    
        ]
        $respostas =[['']]
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

        $perguntaNovo = new QuestionarioPergunta();
        $perguntas =   
        [
            ['sequencia' => $sequencia,'pergunta' => 'O sexo assinalado por você na questão anterior guarda uma identificação adequada com a forma como você se vê, ou deseja ser visto, ou vista, pelos demais, nas suas relações afetivas e compromissos sociais? (Obs.: esta não é uma questão de resposta obrigatória).','tipo' => 'SWICTH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],    
        ]
        $respostas = null;

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


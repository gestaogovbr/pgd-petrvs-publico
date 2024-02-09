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

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Você concorda em participar desta pesquisa, de forma anônima, cujos dados são coletados sem identificação dos respondentes, e serão analisados para subsidiar a formulação de ações de melhoria da Qualidade de Vida no Trabalho na Instituição, e estudos da SEGES/MGI sobre o tema?','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Qual a sua idade?','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => 0,
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Informe o seu sexo.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'O sexo assinalado por você na questão anterior guarda uma identificação adequada com a forma como você se vê, ou deseja ser visto, ou vista, pelos demais, nas suas relações afetivas e compromissos sociais? (Obs.: esta não é uma questão de resposta obrigatória)','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Informe sua cor, ou raça, de forma livre, como você assim entender.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Qual é seu estado civil?','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Qual é o seu grau completo de escolaridade?','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Em que Unidade da Federação você está em exercício?','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Com relação a situação funcional, escolha a alternativa cabível?','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Você atua nesta instituição a quantos anos?','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Qual a sua lotação?','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Há pessoa(s) que necessita(m) de alguma forma de atenção especial que estão sob seus cuidados (exemplo: idosos sob seus cuidados, pessoas com deficiência, pessoas com doenças crônicas, pessoas com alguma necessidade especial, etc.)?','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Você possui crianças  crianças e/ou adolescentes sob seus cuidados?','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Informe o número de crianças e/ou adolescentes que estão sob seus cuidados.','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => 0,
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Você possui alguma condição inata ou adquirida que se manifesta através de algum tipo de deficiência? *O termo Pessoa com Deficiência foi definido pela Convenção das Nações Unidas sobre o Direito das Pessoas com Deficiência, sendo aprovado em 13 de dezembro de 2006 pela Assembleia Geral da ONU. Foi ratificado no Brasil, com equivalência de emenda constitucional, pelo Decreto Legislativo nº 186/2008 e promulgado pelo Decreto nº 6.949/2009.','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

        $perguntaNovo = new QuestionarioPergunta();
        $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $perguntas['pergunta'],
                    'tipo'=> $perguntas['tipo'],
                    'criado_versao'=> $perguntas['criado_versao'],
                    'deletado_versao'=> $perguntas['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
            ]);
        $perguntaNovo->save();
        $sequencia++;

        $perguntas =   
        [
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a minha remuneração.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com os benefícios que a instituição me oferece. (Por exemplo: plano de saúde, auxílios diversos, acesso a clubes, associações, escolas, creches, entre outros).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Comparando a minha remuneração, com a remuneração média de trabalhadores que possuem atribuições e/ou responsabilidades semelhantes às minhas, eu considero minha remuneração adequada.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com relação aos meios que a Instituição me oferece para realização do meu trabalho presencial (instalações físicas adequadas, mobiliário de escritório, equipamentos e internet).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com relação à minha carga de trabalho (quantidade de trabalho que me é atribuída).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a importância das tarefas que a mim são atribuídas no trabalho.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com o quanto minhas habilidades e competências são reconhecidas e utilizadas nas tarefas que a mim são atribuídas.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a relevância que o trabalho que eu executo tem para o restante da instituição (eu considero meu trabalho relevante para as outras áreas da instituição?).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com relação à autonomia a mim conferida para a execução de minhas tarefas.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a avaliação de desempenho que me é atribuída pela instituição, seja ela formal (resultante de norma escrita) ou informal (feedback da minha chefia imediata).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com as oportunidades de crescimento profissional que me são oferecidas.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) em relação aos incentivos e as oportunidades de capacitação que recebo da instituição.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a valorização de minhas ideias e das minhas iniciativas no meu ambiente de trabalho.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com meu relacionamento com os meus colegas no trabalho.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com meu relacionamento com a minha chefia imediata.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'A comunicação com a minha chefia imediata é clara, transparente, regular e eficaz.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com o respeito às leis, regras, normas, rotinas e acordos, pactuados com meus colegas e com a minha chefia imediata, seja por meio de instrumentos formais ou informais, por normas escritas ou resultantes de acordos verbais.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com o respeito à minha individualidade no trabalho (as características que me definem enquanto indivíduo único, singular - personalidade, gênero, raça, religião, preferências etc.).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com minha liberdade de expressão no trabalho (oportunidade de expressar livremente as minhas opiniões, sem sofrer constrangimento).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com o tempo que o trabalho ocupa nas minhas preocupações diárias.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a influência do trabalho na minha rotina familiar.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a influência do trabalho nas minhas oportunidades de lazer e socialização fora do trabalho.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com os serviços prestados e com os produtos entregues pela Intituição aos seus clientes/parceiros externos (outras instituições e a sociedade em geral).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Na instituição, existem oportunidades para o(a) colaborador(a) discutir e influir no desenho dos processos de trabalho em que está envolvido(a).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
            ['sequencia' => $sequencia,'pergunta' => 'Eu sinto orgulho e satisfação em relação à imagem da instituição perante a sociedade.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ];
    
        $respostas =[
                    ["key" => "Concordo Totalmente","data" => ["_status" => "ADD","opcaoResposta" => "Concordo Totalmente","valorResposta" => "1"],"value" => "Concordo Totalmente - 1"], 
                    ["key" => "Concordo","data" => ["_status" => "ADD","opcaoResposta" => "Concordo","valorResposta" => "2"],"value" => "Concordo - 2"], 
                    ["key" => "Neutro","data" => ["_status" => "ADD","opcaoResposta" => "Neutro","valorResposta" => "3"],"value" => "Neutro - 3"], 
                    ["key" => "Discordo","data" => ["_status" => "ADD","opcaoResposta" => "Discordo","valorResposta" => "4"],"value" => "Discordo - 4"], 
                    ["key" => "Discordo Totalmente","data" => ["_status" => "ADD","opcaoResposta" => "Discordo Totalmente","valorResposta" => "5"],"value" => "Discordo Totalmente - 5"]
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

        $perguntas =   
            [
                ['sequencia' => $sequencia,'pergunta' => 'O etarismo é o preconceito contra pessoas por causa de sua idade. Esse preconceito afeta pessoas jovens, mas é muito mais comum ocorrer contra pessoas idosas, se manifestando de diversas maneiras, como por exemplo, na forma como desconsideramos a opinião ou duvidamos da capacidade de uma pessoa apenas por ela ser idosa. Você se sentiu vítima de etarismo?','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                ['sequencia' => $sequencia,'pergunta' => 'Nas organizações, assim como na sociedade em geral, os indivíduos podem se organizar em grupos. Nas organizações é comum a organização em carreiras. Os profissionais, em cada carreira, compartilham um sentimento de pertencimento e possuem estratégias comuns quanto a gestão da carreira, e ao seu posicionamento diante dos profissionais que não pertencem a mesma. Na Instituição, você percebe a existência de alguma forma de discriminação entre as diversas carreiras e/ou discriminação em função da atividade que o(a) colaborador(a) exerce?','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                ['sequencia' => $sequencia,'pergunta' => 'Você já sofreu assédio moral ou assédio sexual no ambiente de trabalho? Assédio moral é a conduta praticada no exercício profissional ou em razão dele, por meio da repetição deliberada de gestos, palavras faladas ou escritas ou comportamentos que exponham o  profissional que esteja prestando seus serviços a situações humilhantes e constrangedoras, capazes de lhes causar ofensa à personalidade, à dignidade e à integridade psíquica ou física, com o objetivo de excluí-los das suas funções ou de desestabilizá-los emocionalmente, deteriorando o ambiente profissional; (Lei nº 14.224, de 3 de julho de 2023).O assédio sexual é o ato de “constranger alguém, com o intuito de obter vantagem ou favorecimento sexual, prevalecendo-se o agente da sua condição de superior hierárquico ou ascendência inerentes ao exercício de emprego, cargo ou função - Lei nº 10.224, de 15 de maio de 2001','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
                ['sequencia' => $sequencia,'pergunta' => 'Você percebe alguma forma de discriminação (social, racial, religiosa, sexual, etc.) no seu ambiente de trabalho?','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
            ];

        foreach($perguntas as $pergunta){
                $perguntaNovo = new QuestionarioPergunta();
                $perguntaNovo->fill([
                    'sequencia'=> $sequencia,
                    'pergunta'=> $pergunta['pergunta'],
                    'tipo'=> $pergunta['tipo'],
                    'criado_versao'=> $pergunta['criado_versao'],
                    'deletado_versao'=> $pergunta['deletado_versao'],
                    'respostas' => '',
                    'questionario_id'=> $uuid
                ]);
                $perguntaNovo->save();
                $sequencia++;
            }

        $perguntas =   
            [
                ['sequencia' => $sequencia,'pergunta' => 'Qual forma(s) de discriminação você percebe? Você pode assinalar mais de uma opção.','tipo' => 'CHECK','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
            ];

        $respostas =[
                ["key" => "Social","data" => ["_status" => "ADD","opcaoResposta" => "Social","valorResposta" => "1"],"value" => "Social - 1"], 
                ["key" => "Racial","data" => ["_status" => "ADD","opcaoResposta" => "Racial","valorResposta" => "2"],"value" => "Racial - 2"], 
                ["key" => "Religiosa","data" => ["_status" => "ADD","opcaoResposta" => "Religiosa","valorResposta" => "3"],"value" => "Religiosa - 3"], 
                ["key" => "Sexual","data" => ["_status" => "ADD","opcaoResposta" => "Sexual","valorResposta" => "4"],"value" => "Sexual - 4"], 
                ["key" => "Política","data" => ["_status" => "ADD","opcaoResposta" => "Política","valorResposta" => "5"],"value" => "Política - 5"]
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

    $perguntas =   
        [
            ['sequencia' => $sequencia,'pergunta' => 'A discriminação que você percebe decorre:','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
        ];

    $respostas =[
            ["key" => "Das diferenças entre os salários percebidos pelos indivíduos. Quem ganha mais, vale mais.","data" => ["_status" => "ADD","opcaoResposta" => "Das diferenças entre os salários percebidos pelos indivíduos. Quem ganha mais, vale mais.","valorResposta" => "1"],"value" => "Das diferenças entre os salários percebidos pelos indivíduos. Quem ganha mais, vale mais. - 1"], 
            ["key" => "Do fato de que algumas carreiras possuem mais prestígio do que outras diante da alta direção da instituição.","data" => ["_status" => "ADD","opcaoResposta" => "Do fato de que algumas carreiras possuem mais prestígio do que outras diante da alta direção da instituição.","valorResposta" => "2"],"value" => "Do fato de que algumas carreiras possuem mais prestígio do que outras diante da alta direção da instituição. - 2"], 
            ["key" => "Da existência de uma estrutura hierárquica muito rígida, que pode permitir a existência   de um sentimento de superioridade intelectual entre os membros de algumas carreiras, ou entre os que exercem funções de liderança, em relação àqueles que não pertencem a esses grupos.","data" => ["_status" => "ADD","opcaoResposta" => "Da existência de uma estrutura hierárquica muito rígida, que pode permitir a existência   de um sentimento de superioridade intelectual entre os membros de algumas carreiras, ou entre os que exercem funções de liderança, em relação àqueles que não pertencem a esses grupos.","valorResposta" => "3"],"value" => "Da existência de uma estrutura hierárquica muito rígida, que pode permitir a existência   de um sentimento de superioridade intelectual entre os membros de algumas carreiras, ou entre os que exercem funções de liderança, em relação àqueles que não pertencem a esses grupos. - 3"], 
            ["key" => "Do fato de que algumas atividades são vistas como sendo compostas por tarefas de   baixa complexidade, que não exigem esforço do ponto de vista intelectual, nem exigem conhecimentos específicos – escolaridade – para serem executadas.","data" => ["_status" => "ADD","opcaoResposta" => "Do fato de que algumas atividades são vistas como sendo compostas por tarefas de   baixa complexidade, que não exigem esforço do ponto de vista intelectual, nem exigem conhecimentos específicos – escolaridade – para serem executadas.","valorResposta" => "4"],"value" => "Do fato de que algumas atividades são vistas como sendo compostas por tarefas de   baixa complexidade, que não exigem esforço do ponto de vista intelectual, nem exigem conhecimentos específicos – escolaridade – para serem executadas. - 4"], 
         
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

    $perguntas =   
    [
        ['sequencia' => $sequencia,'pergunta' => 'Achei difícil me acalmar.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Senti minha boca seca.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Não consegui vivenciar nenhum sentimento positivo.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
        ['sequencia' => $sequencia,'pergunta' => 'Tive dificuldade em respirar em alguns momentos. (Ex. Respiração ofegante, falta de ar, sem ter feito nenhum esforço físico).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Achei difícil ter iniciativa para fazer as coisas.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Tive a tendência de reagir de forma exagerada às situações.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Senti tremores (Ex. Nas mãos).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Senti que estava sempre nervoso.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Preocupei-me com situações em que eu pudesse entrar em pânico e parecesse ridículo(a).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Senti que não tinha nada a desejar.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Senti-me agitado.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Achei difícial relaxar.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Senti-me depressivo(a) e sem ânimo.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Fui intolerante com as coisas que me impediam de continuar o que eu estava fazendo.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Senti que ia entrar em pânico.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Não consegui me entusiasmar com nada.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Senti que não tinha valor como pessoa.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Senti que estava pouco emotivo(a)/sensível demais.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
        ['sequencia' => $sequencia,'pergunta' => 'Sabia que meu coração estava alterado mesmo não tendo feito nenhum esforço físico (Ex. Aumento da frequência cardíaca, disritmia cardíaca).','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Senti medo sem motivo.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia,'pergunta' => 'Senti que a vida não tinha sentido.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],   
        
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

    $perguntas =   
    [
        ['sequencia' => $sequencia,'pergunta' => 'Assinale uma das opções abaixo, em relação ao Programa de Gestão e Desempenho - PGD. OBS: Se você é terceirizado, marcar a 2ª opção abaixo: "Não participo ou não sou elegível para o Programa de Gestão e Desempenho - PGD.','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],

    ];

    $respostas =[
        ["key" => "Participo do Programa de Gestão e Desempenho - PGD","data" => ["_status" => "ADD","opcaoResposta" => "Participo do Programa de Gestão e Desempenho - PGD","valorResposta" => "1"],"value" => "Participo do Programa de Gestão e Desempenho - PGD - 1"], 
        ["key" => "Não participo, ou não sou elegível para o Programa de Gestão e Desempenho - PGD","data" => ["_status" => "ADD","opcaoResposta" => "Não participo, ou não sou elegível para o Programa de Gestão e Desempenho - PGD","valorResposta" => "2"],"value" => "Não participo, ou não sou elegível para o Programa de Gestão e Desempenho - PGD - 2"], 
        ["key" => "Não conheço o Programa de Gestão e Desempenho - PGD","data" => ["_status" => "ADD","opcaoResposta" => "Não conheço o Programa de Gestão e Desempenho - PGD","valorResposta" => "3"],"value" => "Não conheço o Programa de Gestão e Desempenho - PGD - 3"], 
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

    $perguntas =   
    [
        ['sequencia' => $sequencia,'pergunta' => 'Seu regime de PGD é:','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],

    ];

    $respostas =[
        ["key" => "Presencial","data" => ["_status" => "ADD","opcaoResposta" => "Presencial","valorResposta" => "1"],"value" => "Presencial - 1"], 
        ["key" => "Teletrabalho em regime de execução integral","data" => ["_status" => "ADD","opcaoResposta" => "Teletrabalho em regime de execução integral","valorResposta" => "2"],"value" => "Teletrabalho em regime de execução integral - 2"], 
        ["key" => "Teletrabalho em regime de execução parcial","data" => ["_status" => "ADD","opcaoResposta" => "Teletrabalho em regime de execução parcial","valorResposta" => "3"],"value" => "Teletrabalho em regime de execução parcial - 3"], 
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

    $perguntas =   
    [
        ['sequencia' => $sequencia, 'pergunta' => 'O teletrabalho melhorou a minha qualidade de vida no trabalho ','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'O teletrabalho me permitiu aumentar minha produtividade no trabalho','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia, 'pergunta' => 'O teletrabalho me permitiu melhorar a qualidade dos trabalhos que eu executo','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
        ['sequencia' => $sequencia, 'pergunta' => 'Estar em PGD permitiu a você melhorar a sua produtividade e a qualidade das suas entregas?','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid], 
      
    ];

    $respostas =[
                ["key" => "Concordo Totalmente","data" => ["_status" => "ADD","opcaoResposta" => "Concordo Totalmente","valorResposta" => "1"],"value" => "Concordo Totalmente - 1"], 
                ["key" => "Concordo","data" => ["_status" => "ADD","opcaoResposta" => "Concordo","valorResposta" => "2"],"value" => "Concordo - 2"], 
                ["key" => "Neutro","data" => ["_status" => "ADD","opcaoResposta" => "Neutro","valorResposta" => "3"],"value" => "Neutro - 3"], 
                ["key" => "Discordo","data" => ["_status" => "ADD","opcaoResposta" => "Discordo","valorResposta" => "4"],"value" => "Discordo - 4"], 
                ["key" => "Discordo Totalmente","data" => ["_status" => "ADD","opcaoResposta" => "Discordo Totalmente","valorResposta" => "5"],"value" => "Discordo Totalmente - 5"]
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

    $perguntas =   
    [
        ['sequencia' => $sequencia,'pergunta' => 'Você ocupa cargo de Chefia?','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid],

    ];

    $respostas =[
        ["key" => "Sim, e não gerencio colaboradores em PGD","data" => ["_status" => "ADD","opcaoResposta" => "Sim, e não gerencio colaboradores em PGD","valorResposta" => "1"],"value" => "Sim, e não gerencio colaboradores em PGD - 1"], 
        ["key" => "Sim, e gerencio colaboradores em PGD","data" => ["_status" => "ADD","opcaoResposta" => "Sim, e gerencio colaboradores em PGD","valorResposta" => "2"],"value" => "Sim, e gerencio colaboradores em PGD - 2"], 
        ["key" => "Não ocupo cargo de chefia","data" => ["_status" => "ADD","opcaoResposta" => "Teletrabalho em regime de execução parcial","valorResposta" => "3"],"value" => "Teletrabalho em regime de execução parcial - 3"], 
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

    $perguntas = ['sequencia' => $sequencia,'pergunta' => 'Os colaboradores em PGD, sob a sua supervisão, apresentam uma melhora na produtividade e na qualidade das entregas que eles realizam? ','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid];

    $perguntaNovo = new QuestionarioPergunta();
    $perguntaNovo->fill([
        'sequencia'=> $sequencia,
        'pergunta'=> $perguntas['pergunta'],
        'tipo'=> $perguntas['tipo'],
        'criado_versao'=> $perguntas['criado_versao'],
        'deletado_versao'=> $perguntas['deletado_versao'],
        'respostas' => '',
        'questionario_id'=> $uuid
    ]);
    $perguntaNovo->save();

    }

}


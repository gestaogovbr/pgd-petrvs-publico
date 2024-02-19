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

        $respostasSimNao = [
            ["key" => "SIM", "value" => "Sim"], 
            ["key" => "NAO", "value" => "Não"]
        ];

        $respostasNumber = [null];

        $respostasID = [null];

        $respostasSexo = [
            ["key" => "MASCULINO", "value" => "Masculino"], 
            ["key" => "FEMININO", "value" => "Feminino"]
        ];

        $respostasCorRaca = [
            ["key" => "BRANCA", "value" => "Branca"],
            ["key" => "PRETA", "value" => "Preta"],
            ["key" => "PARDA", "value" => "Parda"],
            ["key" => "INDIGENA", "value" => "Indigena"],
            ["key" => "AMARELA", "value" => "Amarela"],
        ];

        $respostasEstadoCivil = [            
            ["key" => 'CASADO', "value" => 'Casado'],
            ["key" => 'DIVORCIADO', "value" => 'Divorciado'],
            ["key" => 'SOLTEIRO', "value" => 'Solteiro'],
            ["key" => 'SEPARADO', "value" => 'Separado'],
            ["key" => 'VIUVO', "value" => 'Viúvo'],
            ["key" => 'UNIAO', "value" => 'União Estável'], 
            ["key" => 'OUTRO', "value" => 'Outro'],
        ];

        $respostasEscolaridade =[
            ["key" => 'ESCOLARIDADE_FUNDAMENTAL', "value" => 'Ensino Fundamental'],
            ["key" => 'ESCOLARIDADE_MEDIO', "value" => 'Ensino Médio'],
            ["key" => 'ESCOLARIDADE_SUPERIOR', "value" => 'Ensino Superior'],
            ["key" => 'ESCOLARIDADE_ESPECIAL', "value" => 'Especialização'],
            ["key" => 'ESCOLARIDADE_MESTRADO', "value" => 'Mestrado'],
            ["key" => 'ESCOLARIDADE_DOUTORADO', "value" => 'Doutorado'],
            ["key" => 'ESCOLARIDADE_POS_DOUTORADO', "value" => 'Pós Doutorado']
        ];

        $respostasDiscriminacao =[
            ["key" => "Social", "value" => "Social"], 
            ["key" => "Racial","value" => "Racial"], 
            ["key" => "Religiosa","value" => "Religiosa"], 
            ["key" => "Sexual","value" => "Sexual"], 
            ["key" => "Política","value" => "Política"]
        ];

        $respostasUF = [
            ["key" => "AC", "value" => "Acre"],
            ["key" => "AL", "value" => "Alagoas"],
            ["key" => "AP", "value" => "Amapá"],
            ["key" => "AM", "value" => "Amazonas"],
            ["key" => "BA", "value" => "Bahia"],
            ["key" => "CE", "value" => "Ceará"],
            ["key" => "DF", "value" => "Distrito Federal"],
            ["key" => "ES", "value" => "Espírito Santo"],
            ["key" => "GO", "value" => "Goiás"],
            ["key" => "MA", "value" => "Maranhão"],
            ["key" => "MT", "value" => "Mato Grosso"],
            ["key" => "MS", "value" => "Mato Grosso do Sul"],
            ["key" => "MG", "value" => "Minas Gerais"],
            ["key" => "PA", "value" => "Pará"],
            ["key" => "PB", "value" => "Paraíba"],
            ["key" => "PR", "value" => "Paraná"],
            ["key" => "PE", "value" => "Pernambuco"],
            ["key" => "PI", "value" => "Piauí"],
            ["key" => "RJ", "value" => "Rio de Janeiro"],
            ["key" => "RN", "value" => "Rio Grande do Norte"],
            ["key" => "RS", "value" => "Rio Grande do Sul"],
            ["key" => "RO", "value" => "Rondônia"],
            ["key" => "RR", "value" => "Roraima"],
            ["key" => "SC", "value" => "Santa Catarina"],
            ["key" => "SP", "value" => "São Paulo"],
            ["key" => "SE", "value" => "Sergipe"],
            ["key" => "TO", "value" => "Tocantins"]
        ];

        $respostasSituacaoFuncional=[
            ["key" => 'CONCURSADO_E', "value" => 'Concursado Efetivo'],
            ["key" => 'CONCURSADO_T', "value" => 'Consursado Temporário'],
            ["key" => 'TERCEIRIZADO', "value" => 'Colaborador de empresa terceirizada'],
            ["key" => 'ESTAGIARIO', "value" => 'Estagiário']
        ];

        $respostasRichard = [
            ["key" => 1, "value" => "Concordo Totalmente"], 
            ["key" => 2, "value" => "Concordo"], 
            ["key" => 3, "value" => "Neutro"], 
            ["key" => 4, "value" => "Discordo"], 
            ["key" => 5, "value" => "Discordo Totalmente"]
        ];

        $respostasFormaDiscriminacao = [
            ["key" => "SOCIAL", "value" => "Social"], 
            ["key" => "RACIAL", "value" => "Racial"], 
            ["key" => "RELIGIOSA", "value" => "Religiosa"], 
            ["key" => "SEXUAL", "value" => "Sexual"], 
            ["key" => "POLITICA", "value" => "Política"]

        ];

        $respostasDicriminacaoDecorre =[
            ["key" => 1, "value" => "Das diferenças entre os salários percebidos pelos indivíduos. Quem ganha mais, vale mais."], 
            ["key" => 2, "value" => "Do fato de que algumas carreiras possuem mais prestígio do que outras diante da alta direção da instituição."], 
            ["key" => 3, "value" => "Da existência de uma estrutura hierárquica muito rígida, que pode permitir a existência   de um sentimento de superioridade intelectual entre os membros de algumas carreiras, ou entre os que exercem funções de liderança, em relação àqueles que não pertencem a esses grupos."], 
            ["key" => 4, "value" => "Do fato de que algumas atividades são vistas como sendo compostas por tarefas de   baixa complexidade, que não exigem esforço do ponto de vista intelectual, nem exigem conhecimentos específicos – escolaridade – para serem executadas."], 
        ];

        $respostasDass = [
            ["key" => 0, "value" => "Não se aplicou de maneira alguma."], 
            ["key" => 1, "value" => "Aplicou-se em algum grau, ou por pouco tempo."], 
            ["key" => 2, "value" => "Aplicou-se em um grau considerável, ou por uma boa parte do tempo."], 
            ["key" => 3, "value" => "Aplicou-se muito, ou na maioria do tempo."], 
        ];

        $respostasPGD = [
            ["key" => 1, "value" => "Participo do Programa de Gestão e Desempenho."], 
            ["key" => 2, "value" => "Não participo, ou não sou elegível para o Programa de Gestão e Desempenho."], 
            ["key" => 3, "value" => "Não conheço o Programa de Gestão e Desempenho."], 
        ];
        
        $respostasRegimePGD =[
            ["key" => 1,"value" => "Presencial."], 
            ["key" => 2,"value" => "Teletrabalho em regime de execução integral."], 
            ["key" => 3,"value" => "Teletrabalho em regime de execução parcial."], 
        ];

        $respostasCargoChefia = [
            ["key" => 1, "value" => "Sim, e não gerencio colaboradores em PGD."], 
            ["key" => 2, "value" => "Sim, e gerencio colaboradores em PGD."], 
            ["key" => 3, "value" => "Teletrabalho em regime de execução parcial."], 
        ];

        $perguntas = [
            ['sequencia' => $sequencia,'pergunta' => 'Você concorda em participar desta pesquisa, de forma anônima, cujos dados são coletados sem identificação dos respondentes, e serão analisados para subsidiar a formulação de ações de melhoria da Qualidade de Vida no Trabalho na Instituição, e estudos da SEGES/MGI sobre o tema?','codigo' => 'concorda','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSimNao],
            ['sequencia' => $sequencia,'pergunta' => 'Qual a sua idade?','codigo' => 'idade','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasNumber],
            ['sequencia' => $sequencia,'pergunta' => 'Informe o seu sexo.','codigo' => 'sexo','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSexo],
            ['sequencia' => $sequencia,'pergunta' => 'O sexo assinalado por você na questãoconcordaSexo anterior guarda uma identificação adequada com a forma como você se vê, ou deseja ser visto, ou vista, pelos demais, nas suas relações afetivas e compromissos sociais? (Obs.: esta não é uma questão de resposta obrigatória)','codigo' => 'concordaSexo','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSimNao],
            ['sequencia' => $sequencia,'pergunta' => 'Informe sua cor, ou raça, de forma livre, como você assim entender.','codigo' => 'raca','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasCorRaca],
            ['sequencia' => $sequencia,'pergunta' => 'Qual é seu estado civil?','codigo' => 'estadoCivil','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasEstadoCivil],
            ['sequencia' => $sequencia,'pergunta' => 'Qual é o seu grau completo de escolaridade?','codigo' => 'escolaridade','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasEscolaridade],
            ['sequencia' => $sequencia,'pergunta' => 'Em que Unidade da Federação você está em exercício?','codigo' => 'ufExercicio','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasUF],
            ['sequencia' => $sequencia,'pergunta' => 'Com relação a situação funcional, escolha a alternativa cabível?','codigo' => 'situacaoFuncional','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSituacaoFuncional],
            ['sequencia' => $sequencia,'pergunta' => 'Você atua nesta instituição a quantos anos?','codigo' => 'anosInstituicao','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasNumber],
            ['sequencia' => $sequencia,'pergunta' => 'Qual a sua lotação?','codigo' => 'unidade_id','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasID],
            ['sequencia' => $sequencia,'pergunta' => 'Há pessoa(s) que necessita(m) de alguma forma de atenção especial que estão sob seus cuidados (exemplo: idosos sob seus cuidados, pessoas com deficiência, pessoas com doenças crônicas, pessoas com alguma necessidade especial, etc.)?','codigo' => 'necessitaAtencao','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSimNao],
            ['sequencia' => $sequencia,'pergunta' => 'Você possui crianças  crianças e/ou adolescentes sob seus cuidados?','codigo' => 'cuidadoCrianca','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSimNao],
            ['sequencia' => $sequencia,'pergunta' => 'Informe o número de crianças e/ou adolescentes que estão sob seus cuidados.','codigo' => 'numeroCrianca','tipo' => 'NUMBER','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasNumber],
            ['sequencia' => $sequencia,'pergunta' => 'Você possui alguma condição inata ou adquirida que se manifesta através de algum tipo de deficiência? *O termo Pessoa com Deficiência foi definido pela Convenção das Nações Unidas sobre o Direito das Pessoas com Deficiência, sendo aprovado em 13 de dezembro de 2006 pela Assembleia Geral da ONU. Foi ratificado no Brasil, com equivalência de emenda constitucional, pelo Decreto Legislativo nº 186/2008 e promulgado pelo Decreto nº 6.949/2009.','codigo' => 'deficiencia','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSimNao],
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a minha remuneração.','codigo' => 'satisfeitoRemuneracao','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com os benefícios que a instituição me oferece. (Por exemplo: plano de saúde, auxílios diversos, acesso a clubes, associações, escolas, creches, entre outros).','codigo' => 'satisfeitoBeneficio','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Comparando a minha remuneração, com a remuneração média de trabalhadores que possuem atribuições e/ou responsabilidades semelhantes às minhas, eu considero minha remuneração adequada.','codigo' => 'comparaRemuneracao','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com relação aos meios que a Instituição me oferece para realização do meu trabalho presencial (instalações físicas adequadas, mobiliário de escritório, equipamentos e internet).','codigo' => 'satisfeitoMeios','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com relação à minha carga de trabalho (quantidade de trabalho que me é atribuída).','codigo' => 'satisfeitoCarga','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard],
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a importância das tarefas que a mim são atribuídas no trabalho.','codigo' => 'satisfeitoTarefas','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard],
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com o quanto minhas habilidades e competências são reconhecidas e utilizadas nas tarefas que a mim são atribuídas.','codigo' => 'satisfeitoHabilidades','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard],
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a relevância que o trabalho que eu executo tem para o restante da instituição (eu considero meu trabalho relevante para as outras áreas da instituição?).','codigo' => 'satisfeitoRelevancia','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard],
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com relação à autonomia a mim conferida para a execução de minhas tarefas.','codigo' => 'satisfeitoAutonomia','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a avaliação de desempenho que me é atribuída pela instituição, seja ela formal (resultante de norma escrita) ou informal (feedback da minha chefia imediata).','codigo' => 'satisfetoAvaliacao','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com as oportunidades de crescimento profissional que me são oferecidas.','codigo' => 'satisfeitoCrescimento','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) em relação aos incentivos e as oportunidades de capacitação que recebo da instituição.','codigo' => 'satisfeitoIncentivo','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a valorização de minhas ideias e das minhas iniciativas no meu ambiente de trabalho.','codigo' => 'satisfeitoiniciativas','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com meu relacionamento com os meus colegas no trabalho.','codigo' => 'satisfeitoColegas','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com meu relacionamento com a minha chefia imediata.','codigo' => 'satisfeitoChefia','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'A comunicação com a minha chefia imediata é clara, transparente, regular e eficaz.','codigo' => 'comunicacaoChefia','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com o respeito às leis, regras, normas, rotinas e acordos, pactuados com meus colegas e com a minha chefia imediata, seja por meio de instrumentos formais ou informais, por normas escritas ou resultantes de acordos verbais.','codigo' => 'satisfeitoLeis','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com o respeito à minha individualidade no trabalho (as características que me definem enquanto indivíduo único, singular - personalidade, gênero, raça, religião, preferências etc.).','codigo' => 'satisfeitoIndividualidade','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com minha liberdade de expressão no trabalho (oportunidade de expressar livremente as minhas opiniões, sem sofrer constrangimento).','codigo' => 'satisfeitoExpressao','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard],
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com o tempo que o trabalho ocupa nas minhas preocupações diárias.','codigo' => 'satisfeitoPreocupacao','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a influência do trabalho na minha rotina familiar.','codigo' => 'satisfeitoInfluencia','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com a influência do trabalho nas minhas oportunidades de lazer e socialização fora do trabalho.','codigo' => 'satisfeitoLazer','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estou satisfeito(a) com os serviços prestados e com os produtos entregues pela Intituição aos seus clientes/parceiros externos (outras instituições e a sociedade em geral).','codigo' => 'satisfeitoEntrega','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Na instituição, existem oportunidades para o(a) colaborador(a) discutir e influir no desenho dos processos de trabalho em que está envolvido(a).','codigo' => 'oportunidades','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Eu sinto orgulho e satisfação em relação à imagem da instituição perante a sociedade.','codigo' => 'orgulho','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'O etarismo é o preconceito contra pessoas por causa de sua idade. Esse preconceito afeta pessoas jovens, mas é muito mais comum ocorrer contra pessoas idosas, se manifestando de diversas maneiras, como por exemplo, na forma como desconsideramos a opinião ou duvidamos da capacidade de uma pessoa apenas por ela ser idosa. Você se sentiu vítima de etarismo?','codigo' => 'etarismo','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSimNao],
            ['sequencia' => $sequencia,'pergunta' => 'Nas organizações, assim como na sociedade em geral, os indivíduos podem se organizar em grupos. Nas organizações é comum a organização em carreiras. Os profissionais, em cada carreira, compartilham um sentimento de pertencimento e possuem estratégias comuns quanto a gestão da carreira, e ao seu posicionamento diante dos profissionais que não pertencem a mesma. Na Instituição, você percebe a existência de alguma forma de discriminação entre as diversas carreiras e/ou discriminação em função da atividade que o(a) colaborador(a) exerce?','codigo' => 'discriminacao','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSimNao],
            ['sequencia' => $sequencia,'pergunta' => 'Você já sofreu assédio moral ou assédio sexual no ambiente de trabalho? Assédio moral é a conduta praticada no exercício profissional ou em razão dele, por meio da repetição deliberada de gestos, palavras faladas ou escritas ou comportamentos que exponham o  profissional que esteja prestando seus serviços a situações humilhantes e constrangedoras, capazes de lhes causar ofensa à personalidade, à dignidade e à integridade psíquica ou física, com o objetivo de excluí-los das suas funções ou de desestabilizá-los emocionalmente, deteriorando o ambiente profissional; (Lei nº 14.224, de 3 de julho de 2023).O assédio sexual é o ato de “constranger alguém, com o intuito de obter vantagem ou favorecimento sexual, prevalecendo-se o agente da sua condição de superior hierárquico ou ascendência inerentes ao exercício de emprego, cargo ou função - Lei nº 10.224, de 15 de maio de 2001','codigo' => 'assedio','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSimNao],
            ['sequencia' => $sequencia,'pergunta' => 'Você percebe alguma forma de discriminação (social, racial, religiosa, sexual, etc.) no seu ambiente de trabalho?','codigo' => 'discriminacaoTrabalho','tipo' => 'SWITCH','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSimNao],
            ['sequencia' => $sequencia,'pergunta' => 'Qual forma(s) de discriminação você percebe? Você pode assinalar mais de uma opção.','codigo' => 'formasDiscriminacao','tipo' => 'CHECK','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasFormaDiscriminacao],
            ['sequencia' => $sequencia,'pergunta' => 'A discriminação que você percebe decorre:','codigo' => 'perecebeDiscriminacao','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDicriminacaoDecorre],
            ['sequencia' => $sequencia,'pergunta' => 'Achei difícil me acalmar.','codigo' => 'dass1','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Senti minha boca seca.','codigo' => 'dass2','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Não consegui vivenciar nenhum sentimento positivo.','codigo' => 'dass3','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass],
            ['sequencia' => $sequencia,'pergunta' => 'Tive dificuldade em respirar em alguns momentos. (Ex. Respiração ofegante, falta de ar, sem ter feito nenhum esforço físico).','codigo' => 'dass4','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Achei difícil ter iniciativa para fazer as coisas.','codigo' => 'dass5','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Tive a tendência de reagir de forma exagerada às situações.','codigo' => 'dass6','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Senti tremores (Ex. Nas mãos).','codigo' => 'dass7','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Senti que estava sempre nervoso.','codigo' => 'dass8','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Preocupei-me com situações em que eu pudesse entrar em pânico e parecesse ridículo(a).','codigo' => 'dass9','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Senti que não tinha nada a desejar.','codigo' => 'dass10','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Senti-me agitado.','codigo' => 'dass11','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Achei difícial relaxar.','codigo' => 'dass12','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Senti-me depressivo(a) e sem ânimo.','codigo' => 'dass13','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Fui intolerante com as coisas que me impediam de continuar o que eu estava fazendo.','codigo' => 'dass14','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Senti que ia entrar em pânico.','codigo' => 'dass15','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Não consegui me entusiasmar com nada.','codigo' => 'dass16','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Senti que não tinha valor como pessoa.','codigo' => 'dass17','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Senti que estava pouco emotivo(a)/sensível demais.','codigo' => 'dass18','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass],
            ['sequencia' => $sequencia,'pergunta' => 'Sabia que meu coração estava alterado mesmo não tendo feito nenhum esforço físico (Ex. Aumento da frequência cardíaca, disritmia cardíaca).','codigo' => 'dass19','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Senti medo sem motivo.','codigo' => 'dass20','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass], 
            ['sequencia' => $sequencia,'pergunta' => 'Senti que a vida não tinha sentido.','codigo' => 'dass21','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasDass],   
            ['sequencia' => $sequencia,'pergunta' => 'Assinale uma das opções abaixo, em relação ao Programa de Gestão e Desempenho - PGD. OBS: Se você é terceirizado, marcar a 2ª opção abaixo: "Não participo ou não sou elegível para o Programa de Gestão e Desempenho - PGD.','codigo' => 'participaPGD','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasPGD],
            ['sequencia' => $sequencia,'pergunta' => 'Seu regime de PGD é:','codigo' => 'regimePGD','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRegimePGD],
            ['sequencia' => $sequencia,'pergunta' => 'O teletrabalho melhorou a minha qualidade de vida no trabalho ','codigo' => 'qualidadeVidaPGD','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard],
            ['sequencia' => $sequencia,'pergunta' => 'O teletrabalho me permitiu aumentar minha produtividade no trabalho','codigo' => 'produtividadePGD','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'O teletrabalho me permitiu melhorar a qualidade dos trabalhos que eu executo','codigo' => 'qualidadeTrabalhoPGD','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasRichard], 
            ['sequencia' => $sequencia,'pergunta' => 'Estar em PGD permitiu a você melhorar a sua produtividade e a qualidade das suas entregas?','codigo' => 'entregaPGD','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSimNao], 
            ['sequencia' => $sequencia,'pergunta' => 'Você ocupa cargo de Chefia?','codigo' => 'chefia','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasCargoChefia],
            ['sequencia' => $sequencia,'pergunta' => 'Os colaboradores em PGD, sob a sua supervisão, apresentam uma melhora na produtividade e na qualidade das entregas que eles realizam? ','codigo' => 'colaboradoresPGD','tipo' => 'RADIO','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuid, 'respostas' => $respostasSimNao],
        
        ];

        foreach($perguntas as $pergunta){
            $perguntaNovo = new QuestionarioPergunta();
            $perguntaNovo->fill([
                'sequencia'=> $sequencia,
                'pergunta'=> $pergunta['pergunta'],
                'codigo' => $pergunta['codigo'],
                'tipo'=> $pergunta['tipo'],
                'criado_versao'=> $pergunta['criado_versao'],
                'deletado_versao'=> $pergunta['deletado_versao'],
                'respostas' => $pergunta['respostas'],
                'questionario_id'=> $uuid, 
            ]);
            $perguntaNovo->save();
            $sequencia++;

        }


    
    }
   

}


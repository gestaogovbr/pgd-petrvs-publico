<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Questionario;
use App\Models\QuestionarioPergunta;
use Ramsey\Uuid\Uuid;

class AtributoComportamentalB5Seeder extends Seeder
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
      'nome' => 'Big Five',
      'codigo' => 'B5',
      'tipo' => 'INTERNO',
      'versao' => 1
    ]);
    $questionario->save();

    $uuidB5 = Questionario::where('codigo', 'B5')->first()?->id;
    //[{"key": "muito Inadequado", "data": {"_status": "ADD", "opcaoResposta": "muito Inadequado", "valorResposta": "1"}, "value": "muito Inadequado - 1"}, {"key": "Relativamente Inadequado", "data": {"_status": "ADD", "opcaoResposta": "Relativamente Inadequado", "valorResposta": "2"}, "value": "Relativamente Inadequado - 2"}, {"key": "Nem Adequado, Nem inadequado", "data": {"_status": "ADD", "opcaoResposta": "Nem Adequado, Nem inadequado", "valorResposta": "3"}, "value": "Nem Adequado, Nem inadequado - 3"}, {"key": "Relativamente Adequado", "data": {"_status": "ADD", "opcaoResposta": "Relativamente Adequado", "valorResposta": "4"}, "value": "Relativamente Adequado - 4"}, {"key": "Muito Adequado", "data": {"_status": "ADD", "opcaoResposta": "Muito Adequado", "valorResposta": "5"}, "value": "Muito Adequado - 5"}]
    $sequencia = 1;
    $perguntasB5 =
      [
        ['sequencia' => $sequencia, 'pergunta' => 'Eu sou a alma da festa.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu sinto pouca preocupação pelos outros.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu estou sempre pronto(a).', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu me estresso facilmente.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu tenho um vocabulário rico.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu não falo muito.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu desejo saber mais sobre as pessoas.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu largo minhas coisas em qualquer lugar.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu me sinto descontraído(a), leve, solto(a) a maior parte do tempo.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu tenho dificuldade para entender ideias abstratas.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu me sinto confortável quando junto das pessoas.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu sou grosseiro(a) com as pessoas.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu presto atenção aos detalhes.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu me preocupo com as coisas.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu tenho uma imaginação viva.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu não costumo me expor muito.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu sou solidário(a) aos sentimentos dos outros.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu faço uma bagunça com as minhas coisas.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Raramente eu me sinto triste.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu não me interesso por idéias abstratas.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu inicio conversas.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu não tenho interesse pelos problemas dos outros.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu cumpro minhas tarefas imediatamente.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu me sinto facilmente incomodado(a).', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu tenho idéias excelentes.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu tenho pouco a dizer.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu tenho um coração mole.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Frequentemente eu me esqueço de devolver as coisas aos seus devidos lugares.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu me aborreço facilmente.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu não tenho uma boa imaginação.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu converso com várias pessoas em festas ou outras reuniões sociais.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu não estou realmente interessado(a) nos outros.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu gosto de ordem, de organização.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Meu humor muda frequentemente.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu entendo as coisas rapidamente.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu não gosto de chamar atenção para mim mesmo.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu dedico tempo aos outros.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu não cumpro com minhas obrigações, fujo dos meus deveres.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu tenho mudanças frequentes de humor.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu faço uso de palavras difíceis ou incomuns.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu não me importo de ser o centro das atenções.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu sou sensível as emoções das outras pessoas.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu sigo uma agenda, uma rotina de tarefas.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu me irrito facilmente.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu passo meu tempo refletindo sobre as coisas.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu fico quieto(a) quando perto de estranhos.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu faço as outras pessoas se sentirem à vontade.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu sou preciso no meu trabalho.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Frequentemente eu me sinto triste.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        ['sequencia' => $sequencia, 'pergunta' => 'Eu sou cheio(a) de idéias.', 'tipo' => 'SELECT', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuidB5],
        //['sequencia' => $sequencia,'pergunta' => 'rico.','tipo' => 'SELECT','criado_versao' => 1,'deletado_versao' => 0,'questionario_id' => $uuidB5],

      ];

    $respostas = [
      ["key" => "Muito Inadequado", "data" => ["_status" => "ADD", "opcaoResposta" => "Muito Inadequado", "valorResposta" => "1"], "value" => "Muito Inadequado - 1"],
      ["key" => "Relativamente Inadequado", "data" => ["_status" => "ADD", "opcaoResposta" => "Relativamente Inadequado", "valorResposta" => "2"], "value" => "Relativamente Inadequado - 2"],
      ["key" => "Nem Adequado, Nem Inadequado", "data" => ["_status" => "ADD", "opcaoResposta" => "Nem Adequado, Nem Inadequado", "valorResposta" => "3"], "value" => "Nem Adequado, Nem Inadequado - 3"],
      ["key" => "Relativamente Adequado", "data" => ["_status" => "ADD", "opcaoResposta" => "Relativamente Adequado", "valorResposta" => "4"], "value" => "Relativamente Adequado - 4"],
      ["key" => "Muito Adequado", "data" => ["_status" => "ADD", "opcaoResposta" => "Muito Adequado", "valorResposta" => "5"], "value" => "Muito Adequado - 5"]
    ];

    foreach ($perguntasB5 as $perguntaB5) {
      $perguntaNovo = new QuestionarioPergunta();
      $perguntaNovo->fill([
        'sequencia' => $sequencia,
        'pergunta' => $perguntaB5['pergunta'],
        'tipo' => $perguntaB5['tipo'],
        'criado_versao' => $perguntaB5['criado_versao'],
        'deletado_versao' => $perguntaB5['deletado_versao'],
        'respostas' => $respostas,
        'questionario_id' => $uuidB5
      ]);
      $perguntaNovo->save();
      $sequencia++;
    }
  }
}

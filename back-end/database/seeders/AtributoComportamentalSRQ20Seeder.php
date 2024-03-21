<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Questionario;
use App\Models\QuestionarioPergunta;

class AtributoComportamentalSRQ20Seeder extends Seeder
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
      'nome' => 'Self-Reporting Questionnaire-20',
      'codigo' => 'SRQ20',
      'tipo' => 'INTERNO',
      'versao' => 1
    ]);
    $questionario->save();

    $uuid = Questionario::where('codigo', 'SRQ20')->first()?->id;
    $sequencia = 1;
    $perguntas =
      [
        ['sequencia' => $sequencia, 'pergunta' => 'O(a) Sr(a). tem dores de cabeça com frequência?.', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'Tem falta de apetite?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'O(a) Sr(a). dorme mal?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'O(a) Sr(a). fica com medo com facilidade?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'Suas mãos tremem?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'O(a) Sr(a). se sente nervoso(a), tenso(a) ou preocupado(a)?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'Sua digestão não é boa, ou sofre de perturbação digestiva?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => '(a) Sr(a). não consegue pensar com clareza?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'Sente-se infeliz?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'O(a) Sr(a). chora mais que o comum?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'Acha difícil apreciar (gostar de) suas atividades diárias?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'Acha difícil tomar decisões?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'Seu trabalho diário é um sofrimento? Tormento? Tem dificuldade em fazer seu trabalho?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'O(a) Sr(a). não é capaz de ter um papel útil na vida?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'O(a) Sr(a). perdeu o interesse nas coisas?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'Acha que é uma pessoa que não vale nada?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'O pensamento de acabar com a sua vida já passou por sua cabeça?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'O(a) Sr(a). se sente cansado(a) todo o tempo?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'O(a) Sr(a). tem sensações desagradáveis no estômago?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],
        ['sequencia' => $sequencia, 'pergunta' => 'Fica cansado(a) com facilidade?', 'tipo' => 'SWITCH', 'criado_versao' => 1, 'deletado_versao' => 0, 'questionario_id' => $uuid],

      ];


    foreach ($perguntas as $pergunta) {
      $perguntaNovo = new QuestionarioPergunta();
      $perguntaNovo->fill([
        'sequencia' => $sequencia,
        'pergunta' => $pergunta['pergunta'],
        'tipo' => $pergunta['tipo'],
        'criado_versao' => $pergunta['criado_versao'],
        'deletado_versao' => $pergunta['deletado_versao'],
        'respostas_possiveis' => null,
        'questionario_id' => $uuid
      ]);
      $perguntaNovo->save();
      $sequencia++;
    }
  }
}

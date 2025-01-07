<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UnidadeIntegrante;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Models\Programa;
use App\Models\Unidade;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\Entrega;
use App\Models\PlanoTrabalho;
use App\Models\Template;
use App\Models\Planejamento;
use App\Models\CadeiaValor;

class CorrigeSuframaSeeder extends Seeder {
  public function run() {
    $unidade_antiga_id = '7e0708f0-276f-4a43-a667-a25f721e6d66';
    $unidade_nova_id = 'f0a369a7-d33d-4216-9dc8-a75c42cb961a';

    $programas = Programa::where("unidade_id", $unidade_antiga_id)->get();
    foreach ($programas as $programa) {
      $programa->unidade_id = $unidade_nova_id;
      $programa->save();
    }

    $planejamentos = Planejamento::where("unidade_id", $unidade_antiga_id)->get();
    foreach ($planejamentos as $planejamento) {
      $planejamento->unidade_id = $unidade_nova_id;
      $planejamento->save();
    }

    $cadeiasValor = CadeiaValor::where("unidade_id", $unidade_antiga_id)->get();
    foreach ($cadeiasValor as $cadeiaValor) {
      $cadeiaValor->unidade_id = $unidade_nova_id;
      $cadeiaValor->save();
    }

    $templates = Template::where("unidade_id", $unidade_antiga_id)->get();
    foreach ($templates as $template) {
      $template->unidade_id = $unidade_nova_id;
      $template->save();
    }

    $planosEntrega = PlanoEntrega::where("unidade_id", $unidade_antiga_id)->get();
    foreach ($planosEntrega as $planoEntrega) {
      $planoEntrega->unidade_id = $unidade_nova_id;
      $planoEntrega->save();

      $entregas = $planoEntrega->entregas;
      foreach ($entregas as $entrega) {
        $entrega->unidade_id = $unidade_nova_id;
        $entrega->save();
      }
    }

    $planosTrabalho = PlanoTrabalho::where("unidade_id", $unidade_antiga_id)->get();
    foreach ($planosTrabalho as $planoTrabalho) {
      $planoTrabalho->unidade_id = $unidade_nova_id;
      $planoTrabalho->save();

      $atividades = $planoTrabalho->atividades;
      foreach ($atividades as $atividade) {
        $atividade->unidade_id = $unidade_nova_id;
        $atividade->save();
      }
    }

    $unidadeIntegrantes = UnidadeIntegrante::where("unidade_id", $unidade_antiga_id)->get();
    foreach ($unidadeIntegrantes as $unidadeIntegrante) {
      $unidadeIntegrante->unidade_id = $unidade_nova_id;
      $unidadeIntegrante->save();

      $unidadeIntegranteAtribuicoes = UnidadeIntegranteAtribuicao::where("unidade_integrante_id", $unidadeIntegrante->id)->get();
      // Verifica se o integrante já possui alguma atribuição, se não, cria a atribuição LOTADO
      if(empty($unidadeIntegranteAtribuicoes)) {
        $unidadeIntegranteAtribuicao = new UnidadeIntegranteAtribuicao();
        $unidadeIntegranteAtribuicao->unidade_integrante_id = $unidadeIntegrante->id;
        $unidadeIntegranteAtribuicao->atribuicao = 'LOTADO';
        $unidadeIntegranteAtribuicao->save();
      }
    }
  }
}
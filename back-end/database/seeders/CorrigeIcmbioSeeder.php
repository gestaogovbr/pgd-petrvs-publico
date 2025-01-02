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

class CorrigeIcmbioSeeder extends Seeder {
  public function run() {
    $unidade_antiga_id = "8b657155-e9ce-4375-860d-2d69192a13e6";
    $unidade_nova_id = "248ba147-2e80-4a12-bef3-31c45a81d6fd";

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
<?php

namespace App\Repository;

use App\Enums\StatusEnum;
use App\Models\Afastamento;
use App\Models\Atividade;
use App\Models\Ocorrencia;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalhoConsolidacao;
use Illuminate\Database\Eloquent\Collection;

class PlanoTrabalhoConsolidacaoRepository
{
  public function getConsolidacaoData($id): array
  {
    $consolidacao = $this->findConsolidacaoById($id);
    $concluido = in_array($consolidacao->status, [StatusEnum::CONCLUIDO->value, StatusEnum::AVALIADO->value]);
    $planosEntregasIds = array_map(fn($pe) => $pe->planoEntregaEntrega?->plano_entrega_id, $consolidacao->planoTrabalho->entregas?->all() ?? []);

    return [
      'programa' => $consolidacao->planoTrabalho?->programa,
      'planoTrabalho' => $consolidacao->planoTrabalho,
      'planosEntregas' => PlanoEntrega::whereIn("id", $planosEntregasIds)->get(),
      'atividades' => $this->getAtividades($consolidacao, $concluido),
      'afastamentos' => $this->getAfastamentos($consolidacao, $concluido),
      'ocorrencias' => $this->getOcorrencias($consolidacao, $concluido),
      'comparecimentos' => $consolidacao->comparecimentos ?? [],
      'status' => $consolidacao->status,
      'justificativa_conclusao' => $consolidacao->justificativa_conclusao,
    ];
  }

  public function findConsolidacaoById($id): PlanoTrabalhoConsolidacao | null
  {
    return PlanoTrabalhoConsolidacao::with([
      'comparecimentos.unidade:id,nome,sigla',
      'avaliacao',
      'avaliacoes',
      'planoTrabalho.programa',
      'planoTrabalho.unidade.gestor:id,usuario_id',
      'planoTrabalho.unidade.gestoresSubstitutos:id,usuario_id',
      'planoTrabalho.entregas.entrega',
      'planoTrabalho.entregas.reacoes',
      'planoTrabalho.entregas.planoEntregaEntrega:id,descricao,plano_entrega_id,entrega_id,meta,realizado,progresso_realizado',
      'planoTrabalho.entregas.planoEntregaEntrega.entrega:id,nome,tipo_indicador',
      'planoTrabalho.entregas.planoEntregaEntrega.objetivos.objetivo',
      'planoTrabalho.entregas.planoEntregaEntrega.processos.processo',
      'planoTrabalho.tipoModalidade'
    ])->find($id);
  }

  private function getAtividades($consolidacao, bool $concluido): Collection
  {
    $query = Atividade::with([
      'demandante',
      'usuario',
      'tipoAtividade',
      'pausas' => fn($q) => $q->withTrashed(),
      'tarefas' => fn($q) => $q->withTrashed(),
      'tarefas.tipoTarefa:id,nome',
      'comentarios' => fn($q) => $q->withTrashed(),
      'comentarios.usuario:id,nome,apelido',
      'reacoes.usuario:id,nome,apelido'
    ]);

    return $concluido
      ? $query->withTrashed()->whereHas('consolidacoes', fn($q) =>
      $q->where('plano_trabalho_consolidacao_id', $consolidacao->id)
        ->where('data_conclusao', $consolidacao->data_conclusao))->get()
      : $query->where('data_estipulada_entrega', '>=', $consolidacao->data_inicio)
      ->where('data_distribuicao', '<=', $consolidacao->data_fim)
      ->where('usuario_id', $consolidacao->planoTrabalho->usuario_id)->get();
  }

  private function getAfastamentos($consolidacao, bool $concluido): Collection
  {
    $query = Afastamento::with(['tipoMotivoAfastamento']);

    return $concluido
      ? $query->withTrashed()->whereHas('consolidacoes', fn($q) =>
      $q->where('plano_trabalho_consolidacao_id', $consolidacao->id)
        ->where('data_conclusao', $consolidacao->data_conclusao))->get()
      : $query->where("data_fim", ">=", $consolidacao->data_inicio)
      ->where('data_inicio', '<=', $consolidacao->data_fim)
      ->where('usuario_id', $consolidacao->planoTrabalho->usuario_id)->get();
  }

  private function getOcorrencias($consolidacao, bool $concluido): Collection
  {
    $query = Ocorrencia::with(['usuario']);

    return $concluido
      ? $query->withTrashed()->whereHas('consolidacoes', fn($q) =>
      $q->where('plano_trabalho_consolidacao_id', $consolidacao->id)
        ->where('data_conclusao', $consolidacao->data_conclusao))->get()
      : $query->where("data_fim", ">=", $consolidacao->data_inicio)
      ->where('data_inicio', '<=', $consolidacao->data_fim)
      ->where('usuario_id', $consolidacao->planoTrabalho->usuario_id)
      ->where(fn($q) => $q->whereNull('plano_trabalho_id')
        ->orWhere('plano_trabalho_id', '=', $consolidacao->planoTrabalho->id))->get();
  }
}

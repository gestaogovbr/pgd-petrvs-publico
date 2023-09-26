<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\PlanoEntrega;
use App\Models\Afastamento;
use App\Services\ServiceBase;
use App\Models\Atividade;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;
use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Throwable;

class PlanoTrabalhoConsolidacaoService extends ServiceBase
{
  /** 
   * Retorna dados de atividades, atividades da consolidacao, ocorrencias, afastamentos e entregas do plano
   * 
   * @param   string  $id       O ID da Consolidação do Plano de Trabalho.
   * @return  array
   */
  public function consolidacaoDados($id): array
  {
    $consolidacao = PlanoTrabalhoConsolidacao::with([
      'ocorrencias', 
      'comparecimentos.unidade:id,nome,sigla',
      'avaliacao',
      'avaliacoes',
      'planoTrabalho.programa',
      'planoTrabalho.unidade.gestor:id,usuario_id',
      'planoTrabalho.unidade.gestorSubstituto:id,usuario_id',
      'planoTrabalho.entregas.entrega', 
      'planoTrabalho.entregas.planoEntregaEntrega:id,descricao,plano_entrega_id,entrega_id', 
      'planoTrabalho.entregas.planoEntregaEntrega.entrega:id,nome,tipo_indicador', 
      'planoTrabalho.tipoModalidade'
    ])->find($id);
    $concluido = in_array($consolidacao->status, ["CONCLUIDO", "AVALIADO"]);
    $planosEntregasIds = array_map(fn($pe) => $pe->planoEntregaEntrega?->plano_entrega_id, $consolidacao->planoTrabalho->entregas?->all() ?? []);
    $planoTrabalho = $consolidacao->planoTrabalho;
    $atividades = Atividade::with([
      'demandante', 
      'usuario', 
      'tipoAtividade', 
      'pausas' => fn($q) => $q->withTrashed(),
      'tarefas' => fn($q) => $q->withTrashed(),
      'tarefas.tipoTarefa:id,nome',
      'comentarios' => fn($q) => $q->withTrashed(),
      'comentarios.usuario:id,nome,apelido'
    ]);
    $afastamentos = Afastamento::with(['tipoMotivoAfastamento']);
    if($concluido) { /* Carrega atividades e afastamentos baseado no snapshot */
      $atividades = $atividades->withTrashed()->whereHas('consolidacoes', function (Builder $query) use ($consolidacao) {
        $query->where('plano_trabalho_consolidacao_id', $consolidacao->id)->where('data_conclusao', $consolidacao->data_conclusao);
      })->get();
      $afastamentos = $afastamentos->withTrashed()->whereHas('consolidacoes', function (Builder $query) use ($consolidacao) {
        $query->where('plano_trabalho_consolidacao_id', $consolidacao->id)->where('data_conclusao', $consolidacao->data_conclusao);
      })->get();
    } else {
      $atividades = $atividades->where('data_estipulada_entrega', '>=', $consolidacao->data_inicio)->
        where('data_distribuicao', '<=', $consolidacao->data_fim)->
        where('usuario_id', $planoTrabalho->usuario_id)->get();
      $afastamentos = $afastamentos->where("data_fim", ">=", $consolidacao->data_inicio)->
        where('data_inicio', '<=', $consolidacao->data_fim)->
        where('usuario_id', $planoTrabalho->usuario_id)->get();
    }
    $atividades = array_map(fn($atividade) => $this->buildAtividadeConsolidacao($atividade->toArray(), $consolidacao), $atividades->all());
    $atividades = array_map(fn($atividade) => array_merge($atividade, ["metadados" => $this->atividadeService->metadados($atividade)]), $atividades);
    $afastamentos = array_map(fn($afastamento) => $this->buildAfastamentoConsolidacao($afastamento->toArray(), $consolidacao), $afastamentos->all());
    return [
      'atividades' => $atividades,
      'programa' => $consolidacao->programa,
      'planoTrabalho' => $consolidacao->planoTrabalho,
      'planosEntregas' => PlanoEntrega::whereIn("id", $planosEntregasIds)->get(),
      'ocorrencias' => $consolidacao->ocorrencias ?? [],
      'comparecimentos' => $consolidacao->comparecimentos ?? [],
      'afastamentos' => $afastamentos,
      'status' => $consolidacao->status
    ];
  }


  /** 
   * Reconstroi o Afastameto para ter a aparência de quando a consolidação foi concluída
   * 
   * @param   array  $afastamento         Afastamento (Array) que se deseja atualizar
   * @param   Consolidacao  $consolidacao Consolidacao
   * @return  array
   */
  public function buildAfastamentoConsolidacao($afastamento, $consolidacao) {
    if(!empty($consolidacao->data_conclusao)) {
      $consolidacaoAfastameto = PlanoTrabalhoConsolidacaoAfastamento::where("plano_trabalho_consolidacao_id", $consolidacao->id)->
        where("data_conclusao", $consolidacao->data_conclusao)->
        where("afastamento_id", $afastamento["id"])->first();
      if(!empty($consolidacaoAfastameto)) {
        $snapshot = (object) $consolidacaoAfastameto->snapshot;
        $afastamento["data_inicio"] = $snapshot->data_inicio;
        $afastamento["data_fim"] = $snapshot->data_fim;
        $afastamento["deleted_at"] = $snapshot->deleted_at;
      }
    }
    return $afastamento;
  }

  /** 
   * Reconstroi a Atividade para ter a aparência de quando a consolidação foi concluída
   * 
   * @param   array  $atividade          Atividade (Array) que se deseja atualizar
   * @param   Consolidacao  $consolidacao Consolidacao
   * @return  array
   */
  public function buildAtividadeConsolidacao($atividade, $consolidacao) {
    if(!empty($consolidacao->data_conclusao)) {
      $consolidacaoAtividade = PlanoTrabalhoConsolidacaoAtividade::where("plano_trabalho_consolidacao_id", $consolidacao->id)->
        where("data_conclusao", $consolidacao->data_conclusao)->
        where("atividade_id", $atividade["id"])->first();
      if(!empty($consolidacaoAtividade)) {
        /* Campos que precisam serem atualizados pelo snapshot */
        $snapshot = (object) $consolidacaoAtividade->snapshot;
        $atividade["descricao"] = $snapshot->descricao;
        $atividade["tempo_planejado"] = $snapshot->tempo_planejado;
        $atividade["data_estipulada_entrega"] = $snapshot->data_estipulada_entrega;
        $atividade["data_entrega"] = $snapshot->data_entrega;
        $atividade["tempo_despendido"] = $snapshot->tempo_despendido;
        $atividade["data_arquivamento"] = $snapshot->data_arquivamento;
        $atividade["status"] = $snapshot->status;
        $atividade["etiquetas"] = $snapshot->etiquetas;
        $atividade["checklist"] = $snapshot->checklist;
        $atividade["prioridade"] = $snapshot->prioridade;
        $atividade["progresso"] = $snapshot->progresso;
        $atividade["deleted_at"] = $snapshot->deleted_at;
        /* Atualiza comentários */
        $comentarios = [];
        foreach($atividade["comentarios"] as $comentario) {
          if(UtilService::asTimestamp($comentario["created_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao) && 
            (empty($comentario["deleted_at"]) || UtilService::asTimestamp($comentario["deleted_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao))) {
            $comentarios[] = $comentario;
          }
        }
        $atividade["comentarios"] = $comentarios;
        /* Atualiza pausas */
        $pausas = [];
        foreach($atividade["pausas"] as $pausa) {
          if(UtilService::asTimestamp($pausa["created_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao) && 
            (empty($pausa["deleted_at"]) || UtilService::asTimestamp($pausa["deleted_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao))) {
            $pausas[] = $pausa;
          }
        }
        $atividade["pausas"] = $pausas;
        /* Atualiza tarefas */
        $tarefas = [];
        foreach($atividade["tarefas"] as $tarefa) {
          if(UtilService::asTimestamp($tarefa["created_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao) && 
            (empty($tarefa["deleted_at"]) || UtilService::asTimestamp($tarefa["deleted_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao))) {
            $tarefa["data_conclusao"] = !empty($tarefa["data_conclusao"]) && UtilService::asTimestamp($tarefa["data_conclusao"]) < UtilService::asTimestamp($consolidacao->data_conclusao) ? $consolidacao->data_conclusao : null;
            $tarefas[] = $tarefa;
          }
        }
        $atividade["tarefas"] = $tarefas;
      }
    }
    return $atividade;
  }

  /** 
   * Conclui o período de consolidacao
   * 
   * @param   string  $id       O ID da Consolidação do Plano de Trabalho.
   * @return  array
   */
  public function concluir($id): array
  {
    DB::beginTransaction();
    try {
      /* (RN_CSLD_11) Não pode concluir a consolidação antes que a anterior não esteja concluida, e não pode retornar status da consolidação se a posterior estiver a frente (em status); */
      $anterior = $this->anterior($id);
      if(!empty($anterior) && in_array($anterior->status, ["INCLUIDO"])) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Existe consolidação anterior ainda não concluída");
      $dados = $this->consolidacaoDados($id);
      $consolidacao = PlanoTrabalhoConsolidacao::find($id);
      if(empty($consolidacao)) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Consolidação não encontrada");
      if(!empty($consolidacao->data_conclusao)) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Consolidação já concluída");
      $dataConclusao = new DateTime();
      $consolidacao->data_conclusao = $dataConclusao;
      $consolidacao->save();
      /* Snapshot das atividades */
      foreach(array_map(fn($a) => $a["id"], $dados["atividades"] ?? []) as $atividadeId) {
        $atividade = Atividade::find($atividadeId);
        $consolidacaoAtividade = new PlanoTrabalhoConsolidacaoAtividade([
          "data_conclusao" => $dataConclusao,
          "snapshot" => $atividade->toArray(),
          "plano_trabalho_consolidacao_id" => $id,
          "atividade_id" => $atividade->id
        ]);
        $consolidacaoAtividade->save();
      }
      /* Snapshot dos afastamentos */
      foreach(array_map(fn($a) => $a["id"], $dados["afastamentos"] ?? []) as $afastamentoId) {
        $afastamento = Afastamento::find($afastamentoId);
        $consolidacaoAfastamento = new PlanoTrabalhoConsolidacaoAfastamento([
          "data_conclusao" => $dataConclusao,
          "snapshot" => $afastamento->toArray(),
          "plano_trabalho_consolidacao_id" => $id,
          "afastamento_id" => $afastamento->id
        ]);
        $consolidacaoAfastamento->save();
      }
      /* Atualiza o status */
      $this->status->atualizaStatus($consolidacao, 'CONCLUIDO', 'A consolidação foi concluída nesta data.');
      DB::commit();
      return $this->consolidacaoDados($id);
    } catch (Throwable $e) {
      DB::rollback();
      throw $e;
    }
  }

  /** 
   * Cancela a conclusão do período de consolidacao
   * 
   * @param   string  $id       O ID da Consolidação do Plano de Trabalho.
   * @return  array
   */
  public function cancelarConclusao($id): array
  {
    DB::beginTransaction();
    try {
      /* (RN_CSLD_11) Não pode concluir a consolidação antes que a anterior não esteja concluida, e não pode retornar status da consolidação se a posterior estiver a frente (em status); */
      $proximo = $this->proximo($id);
      if(!empty($proximo) && in_array($proximo->status, ["CONCLUIDO", "AVALIADO"])) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Existe consolidação posterior concluída");
      $consolidacao = PlanoTrabalhoConsolidacao::find($id);
      if(empty($consolidacao)) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Consolidação não encontrada");
      if(empty($consolidacao->data_conclusao)) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Consolidação não concluída");
      $consolidacao->data_conclusao = null;
      $consolidacao->save();
      PlanoTrabalhoConsolidacaoAtividade::where("plano_trabalho_consolidacao_id", $id)->delete();
      PlanoTrabalhoConsolidacaoAfastamento::where("plano_trabalho_consolidacao_id", $id)->delete();
      $this->status->atualizaStatus($consolidacao, 'INCLUIDO', 'Cancelado a conclusão nesta data.');
      DB::commit();
      return $this->consolidacaoDados($id);
    } catch (Throwable $e) {
      DB::rollback();
      throw $e;
    }
  }

  /** 
   * Consolidação imediatamente anterior a consolidação passada
   * 
   * @param   string  $id       O ID da Consolidação
   * @return  PlanoTrabalhoConsolidacao | null
   */
  public function anterior($consolidacaoId) {
    $consolidacao = PlanoTrabalhoConsolidacao::find($consolidacaoId);
    return PlanoTrabalhoConsolidacao::where("plano_trabalho_id", $consolidacao->plano_trabalho_id)->
      where("data_inicio", "<", $consolidacao->data_inicio)->orderBy("data_inicio", "DESC")->first();
  }

  /** 
   * Consolidação imediatamente posterior a consolidação passada
   * 
   * @param   string  $id       O ID da Consolidação
   * @return  PlanoTrabalhoConsolidacao | null
   */
  public function proximo($consolidacaoId) {
    $consolidacao = PlanoTrabalhoConsolidacao::find($consolidacaoId);
    return PlanoTrabalhoConsolidacao::where("plano_trabalho_id", $consolidacao->plano_trabalho_id)->
      where("data_fim", ">", $consolidacao->data_fim)->orderBy("data_fim", "ASC")->first();
  }

}
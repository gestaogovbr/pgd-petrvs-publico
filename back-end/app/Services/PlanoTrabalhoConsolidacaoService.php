<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\PlanoEntrega;
use App\Models\Afastamento;
use App\Services\ServiceBase;
use App\Models\Atividade;
use App\Models\Ocorrencia;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoAfastamento;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;
use App\Models\PlanoTrabalhoConsolidacaoOcorrencia;
use App\Models\Programa;
use App\Models\TipoAvaliacao;
use App\Models\Unidade;
use DateTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Throwable;

class PlanoTrabalhoConsolidacaoService extends ServiceBase
{

  public function proxyQuery($query, &$data)
  {
    $arquivados = $this->extractWhere($data, "incluir_arquivados");
    $subordinadas = $this->extractWhere($data, "unidades_subordinadas");
    $unidadeId = $this->extractWhere($data, "plano_trabalho.unidade.id");
    if (empty($arquivados) || !$arquivados[2]) $data["where"][] = ["planoTrabalho.data_arquivamento", "==", null];
    if (!empty($unidadeId)) {
      $unidade = Unidade::find($unidadeId[2]);
      if (!empty($subordinadas) && $subordinadas[2] && !empty($unidade)) {
        $data["where"][] = ["planoTrabalho.unidade.path", "like", "%/". $unidade->id ];
      } else {
        $data["where"][] = $unidadeId;
      }
    }
    return $data;
  }

  public function proxyExtra($rows, $data, $count) 
  {
    $result = [];
    if(in_array("avaliacao", $data["with"])) {
      $tiposAvaliacoesIds = array_unique(array_map(fn ($v) => ($v["avaliacao"] ?? ["tipo_avaliacao_id" => null])["tipo_avaliacao_id"], $rows->toArray()));
      $tiposAvaliacoes = TipoAvaliacao::with(["notas"])->whereIn("id", $tiposAvaliacoesIds)->get()->all();
      $result["tipos_avaliacoes"] = $tiposAvaliacoes;
    }
    if(in_array("planoTrabalho:id", $data["with"])) {
      $planosTrabalhosIds = array_unique(array_map(fn ($v) => $v["plano_trabalho_id"], $rows->toArray()));
      $planosTrabalhos = PlanoTrabalho::with([
        "unidade:id,sigla,nome,unidade_pai_id",
        "unidade.gestor:id,unidade_id,usuario_id",
        "unidade.gestoresSubstitutos:id,unidade_id,usuario_id",
        "unidade.gestoresDelegados:id,unidade_id,usuario_id",
        "unidade.unidadePai.gestor:id,unidade_id,usuario_id",
        "unidade.unidadePai.gestoresSubstitutos:id,unidade_id,usuario_id",
        "tipoModalidade:id,nome",
        "usuario:id,nome,apelido,url_foto,foto_perfil"
      ])->whereIn("id", $planosTrabalhosIds)->get()->all();      
      $programasIds = array_unique(array_map(fn ($v) => $v["programa_id"], $planosTrabalhos));
      $programas = Programa::with(["tipoAvaliacaoPlanoTrabalho.notas.justificativas"])->whereIn("id", $programasIds)->get()->all();
      $result["planos_trabalhos"] = $planosTrabalhos;
      $result["programas"] = $programas;
    }
    return count($result) > 0 ? $result : null;
  }

  /** 
   * Retorna dados de atividades, atividades da consolidacao, ocorrencias, afastamentos e entregas do plano
   * 
   * @param   string  $id       O ID da Consolidação do Plano de Trabalho.
   * @return  array
   */
  public function consolidacaoDados($id): array
  {
    $consolidacao = PlanoTrabalhoConsolidacao::with([
      //'ocorrencias', 
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
      'comentarios.usuario:id,nome,apelido',
      'reacoes.usuario:id,nome,apelido'
    ]);
    $afastamentos = Afastamento::with(['tipoMotivoAfastamento']);
    $ocorrencias = Ocorrencia::with(['usuario']);
    if($concluido) { /* Carrega atividades e afastamentos baseado no snapshot */
      $atividades = $atividades->withTrashed()->whereHas('consolidacoes', function (Builder $query) use ($consolidacao) {
        $query->where('plano_trabalho_consolidacao_id', $consolidacao->id)->where('data_conclusao', $consolidacao->data_conclusao);
      })->get();
      $afastamentos = $afastamentos->withTrashed()->whereHas('consolidacoes', function (Builder $query) use ($consolidacao) {
        $query->where('plano_trabalho_consolidacao_id', $consolidacao->id)->where('data_conclusao', $consolidacao->data_conclusao);
      })->get();
      $ocorrencias = $ocorrencias->withTrashed()->whereHas('consolidacoes', function (Builder $query) use ($consolidacao) {
        $query->where('plano_trabalho_consolidacao_id', $consolidacao->id)->where('data_conclusao', $consolidacao->data_conclusao);
      })->get();
    } else {
      $atividades = $atividades->where('data_estipulada_entrega', '>=', $consolidacao->data_inicio)->
        where('data_distribuicao', '<=', $consolidacao->data_fim)->
        where('usuario_id', $planoTrabalho->usuario_id)->get();
      $afastamentos = $afastamentos->where("data_fim", ">=", $consolidacao->data_inicio)->
        where('data_inicio', '<=', $consolidacao->data_fim)->
        where('usuario_id', $planoTrabalho->usuario_id)->get();
      /* RN_CSLD_15 - Será considerado apenas as ocorrências (que tenha intersecção do período da consolidação) cujo plano de trabalho seja o mesmo da consolidação ou caso o plano de trabalho esteja em branco. (ocorrência não vinculada a plano de trabalho) */
      $ocorrencias = $ocorrencias->where("data_fim", ">=", $consolidacao->data_inicio)->
        where('data_inicio', '<=', $consolidacao->data_fim)->
        where('usuario_id', $planoTrabalho->usuario_id)->
        where(function ($query) use ($planoTrabalho) { $query->whereNull('plano_trabalho_id')->orWhere('plano_trabalho_id', '=', $planoTrabalho->id); })->get();
    }
    $atividades = array_map(fn($atividade) => $this->buildAtividadeConsolidacao($atividade->toArray(), $consolidacao), $atividades->all());
    $atividades = array_map(fn($atividade) => array_merge($atividade, ["metadados" => $this->atividadeService->metadados($atividade)]), $atividades);
    $afastamentos = array_map(fn($afastamento) => $this->buildAfastamentoConsolidacao($afastamento->toArray(), $consolidacao), $afastamentos->all());
    $ocorrencias = array_map(fn($ocorrencia) => $this->buildOcorrenciaConsolidacao($ocorrencia->toArray(), $consolidacao), $ocorrencias->all());
    return [
      'programa' => $consolidacao->programa,
      'planoTrabalho' => $consolidacao->planoTrabalho,
      'planosEntregas' => PlanoEntrega::whereIn("id", $planosEntregasIds)->get(),
      'atividades' => $atividades,
      'afastamentos' => $afastamentos,
      'ocorrencias' => $ocorrencias,
      'comparecimentos' => $consolidacao->comparecimentos ?? [],
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
        $afastamento["observacoes"] = $snapshot->observacoes;
        $afastamento["data_inicio"] = $snapshot->data_inicio;
        $afastamento["data_fim"] = $snapshot->data_fim;
        $afastamento["deleted_at"] = $snapshot->deleted_at;
      }
    }
    return $afastamento;
  }

  /** 
   * Reconstroi a Ocorrencia para ter a aparência de quando a consolidação foi concluída
   * 
   * @param   array  $ocorrencia          Ocorrencia (Array) que se deseja atualizar
   * @param   Consolidacao  $consolidacao Consolidacao
   * @return  array
   */
  public function buildOcorrenciaConsolidacao($ocorrencia, $consolidacao) {
    if(!empty($consolidacao->data_conclusao)) {
      $consolidacaoOcorrencia = PlanoTrabalhoConsolidacaoOcorrencia::where("plano_trabalho_consolidacao_id", $consolidacao->id)->
        where("data_conclusao", $consolidacao->data_conclusao)->
        where("ocorrencia_id", $ocorrencia["id"])->first();
      if(!empty($consolidacaoOcorrencia)) {
        $snapshot = (object) $consolidacaoOcorrencia->snapshot;
        $ocorrencia["descricao"] = $snapshot->descricao;
        $ocorrencia["data_inicio"] = $snapshot->data_inicio;
        $ocorrencia["data_fim"] = $snapshot->data_fim;
        $ocorrencia["deleted_at"] = $snapshot->deleted_at;
      }
    }
    return $ocorrencia;
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
      //$anterior = $this->anterior($id);
      //if(!empty($anterior) && in_array($anterior->status, ["INCLUIDO"])) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Existe consolidação anterior ainda não concluída");
      $dados = $this->consolidacaoDados($id);
      $consolidacao = PlanoTrabalhoConsolidacao::find($id);
      if(empty($consolidacao)) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Consolidação não encontrada");
      if(!empty($consolidacao->data_conclusao)) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Consolidação já concluída");
      if (!is_array($dados)) {
        throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Dados de consolidação inválidos");
      }
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
      /* Snapshot das ocorrencias */
      foreach(array_map(fn($a) => $a["id"], $dados["ocorrencias"] ?? []) as $ocorrenciaId) {
        $ocorrencia = Ocorrencia::find($ocorrenciaId);
        $consolidacaoOcorrencia = new PlanoTrabalhoConsolidacaoOcorrencia([
          "data_conclusao" => $dataConclusao,
          "snapshot" => $ocorrencia->toArray(),
          "plano_trabalho_consolidacao_id" => $id,
          "ocorrencia_id" => $ocorrencia->id
        ]);
        $consolidacaoOcorrencia->save();
      }
      /* Atualiza o status */
      $this->statusService->atualizaStatus($consolidacao, 'CONCLUIDO', 'A consolidação foi concluída nesta data.');
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
      //$proximo = $this->proximo($id);
      //if(!empty($proximo) && in_array($proximo->status, ["CONCLUIDO", "AVALIADO"])) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Existe consolidação posterior concluída");
      $consolidacao = PlanoTrabalhoConsolidacao::find($id);
      if(empty($consolidacao)) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Consolidação não encontrada");
      if(empty($consolidacao->data_conclusao)) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Consolidação não concluída");
      $consolidacao->data_conclusao = null;
      $consolidacao->save();
      PlanoTrabalhoConsolidacaoAtividade::where("plano_trabalho_consolidacao_id", $id)->delete();
      PlanoTrabalhoConsolidacaoAfastamento::where("plano_trabalho_consolidacao_id", $id)->delete();
      PlanoTrabalhoConsolidacaoOcorrencia::where("plano_trabalho_consolidacao_id", $id)->delete();
      $this->statusService->atualizaStatus($consolidacao, 'INCLUIDO', 'Cancelado a conclusão nesta data.');
      $this->statusService->atualizaStatus($consolidacao->planoTrabalho, 'ATIVO', 'Cancelado a conclusão nesta data.');

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

  /** 
   * Completa o processo de avaliação para a consolidação
   * 
   * @param   Avanliacao  $avaliacao Avaliacao
   * @return  void
   */
  public function avaliar($avaliacao) {
    $consolidacao = $avaliacao->planoTrabalhoConsolidacao;
    $consolidacao->avaliacao_id = $avaliacao->id;
    $consolidacao->save();
    $this->statusService->atualizaStatus($consolidacao, 'AVALIADO');
    /* (RN_PTR_L) Um Plano de Trabalho adquire o status 'CONCLUIDO' quando a sua última consolidação for avaliada; */
    if(PlanoTrabalhoConsolidacao::where("plano_trabalho_id", $consolidacao->plano_trabalho_id)->orderByDesc("data_fim")->first()->id == $consolidacao->id) {
      $this->statusService->atualizaStatus($consolidacao->planoTrabalho, 'CONCLUIDO');
    }
  }

}
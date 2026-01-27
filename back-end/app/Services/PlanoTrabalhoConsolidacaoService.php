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
use App\Enums\StatusEnum;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Services\Snapshot\Creator\AfastamentoSnapshotCreator;
use App\Services\Snapshot\Creator\AtividadeSnapshotCreator;
use App\Services\Snapshot\Creator\OcorrenciaSnapshotCreator;
use App\Services\Snapshot\Creator\PlanoTrabalhoConsolidacaoSnapshotCreatorService;
use App\Services\Snapshot\Rebuilder\AfastamentoSnapshotRebuilder;
use App\Services\Snapshot\Rebuilder\AtividadeSnapshotRebuilder;
use App\Services\Snapshot\Rebuilder\OcorrenciaSnapshotRebuilder;
use App\Services\Snapshot\Rebuilder\PlanoTrabalhoConsolidacaoRebuildService;
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
        $data["where"][] = ["planoTrabalho.unidade.path", "like", "%/" . $unidade->id];
      } else {
        $data["where"][] = $unidadeId;
      }
    }
    return $data;
  }

  public function proxyExtra($rows, $data, $count)
  {
    $result = [];
    if (in_array("avaliacao", $data["with"])) {
      $tiposAvaliacoesIds = array_unique(array_map(fn($v) => ($v["avaliacao"] ?? ["tipo_avaliacao_id" => null])["tipo_avaliacao_id"], $rows->toArray()));
      $tiposAvaliacoes = TipoAvaliacao::with(["notas"])->whereIn("id", $tiposAvaliacoesIds)->get()->all();
      $result["tipos_avaliacoes"] = $tiposAvaliacoes;
    }
    if (in_array("planoTrabalho:id", $data["with"])) {
      $planosTrabalhosIds = array_unique(array_map(fn($v) => $v["plano_trabalho_id"], $rows->toArray()));
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
      $programasIds = array_unique(array_map(fn($v) => $v["programa_id"], $planosTrabalhos));
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
    $repository = new PlanoTrabalhoConsolidacaoRepository();
    $snapshotRebuilders = [
      'atividades' => new AtividadeSnapshotRebuilder(new AtividadeService()),
      'afastamentos' => new AfastamentoSnapshotRebuilder(),
      'ocorrencias' => new OcorrenciaSnapshotRebuilder()
    ];

    $rebuilderService = new PlanoTrabalhoConsolidacaoRebuildService($snapshotRebuilders);
    $consolidacaoData = $repository->getConsolidacaoData($id);
    $consolidacao = $repository->findConsolidacaoById($id);

    return [
      'programa' => $consolidacao->planoTrabalho?->programa,
      'planoTrabalho' => $consolidacao->planoTrabalho,
      'planosEntregas' => $consolidacaoData['planosEntregas'],
      'atividades' => $rebuilderService->rebuildCollections($consolidacaoData['atividades'], $consolidacao, 'atividades'),
      'afastamentos' => $rebuilderService->rebuildCollections($consolidacaoData['afastamentos'], $consolidacao, 'afastamentos'),
      'ocorrencias' => $rebuilderService->rebuildCollections($consolidacaoData['ocorrencias'], $consolidacao, 'ocorrencias'),
      'comparecimentos' => $consolidacao->comparecimentos ?? [],
      'status' => $consolidacao->status,
      'justificativa_conclusao' => $consolidacao->justificativa_conclusao,
    ];
  }

  /** 
   * Reconstroi o Afastameto para ter a aparência de quando a consolidação foi concluída
   * 
   * @param   array  $afastamento         Afastamento (Array) que se deseja atualizar
   * @param   Consolidacao  $consolidacao Consolidacao
   * @return  array
   */
  public function buildAfastamentoConsolidacao($afastamento, $consolidacao)
  {
    if (!empty($consolidacao->data_conclusao)) {
      $consolidacaoAfastameto = PlanoTrabalhoConsolidacaoAfastamento::where("plano_trabalho_consolidacao_id", $consolidacao->id)->where("data_conclusao", $consolidacao->data_conclusao)->where("afastamento_id", $afastamento["id"])->first();
      if (!empty($consolidacaoAfastameto)) {
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
  public function buildOcorrenciaConsolidacao($ocorrencia, $consolidacao)
  {
    if (!empty($consolidacao->data_conclusao)) {
      $consolidacaoOcorrencia = PlanoTrabalhoConsolidacaoOcorrencia::where("plano_trabalho_consolidacao_id", $consolidacao->id)->where("data_conclusao", $consolidacao->data_conclusao)->where("ocorrencia_id", $ocorrencia["id"])->first();
      if (!empty($consolidacaoOcorrencia)) {
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
  public function buildAtividadeConsolidacao($atividade, $consolidacao)
  {
    if (!empty($consolidacao->data_conclusao)) {
      $consolidacaoAtividade = PlanoTrabalhoConsolidacaoAtividade::where("plano_trabalho_consolidacao_id", $consolidacao->id)->where("data_conclusao", $consolidacao->data_conclusao)->where("atividade_id", $atividade["id"])->first();
      if (!empty($consolidacaoAtividade)) {
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
        foreach ($atividade["comentarios"] as $comentario) {
          if (
            UtilService::asTimestamp($comentario["created_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao) &&
            (empty($comentario["deleted_at"]) || UtilService::asTimestamp($comentario["deleted_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao))
          ) {
            $comentarios[] = $comentario;
          }
        }
        $atividade["comentarios"] = $comentarios;
        /* Atualiza pausas */
        $pausas = [];
        foreach ($atividade["pausas"] as $pausa) {
          if (
            UtilService::asTimestamp($pausa["created_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao) &&
            (empty($pausa["deleted_at"]) || UtilService::asTimestamp($pausa["deleted_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao))
          ) {
            $pausas[] = $pausa;
          }
        }
        $atividade["pausas"] = $pausas;
        /* Atualiza tarefas */
        $tarefas = [];
        foreach ($atividade["tarefas"] as $tarefa) {
          if (
            UtilService::asTimestamp($tarefa["created_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao) &&
            (empty($tarefa["deleted_at"]) || UtilService::asTimestamp($tarefa["deleted_at"]) < UtilService::asTimestamp($consolidacao->data_conclusao))
          ) {
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
  public function concluir($id, $justificativa_conclusao): array
  {
    DB::beginTransaction();
    try {
      /* (RN_CSLD_11) Não pode concluir a consolidação antes que a anterior não esteja concluida, e não pode retornar status da consolidação se a posterior estiver a frente (em status); */
      //$anterior = $this->anterior($id);
      //if(!empty($anterior) && in_array($anterior->status, ["INCLUIDO"])) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Existe consolidação anterior ainda não concluída");
      $consolidacao = PlanoTrabalhoConsolidacao::find($id);
      if (empty($consolidacao)) throw new ServerException("ConcluirPlanoTrabalhoConsolidacao", "Consolidação não encontrada");
      $dados = $this->consolidacaoDados($id);
      if (!empty($consolidacao->data_conclusao)) throw new ServerException("ConcluirPlanoTrabalhoConsolidacao", "Consolidação já concluída");
      if (!is_array($dados)) {
        throw new ServerException("ConcluirPlanoTrabalhoConsolidacao", "Dados de consolidação inválidos");
      }
      if (empty($dados['planoTrabalho']))
        throw new ServerException("ConcluirPlanoTrabalhoConsolidacao", "Plano de Trabalho não encontrado");

      /* se array de atividades estiver vazio, não pode concluir */
      if (count($dados["atividades"] ?? []) == 0) {
        throw new ServerException("ConcluirPlanoTrabalhoConsolidacao", "Antes de concluir, é necessário fazer a descrição dos trabalhos executados.");
      }

      /* Para cada ID de entrega, verificar se existe em dados[atividades].plano_trabalho_entrega_id */
      if (!(new UsuarioService)->isGestorUnidade(($dados['planoTrabalho'])->unidade_id)) {
        $IdsEntregasPlanoTrabalho = $consolidacao->planoTrabalho->entregas->pluck('id');

        if ($IdsEntregasPlanoTrabalho->isEmpty()) throw new ServerException("ConcluirPlanoTrabalhoConsolidacao", "Para concluir é preciso que todas as entregas tenham atividades associadas");
        foreach ($IdsEntregasPlanoTrabalho as $IdEntregaPlanoTrabalho) {
          if (!in_array($IdEntregaPlanoTrabalho, array_column($dados["atividades"] ?? [], "plano_trabalho_entrega_id"))) {
            throw new ServerException("ConcluirPlanoTrabalhoConsolidacao", "Para concluir é preciso que todas as entregas tenham atividades associadas");
          }
        }
      }

      $dataConclusao = new DateTime();
      $consolidacao->data_conclusao = $dataConclusao;
      if (!empty($justificativa_conclusao)) {
        $consolidacao->justificativa_conclusao = $justificativa_conclusao;
      }
      $consolidacao->save();
      $snapshotCreators = [
        'atividades' => new AtividadeSnapshotCreator(),
        'afastamentos' => new AfastamentoSnapshotCreator(),
        'ocorrencias' => new OcorrenciaSnapshotCreator()
      ];
      (new PlanoTrabalhoConsolidacaoSnapshotCreatorService($snapshotCreators))->createSnapshots($dados, $id, $dataConclusao);
      /* Atualiza o status */
      $this->statusService->atualizaStatus($consolidacao, StatusEnum::CONCLUIDO, 'A consolidação foi concluída nesta data.');
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
      if (empty($consolidacao)) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Consolidação não encontrada");
      if (empty($consolidacao->data_conclusao)) throw new ServerException("ValidatePlanoTrabalhoConsolidacao", "Consolidação não concluída");
      $consolidacao->data_conclusao = null;
      $consolidacao->justificativa_conclusao = null;
      $consolidacao->save();
      PlanoTrabalhoConsolidacaoAtividade::where("plano_trabalho_consolidacao_id", $id)->delete();
      PlanoTrabalhoConsolidacaoAfastamento::where("plano_trabalho_consolidacao_id", $id)->delete();
      PlanoTrabalhoConsolidacaoOcorrencia::where("plano_trabalho_consolidacao_id", $id)->delete();
      $this->statusService->atualizaStatus($consolidacao, StatusEnum::INCLUIDO, 'Cancelado a conclusão nesta data.');
      $this->statusService->atualizaStatus($consolidacao->planoTrabalho, StatusEnum::ATIVO, 'Cancelado a conclusão nesta data.');

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
  public function anterior($consolidacaoId)
  {
    $consolidacao = PlanoTrabalhoConsolidacao::find($consolidacaoId);
    return PlanoTrabalhoConsolidacao::where("plano_trabalho_id", $consolidacao->plano_trabalho_id)->where("data_inicio", "<", $consolidacao->data_inicio)->orderBy("data_inicio", "DESC")->first();
  }

  /** 
   * Consolidação imediatamente posterior a consolidação passada
   * 
   * @param   string  $id       O ID da Consolidação
   * @return  PlanoTrabalhoConsolidacao | null
   */
  public function proximo($consolidacaoId)
  {
    $consolidacao = PlanoTrabalhoConsolidacao::find($consolidacaoId);
    return PlanoTrabalhoConsolidacao::where("plano_trabalho_id", $consolidacao->plano_trabalho_id)->where("data_fim", ">", $consolidacao->data_fim)->orderBy("data_fim", "ASC")->first();
  }

  /** 
   * Completa o processo de avaliação para a consolidação
   * 
   * @param   Avanliacao  $avaliacao Avaliacao
   * @return  void
   */
  public function avaliar($avaliacao)
  {
    $consolidacao = $avaliacao->planoTrabalhoConsolidacao;
    $consolidacao->avaliacao_id = $avaliacao->id;
    $consolidacao->save();
    $this->statusService->atualizaStatus($consolidacao, StatusEnum::AVALIADO);
    /* (RN_PTR_L) Um Plano de Trabalho adquire o status 'CONCLUIDO' quando a sua última consolidação for avaliada; */
    if (PlanoTrabalhoConsolidacao::where("plano_trabalho_id", $consolidacao->plano_trabalho_id)->orderByDesc("data_fim")->first()->id == $consolidacao->id) {
      $this->statusService->atualizaStatus($consolidacao->planoTrabalho, StatusEnum::CONCLUIDO);
    }
  }

  /**
   * Retorna as consolidações pendentes do usuário
   * 
   * @param   string  $usuarioId  ID do usuário
   * @return  array
   */
  public function pendenciasUsuario($usuarioId): array
  {

    // Buscar consolidações INCLUIDO que já passaram da data_fim + tolerância
    // Só devem aparecer na tela de pendência a partir do 11º dia a contar da DATA FIM do período avaliativo. Se ao menos um período já tiver em atraso, deve aparecer na tela, mesmo que todos os outros estejam OK.

    $consolidacoesPendentes = PlanoTrabalhoConsolidacao::with([
      'planoTrabalho.programa:id,nome,dias_tolerancia_consolidacao',
      'planoTrabalho.unidade:id,nome,sigla'
    ])
      ->whereHas('planoTrabalho', function ($query) use ($usuarioId) {
        $query->where('usuario_id', $usuarioId);
        $query->whereIn('status', [StatusEnum::ATIVO, StatusEnum::CONCLUIDO, StatusEnum::AVALIADO]);
      })
      ->where('status', StatusEnum::INCLUIDO)
      ->whereDate('data_fim', '<', now()->subDays(11)) // FIXME colocar este 11 numa constante para dar mais contexto
      ->orderBy('data_fim', 'asc')
      ->get();

    $pendencias = [];
    foreach ($consolidacoesPendentes as $consolidacao) {
      $dataLimite = \Carbon\Carbon::parse($consolidacao->data_fim)
        ->addDays($consolidacao->planoTrabalho->programa->dias_tolerancia_consolidacao ?? 11);

      $diasAtraso = now()->diffInDays($dataLimite, false); // false para valores negativos quando em atraso

      $pendencias[] = [
        'id' => $consolidacao->id,
        'data_inicio' => $consolidacao->data_inicio,
        'data_fim' => $consolidacao->data_fim,
        'data_limite' => $dataLimite->toDateString(),
        'dias_atraso' => abs($diasAtraso),
        'plano_trabalho' => [
          'id' => $consolidacao->planoTrabalho->id,
          'numero' => $consolidacao->planoTrabalho->numero,
          'programa' => $consolidacao->planoTrabalho->programa->nome,
          'unidade' => $consolidacao->planoTrabalho->unidade->nome
        ]
      ];
    }

    return $pendencias;
  }

  /**
   * Detecta inconsistências em consolidações concluídas ou avaliadas
   * onde entregas do plano de trabalho não possuem atividades associadas
   * 
   * Utiliza as tabelas de snapshot (PlanoTrabalhoConsolidacaoAtividade) para 
   * verificar as atividades que existiam no momento da conclusão da consolidação
   */
  public function detectarInconsistencias($usuario_id = null)
  {
    $query = PlanoTrabalhoConsolidacao::with([
      'planoTrabalho.entregas',
      'planoTrabalho.usuario',
      'planoTrabalho.unidade',
      'planoTrabalho.programa'
    ])
      ->whereIn('status', [StatusEnum::CONCLUIDO, StatusEnum::AVALIADO]);

    if ($usuario_id) {
      $query->whereHas('planoTrabalho', function ($q) use ($usuario_id) {
        $q->where('usuario_id', $usuario_id);
      });
    }

    $consolidacoes = $query->get();

    if ($consolidacoes->isEmpty()) {
      return [];
    }

    // Otimização: Buscar todos os snapshots de atividades de uma vez
    $consolidacaoIds = $consolidacoes->pluck('id');

    // Buscar snapshots de atividades das consolidações usando a tabela correta
    $snapshotsAtividades = PlanoTrabalhoConsolidacaoAtividade::whereIn('plano_trabalho_consolidacao_id', $consolidacaoIds)
      ->select('plano_trabalho_consolidacao_id', 'snapshot')
      ->get()
      ->groupBy('plano_trabalho_consolidacao_id');

    $inconsistencias = [];

    foreach ($consolidacoes as $consolidacao) {
      $entregasSemAtividade = [];

      // Obter snapshots de atividades para esta consolidação
      $snapshotsConsolidacao = $snapshotsAtividades->get($consolidacao->id, collect());

      // Extrair plano_trabalho_entrega_id dos snapshots
      $entregasComAtividade = $snapshotsConsolidacao->map(function ($snapshot) {
        // O campo snapshot é convertido pelo cast AsJson que retorna um objeto stdClass
        // Precisamos converter para array ou acessar como objeto
        $snapshotData = $snapshot->snapshot;
        if (is_object($snapshotData)) {
          return $snapshotData->plano_trabalho_entrega_id ?? null;
        }
        return $snapshotData['plano_trabalho_entrega_id'] ?? null;
      })->filter()->unique();

      foreach ($consolidacao->planoTrabalho->entregas as $entrega) {
        $temAtividade = $entregasComAtividade->contains($entrega->id);

        if (!$temAtividade) {
          $entregasSemAtividade[] = [
            'id' => $entrega->id,
            'descricao' => $entrega->descricao,
            'data_inicio' => $entrega->data_inicio,
            'data_fim' => $entrega->data_fim
          ];
        }
      }

      // Se há entregas sem atividade, adiciona à lista de inconsistências
      if (!empty($entregasSemAtividade)) {
        $inconsistencias[] = [
          'consolidacao_id' => $consolidacao->id,
          'status' => $consolidacao->status,
          'data_inicio' => $consolidacao->data_inicio,
          'data_fim' => $consolidacao->data_fim,
          'plano_trabalho' => [
            'id' => $consolidacao->planoTrabalho->id,
            'numero' => $consolidacao->planoTrabalho->numero,
            'usuario' => $consolidacao->planoTrabalho->usuario->nome,
            'programa' => $consolidacao->planoTrabalho->programa->nome,
            'unidade' => $consolidacao->planoTrabalho->unidade->nome
          ],
          'entregas_sem_atividade' => $entregasSemAtividade,
          'total_entregas_sem_atividade' => count($entregasSemAtividade)
        ];
      }
    }

    return $inconsistencias;
  }
}

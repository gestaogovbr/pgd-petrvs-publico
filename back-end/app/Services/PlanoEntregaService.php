<?php

namespace App\Services;

use App\Models\Unidade;
use App\Models\PlanoEntrega;
use App\Models\Usuario;
use App\Models\StatusJustificativa;
use App\Exceptions\ServerException;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\Programa;
use App\Models\TipoAvaliacao;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use DateTime;
use Illuminate\Support\Facades\Log;
use Throwable;

class PlanoEntregaService extends ServiceBase
{
    public $unidades = []; /* Buffer de unidades para funções que fazem consulta frequentes em unidades */

    public function alteracaoEntregaImpactaPlanoTrabalho($entregaAlterada)
    {
        $entregaAnterior = PlanoEntregaEntrega::find($entregaAlterada["id"]);
        return $entregaAnterior->descricao != $entregaAlterada["descricao"] ||
            $this->utilService->asTimestamp($entregaAnterior->data_inicio) != $this->utilService->asTimestamp($entregaAlterada["data_inicio"]) ||
            $this->utilService->asTimestamp($entregaAnterior->data_fim) != $this->utilService->asTimestamp($entregaAlterada["data_fim"]);
    }

    public function planosImpactadosPorAlteracaoEntrega($entrega)
    {
        $impactados = [];
        $planoEntregaEntrega = PlanoEntregaEntrega::find($entrega["id"]);
        if ($planoEntregaEntrega?->planoEntrega?->Programa?->termo_obrigatorio && ($entrega["_status"] == "DELETE" || ($entrega["_status"] == "EDIT" && $this->alteracaoEntregaImpactaPlanoTrabalho($entrega)))) {
            foreach (PlanoTrabalhoEntrega::where("plano_entrega_entrega_id", $entrega["id"])->get() as $entregaPlanoTrabalho) {
                if (!in_array($entregaPlanoTrabalho->plano_trabalho_id, $impactados))
                    $impactados[] = $entregaPlanoTrabalho->plano_trabalho_id;
            }
        }
        ;
        return $impactados;
    }

    public function proxyStore(&$planoEntrega, $unidade, $action)
    {
        if ($action == ServiceBase::ACTION_INSERT) {
            $planoEntrega["criacao_usuario_id"] = parent::loggedUser()->id;
        } else { // ServiceBase::ACTION_EDIT
            /* (RN_PTR_E) O Plano de Trabalho precisará ser repactuado (retornar ao status de AGUARDANDO_ASSINATURA) quando houver quaisquer alterações no plano de entrega que impacte as entregas do plano de trabalho; (alterada a entrega ou cancelada); */
            $this->buffer["planosTrabalhosImpactados"] = [];
            foreach ($planoEntrega["entregas"] as $entrega) {
                array_merge($this->buffer["planosTrabalhosImpactados"], $this->planosImpactadosPorAlteracaoEntrega($entrega));
            }
        }
        return $planoEntrega;
    }

    public function extraStore($planoEntrega, $unidade, $action)
    {
        $usuario = parent::loggedUser();
        switch ($action) {
            case ServiceBase::ACTION_INSERT:
                // (RN_PENT_A) Quando um Plano de Entregas é criado adquire automaticamente o status INCLUIDO;
                # Se a unidade é instituidora ou a unidade pai é raiz, o plano de entregas é homologado automaticamente
                if ($planoEntrega["unidade"]["instituidora"] || ($planoEntrega["unidade"]->unidadePai && empty($planoEntrega["unidade"]->unidadePai->path))) {
                    $this->statusService->atualizaStatus($planoEntrega, 'ATIVO', 'O Plano de Entrega foi criado nesta data.');
                } else {
                    $this->statusService->atualizaStatus($planoEntrega, 'INCLUIDO', 'O Plano de Entrega foi criado nesta data.');
                }
                break;
            case ServiceBase::ACTION_EDIT:
                /* (RN_PTR_E) O Plano de Trabalho precisará ser repactuado (retornar ao status de AGUARDANDO_ASSINATURA) quando houver quaisquer alterações no plano de entrega que impacte as entregas do plano de trabalho; (alterada a entrega ou cancelada); */
                if (!empty($this->buffer["planosTrabalhosImpactados"])) {
                    foreach ($this->buffer["planosTrabalhosImpactados"] as $planoTrabalhoId) {
                        $this->planoTrabalhoService->repactuar($planoTrabalhoId, true);
                    }
                }
                //(RN_PENT_AE) Se a alteração for feita com o plano de entregas no status ATIVO e o usuário logado possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL", o plano de entregas voltará ao status "HOMOLOGANDO";
                //(RN_PENT_AF) Se a alteração for feita com o plano de entregas no status ATIVO e o usuário logado possuir a capacidade "MOD_PENT_EDT_ATV_ATV", o plano de entregas permanecerá no status "ATIVO";
                if ($planoEntrega->status == 'ATIVO') {
                    if ($usuario->hasPermissionTo('MOD_PENT_EDT_ATV_ATV')) {
                        $this->statusService->atualizaStatus($planoEntrega, 'ATIVO', 'O plano foi alterado nesta data e permaneceu no status ATIVO porque o usuário logado possui a capacidade MOD_PENT_EDT_ATV_ATV.');
                    } else if ($usuario->hasPermissionTo('MOD_PENT_EDT_ATV_HOMOL')) {
                        $this->statusService->atualizaStatus($planoEntrega, 'HOMOLOGANDO', 'O plano foi alterado nesta data e retornou ao status AGUARDANDO HOMOLOGAÇÃO porque o usuário logado possui a capacidade MOD_PENT_EDT_ATV_HOMOL.');
                    }
                    // (RN_PENT_M) Qualquer alteração, depois de o Plano de Entregas ser homologado, precisa ser notificada
                    // ao gestor da Unidade-pai (Unidade A) ou à pessoa que homologou. Essa comunicação sobre eventuais ajustes,
                    // não se aplica à Unidade Instituidora, ou seja, alterações realizadas em planos de entregas de unidades instituidoras não precisam ser notificadas à sua Unidade-pai;
                    $unidadePai = $planoEntrega->unidade->unidadePai;
                    if (!empty($unidadePai->id) && !$planoEntrega->unidade->instituidora) {
                        $destinatarios = array_filter(array_map(
                            fn($x) => $x->usuario ?? null,
                            $unidadePai->gestoresSubstitutos?->all() ?? []
                        ));

                        if (!empty($unidadePai->gestor?->usuario)) {
                            $destinatarios[] = $unidadePai->gestor->usuario;
                        }

                        // Aqui é importante sobrescrever $destinatarios com o resultado de array_merge,
                        // pois a chamada original não modifica o array em si.
                        $destinatarios = array_merge(
                            $destinatarios,
                            array_filter(array_map(
                                fn($x) => $x->usuario ?? null,
                                $unidadePai->gestoresDelegados?->all() ?? []
                            ))
                        );

                        // Remove duplicatas com base no ID
                        $destinatarios = array_filter($destinatarios, fn($x) => !is_null($x)); // garante que todos são válidos

                        $usuarioHomologou = StatusJustificativa::where('codigo', 'ATIVO')
                            ->where('plano_entrega_id', $planoEntrega->id)
                            ->orderByDesc('created_at')
                            ->first()?->usuario;

                        // Adiciona se for diferente e não estiver na lista
                        if (!empty($usuarioHomologou?->id) && !collect($destinatarios)->contains(fn($x) => $x->id === $usuarioHomologou->id)) {
                            $destinatarios[] = $usuarioHomologou;
                        }

                        $this->notificacoesService->send("PENT_ALTERACAO", [
                            "destinatarios" => $destinatarios,
                            "plano_entrega" => $planoEntrega,
                            "servidor" => $usuario
                        ]);

                    }
                }
                break;
        }
    }

    public function arquivar($data, $unidade)
    { // ou 'desarquivar'
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            if (!empty($planoEntrega)) {
                $this->update([
                    "id" => $planoEntrega->id,
                    "data_arquivamento" => $data["arquivar"] ? $this->dataHora() : null
                ], $unidade, false);
            } else {
                throw new ServerException("ValidatePlanoEntrega", "Plano de Entrega não encontrado!");
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    /*public function avaliar($data, $unidade, $request)
    {
      try {
        DB::beginTransaction();
        $planoEntrega = PlanoEntrega::find($data["id"]);
        // IMPLEMENTAR CODIGO DE AVALIAÇÃO DO PLANO DE ENTREGAS
        $this->statusService->atualizaStatus($planoEntrega, 'AVALIADO', 'A avaliação do plano de entregas foi realizada nesta data.');
        // (RN_PENT_O) ... sugerir arquivamento automático (vide RI_PENT_A);
        if ($data["arquivar"]) $this->update(["id" => $planoEntrega->id, "data_arquivamento" => $this->dataHora()], $unidade, false);
        DB::commit();
      } catch (Throwable $e) {
        DB::rollback();
        throw $e;
      }
      return true;
    }*/

    /**
     * Retorna um array com várias informações sobre o plano repassado como parâmetro que serão auxiliares na definição das permissões para as diversas operações possíveis com um Plano de Entregas.
     * Se o plano recebido como parâmetro possuir ID, as informações devolvidas serão baseadas nos dados armazenados no banco. Caso contrário, as informações devolvidas serão baseadas nos dados
     * recebidos na chamada do método.
     * @param array $entity Um array com os dados de um plano já existente ou que esteja sendo criado.
     * @return array
     */
    public function buscaCondicoes(array $entity): array
    {
        if ($this->hasBuffer("buscaCondicoes", $entity["id"])) {
            return $this->getBuffer("buscaCondicoes", $entity["id"]);
        } else {
            $planoEntrega = !empty($entity['id']) ? PlanoEntrega::with('entregas')->find($entity['id'])->toArray() : $entity;
            $planoEntregaPai = !empty($planoEntrega['plano_entrega_id']) ? PlanoEntrega::find($planoEntrega['plano_entrega_id']) : null;
            $planoEntrega['unidade'] = !empty($planoEntrega['unidade_id']) ? Unidade::find($planoEntrega['unidade_id'])->toArray() : null;
            $planoEntrega['unidade']['planosEntrega'] = !empty($planoEntrega['unidade']) ? PlanoEntrega::where('unidade_id', $planoEntrega['unidade_id'])->get()->toArray() : null;
            $result = [];
            $result["planoValido"] = $this->isPlanoEntregaValido($planoEntrega);
            $result["planoAtivo"] = $this->isPlano("ATIVO", $planoEntrega);
            $result["planoConcluido"] = $this->isPlano("CONCLUIDO", $planoEntrega);
            $result["planoPaiAtivo"] = $planoEntrega['plano_entrega_id'] ? $this->isPlano("ATIVO", $planoEntregaPai->toArray()) : false;
            $result["planoHomologando"] = $this->isPlano("HOMOLOGANDO", $planoEntrega);
            $result["planoIncluido"] = $this->isPlano("INCLUIDO", $planoEntrega);
            $result["planoAvaliado"] = $this->isPlano("AVALIADO", $planoEntrega);
            $result["planoProprio"] = $planoEntrega['plano_entrega_id'] == null;
            $result["planoVinculado"] = $planoEntrega['plano_entrega_id'] != null;
            $result["nrEntregas"] = empty($planoEntrega['entregas']) ? 0 : count($planoEntrega['entregas']);
            $result["planoArquivado"] = empty($planoEntrega['id']) ? false : PlanoEntrega::find($planoEntrega['id'])->data_arquivamento != null;
            $result["planoSuspenso"] = $this->isPlano("SUSPENSO", $planoEntrega);
            $result["planoStatus"] = empty($planoEntrega['id']) ? null : PlanoEntrega::find($planoEntrega['id'])->status;
            $result["gestorUnidadePlano"] = $this->usuario->isGestorUnidade($planoEntrega['unidade_id']);
            $result["gestorUnidadePaiUnidadePlano"] = !empty($planoEntrega['unidade']['unidade_pai_id']) && $this->usuario->isGestorUnidade($planoEntrega['unidade']['unidade_pai_id']);
            $result["gestorLinhaAscendenteUnidadePlano"] = !!array_filter($this->unidade->linhaAscendente($planoEntrega['unidade_id']), fn($u) => $this->usuario->isGestorUnidade($u));
            $result["unidadePlanoPaiEhUnidadePaiUnidadePlano"] = $planoEntrega['plano_entrega_id'] ? $planoEntregaPai->unidade_id == $planoEntrega['unidade']['unidade_pai_id'] : false;
            $result["unidadePlanoEhLotacao"] = $this->usuario->isLotacao(null, $planoEntrega['unidade_id']);
            $result["unidadePaiUnidadePlanoEhLotacao"] = !empty($planoEntrega['unidade']['unidade_pai_id']) && $this->usuario->isLotacao(null, $planoEntrega['unidade']['unidade_pai_id']);
            $result["unidadePlanoEhAlgumaLotacaoUsuario"] = in_array($planoEntrega['unidade_id'], array_map(fn($u) => $u['id'], $this->usuario->loggedUser()->unidades->toArray()));
            $result["unidadePlanoEhPaiAlgumaLotacaoUsuario"] = $this->usuario->loggedUser()->unidades->map(fn($u) => $u->id)->map(fn($ul) => Unidade::find($ul)->unidade_id)->contains($planoEntrega['unidade_id']);
            $result["unidadePlanoPossuiPlanoAtivoMesmoPeriodoPlanoPai"] = !!array_filter($planoEntrega['unidade']['planosEntrega'], fn($p) => $this->isPlano('ATIVO', $p) && !empty($planoEntrega) && !empty($planoEntregaPai) && UtilService::intersect($planoEntrega['data_inicio'], $planoEntrega['data_fim'], $planoEntregaPai->data_inicio, $planoEntregaPai->data_fim));
            $result["lotadoLinhaAscendenteUnidadePlano"] = $this->usuario->isLotadoNaLinhaAscendente($planoEntrega['unidade_id']);
            $result["unidadePlanoEstahLinhaAscendenteAlgumaLotacaoUsuario"] = in_array($planoEntrega['unidade_id'], array_values(array_unique(array_reduce(array_map(fn($ul) => $this->unidade->linhaAscendente($ul), array_map(fn($u) => $u['id'], $this->usuario->loggedUser()->unidades->toArray())), 'array_merge', array()))));
            return $this->setBuffer("buscaCondicoes", $entity["id"], $result);
        }
    }

    public function cancelarAvaliacao($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->statusService->atualizaStatus($planoEntrega, 'CONCLUIDO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function cancelarConclusao($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->statusService->atualizaStatus($planoEntrega, 'ATIVO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function cancelarHomologacao($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->statusService->atualizaStatus($planoEntrega, 'HOMOLOGANDO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function cancelarPlano($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            if (!empty($planoEntrega)) {
                $this->statusService->atualizaStatus($planoEntrega, 'CANCELADO', $data["justificativa"]);
                $this->arquivar($data, $unidade);
            } else {
                throw new ServerException("ValidatePlanoEntrega", "Plano de Entrega não encontrado!");
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function concluir($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->statusService->atualizaStatus($planoEntrega, 'CONCLUIDO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    /**
     * Informa se o plano de entregas repassado como parâmetro está em curso.
     * Um Plano de Entregas está EM CURSO quando é um plano VÁLIDO e possui status ATIVO;
     * @param PlanoEntrega $planoEntrega
     */
    public function emCurso(PlanoEntrega $plano): bool
    {
        $planoEntrega = !empty($plano['id']) ? PlanoEntrega::find($plano['id']) : $plano;
        return empty($plano['id']) ? false : ($this->isPlanoEntregaValido($plano) && $planoEntrega->status == 'ATIVO');
    }

    public function homologar($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->statusService->atualizaStatus($planoEntrega, 'ATIVO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    /**
     * Informa o status do plano de entregas repassado como parâmetro.
     * O Plano de Entregas precisa ser VÁLIDO.
     * @param string $status
     * @param array $planoEntrega
     */
    public function isPlano($status, $plano): bool
    {
        $planoEntrega = !empty($plano['id']) ? PlanoEntrega::find($plano['id']) : $plano;
        return empty($plano['id']) ? false : ($this->isPlanoEntregaValido($plano) && $planoEntrega->status == $status);
    }

    /**
     * Informa se o plano de entregas repassado como parâmetro é um plano válido.
     * Um Plano de Entregas é válido se não foi deletado, nem arquivado e não está no status de cancelado.
     * @param array $planoEntrega
     */
    public function isPlanoEntregaValido($plano): bool
    {
        $planoEntrega = !empty($plano['id']) ? PlanoEntrega::where('id', $plano['id'])->first() : $plano;
        return empty($plano['id']) ? false : (!$planoEntrega->trashed() && !$plano['data_arquivamento'] && $planoEntrega->status != 'CANCELADO');
    }

    public function liberarHomologacao($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->statusService->atualizaStatus($planoEntrega, 'HOMOLOGANDO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function metadados($planoEntrega)
    {
        if (empty($this->unidades[$planoEntrega->unidade_id])) {
            $this->unidades[$planoEntrega->unidade_id] = Unidade::find($planoEntrega->unidade_id);
        }
        $result = [
            "incluido" => $planoEntrega->status == 'INCLUIDO',
            "homologando" => $planoEntrega->status == 'HOMOLOGANDO',
            "ativo" => $planoEntrega->status == 'ATIVO',
            "suspenso" => $planoEntrega->status == 'SUSPENSO',
            "concluido" => $planoEntrega->status == 'CONCLUIDO',
            "avaliado" => $planoEntrega->status == 'AVALIADO',
            "arquivado" => !empty($planoEntrega->data_arquivamento),
            "cancelado" => $planoEntrega->status == 'CANCELADO'
        ];
        return $result;
    }

    public function proxyQuery($query, &$data)
    {
        $where = $ids = [];

        //  (RI_PENT_C) Garante que, se não houver um interesse específico na data de arquivamento, só retornarão os planos de entrega não arquivados.
        $arquivados = $this->extractWhere($data, "incluir_arquivados");
        $subordinadas = $this->extractWhere($data, "incluir_subordinadas");
        if (empty($arquivados) || !$arquivados[2])
            $data["where"][] = ["data_arquivamento", "==", null];
        // (RI_PENT_D) Na visualização de Avaliação, deverá trazer a unidade ao qual o usuário é gestor e todas as suas subordinadas imediatas.
        $filhas = $this->extractWhere($data, "unidades_filhas");
        $unidades_vinculadas = $this->extractWhere($data, "unidades_vinculadas");
        $unidadeId = $this->extractWhere($data, "unidade_id");
        if (!empty($unidadeId)) {
            $unidade = Unidade::find($unidadeId[2]);
            if (!empty($filhas) && $filhas[2] && !empty($unidade)) {
                $data["where"][] = ["or", ["unidade_id", "==", $unidadeId[2]], ["unidade.unidade_pai_id", "==", $unidadeId[2]]];
            } else {
                $data["where"][] = $unidadeId;
            }
        }

        if (!empty($subordinadas[2])) {
            $unidadeService = new UnidadeService();

            // Define $uId corretamente, verificando a existência do índice
            if (empty($unidadeId)) {
                $uId = isset($unidades_vinculadas[2]) ? $unidades_vinculadas[2] : null;
            } else {
                $uId = isset($unidadeId[2]) ? $unidadeId[2] : null;
            }

            // Só continua se $uId não for nulo
            if ($uId) {
                $unidadesSubordinadas = $unidadeService->subordinadas($uId);
                $subordinadasIds = $unidadesSubordinadas->pluck('id')->toArray();
                $ids = array_merge($ids, $subordinadasIds);

                if (!empty($ids)) {
                    $data["where"][] = ["unidade_id", "in", $ids];
                }
            }

            // **Processo para unificar os filtros de unidade_id**
            $unidadeIds = [];

            foreach ($data["where"] as $key => $where) {
                if ($where[0] === 'unidade_id') {
                    if ($where[1] === '==') {
                        $unidadeIds[] = $where[2]; // Adiciona o valor único
                        unset($data["where"][$key]); // Remove a condição original
                    } elseif ($where[1] === 'in') {
                        $unidadeIds = array_merge($unidadeIds, $where[2]); // Mescla os valores existentes
                        unset($data["where"][$key]); // Remove a condição original
                    }
                }
            }

            // Se houver IDs, adiciona a condição unificada
            if (!empty($unidadeIds)) {
                $data["where"][] = ['unidade_id', 'in', array_unique($unidadeIds)];
            }
            $data["orderBy"] = [['unidade.path', 'desc']];
        }

        foreach ($data["where"] as $condition) {
            if (is_array($condition) && $condition[0] == "data_filtro") {
                $dataInicio = $this->getFilterValue($data["where"], "data_filtro_inicio");
                $dataFim = $this->getFilterValue($data["where"], "data_filtro_fim");
                switch ($condition[2]) {
                    case "VIGENTE":
                        $where[] = ["data_inicio", "<=", $dataFim];
                        $where[] = ["data_fim", ">=", $dataInicio];
                        break;
                    case "NAOVIGENTE":
                        ;
                        $where[] = ["OR", ["data_inicio", ">", $dataFim], ["data_fim", "<", $dataInicio]];
                        break;
                    case "INICIAM":
                        ;
                        $where[] = ["data_inicio", ">=", $dataInicio];
                        $where[] = ["data_inicio", "<=", $dataFim];
                        break;
                    case "FINALIZAM":
                        ;
                        $where[] = ["data_fim", ">=", $dataInicio];
                        $where[] = ["data_fim", "<=", $dataFim];
                        break;
                }
            } else if (!(is_array($condition) && in_array($condition[0], ["data_filtro_inicio", "data_filtro_fim"]))) {
                array_push($where, $condition);
            }
        }
        $data["where"] = $where;

    }

    public function proxyRows($rows)
    {
        foreach ($rows as $row) {
            $row->metadados = $this->metadados($row);
        }
        return $rows;
    }

    public function proxyExtra($rows, $data, $count)
    {
        if (in_array("avaliacao", $data["with"])) {
            $tiposAvaliacoesIds = array_unique(array_map(fn($v) => ($v["avaliacao"] ?? ["tipo_avaliacao_id" => null])["tipo_avaliacao_id"], $rows->toArray()));
            $tiposAvaliacoes = TipoAvaliacao::with(["notas"])->whereIn("id", $tiposAvaliacoesIds)->get()->all();
            return ["tipos_avaliacoes" => $tiposAvaliacoes];
        } else {
            return null;
        }
    }

    public function reativar($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->statusService->atualizaStatus($planoEntrega, 'ATIVO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function retirarHomologacao($data, $unidade)
    {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->statusService->atualizaStatus($planoEntrega, 'INCLUIDO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function suspender($data, $unidade)
    {

        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->statusService->atualizaStatus($planoEntrega, 'SUSPENSO', $data["justificativa"]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function validaPermissaoIncluir($dataOrEntity, $usuario)
    {
        /*
        (RN_PENT_Z) Condições para que um Plano de Entregas possa ser criado:
          - o usuário logado precisa possuir a capacidade "MOD_PENT_INCL", e:
            - o usuário logado precisa ser gestor da Unidade do plano (Unidade B), ou gestor da sua Unidade-pai (Unidade A)(RN_PENT_B); ou
            - o usuário precisa possuir também a capacidade "MOD_PENT_QQR_UND" (independente de qualquer outra condição);
        */
        $dataOrEntity['unidade'] = Unidade::find($dataOrEntity['unidade_id'])->toArray();
        $condition1 = $this->usuario->isGestorUnidade($dataOrEntity['unidade_id']) ||
            (!empty($dataOrEntity['unidade']['unidade_pai_id']) && $this->usuario->isGestorUnidade($dataOrEntity['unidade']['unidade_pai_id']));
        $condition2 = $usuario->hasPermissionTo('MOD_PENT_QQR_UND');
        if (!$condition1 && !$condition2) {
            throw new ServerException("ValidateUsuario", "O usuário logado precisa atender a pelo menos uma das seguintes condições:\n" .
                "1. ser um dos gestores da unidade do plano ou da sua unidade-pai; [ver RN_PENT_B]\n" .
                "2. possuir a capacidade MOD_PENT_QQR_UND.\n[ver RN_PENT_Z]");
        } else {
            return true;
        }
    }

    /**
     *  Verifica se algumas condições estão atendidas, antes de realizar a inserção/alteração do Plano de Entregas:
     *  - as datas do Plano de Entregas devem se encaixar na duração do Programa de Gestão;
     *  - as datas das entregas do Plano de Entregas devem se encaixar na duração do Programa de Gestão;
     *  - após criado um Plano de Entregas, os seguintes campos não poderão mais ser alterados: unidade_id, programa_id; (RN_PENT_K)
     */
    public function validateStore($dataOrEntity, $unidade, $action)
    {
        $usuario = Usuario::find(parent::loggedUser()->id);
        $programa = Programa::find($dataOrEntity["programa_id"]);
        $this->validaPermissaoIncluir($dataOrEntity, $usuario);
        if (!$usuario->hasPermissionTo('MOD_PENT_ENTR_EXTRPL')) {
            if (!$this->verificaDuracaoPlano($dataOrEntity) || !$this->verificaDatasEntregas($dataOrEntity))
                throw new ServerException("ValidatePlanoEntrega", "O prazo das datas não satisfaz a duração estipulada no programa.");
        }
        if ($this->temSobreposicaoDeDatas($dataOrEntity))
            throw new ServerException("ValidatePlanoEntrega", "Esta unidade já possui plano de entregas cadastrado para o período.");
        if (!$this->programaService->programaVigente($programa))
            throw new ServerException("ValidatePlanoEntrega", "O regramento não está vigente.");
        if ($action == ServiceBase::ACTION_EDIT) {
            /*
              (RN_PENT_L) Para ALTERAR um plano de entregas:
              - O usuário logado precisa possuir a capacidade "MOD_PENT_EDT", o plano de entregas precisa ser válido (ou seja, nem deletado, nem arquivado e com status diferente de 'CANCELADO'), e:
                  - estar com o status INCLUIDO ou HOMOLOGANDO, e o usuário logado precisa ser gestor (ou delegado) da Unidade do plano; ou
                  - o usuário logado precisa ser gestor (ou delegado) da Unidade-pai (Unidade A) da Unidade do plano (Unidade B) e possuir a capacidade "MOD_PENT_EDT_FLH" (RN_PENT_C);  ou
                  - o Plano de Entregas precisa estar com o status ATIVO, o usuário logado precisa atender os critírios da TABELA_1, e ele possuir a capacidade "MOD_PENT_EDT_ATV_HOMOL" (RN_PENT_AE) ou "MOD_PENT_EDT_ATV_ATV" (RN_PENT_AF); ou
                  - o usuário precisa possuir também a capacidade "MOD_PENT_QQR_UND" (independente de qualquer outra condição);
            */
            $condicoes = $this->buscaCondicoes($dataOrEntity);
            if (!$condicoes['planoValido'])
                throw new ServerException("ValidatePlanoEntrega", "O plano de entregas não é válido, ou seja, foi apagado, cancelado ou arquivado.\n[ver RN_PENT_L]");
            $condition1 = ($condicoes['planoIncluido'] || $condicoes['planoHomologando']) && $condicoes['gestorUnidadePlano'];
            $condition2 = $condicoes['gestorUnidadePaiUnidadePlano'] && $usuario->hasPermissionTo("MOD_PENT_EDT_FLH");
            $condition3 = $condicoes['planoAtivo'] && ($condicoes['gestorUnidadePlano'] || $condicoes['gestorUnidadePaiUnidadePlano']) && $usuario->hasPermissionTo(['MOD_PENT_EDT_ATV_HOMOL', 'MOD_PENT_EDT_ATV_ATV']);
            $condition4 = $usuario->hasPermissionTo('MOD_PENT_QQR_UND');
            if (!$condition4 && !($condition1 || $condition2 || $condition3))
                throw new ServerException("ValidatePlanoEntrega", "Ao menos uma das seguintes condições precisa ser atendida:\n" .
                    "1. o plano de entregas estar com o status INCLUIDO ou HOMOLOGANDO, e o usuário logado ser um dos gestores da unidade executora;\n" .
                    "2. o usuário logado possuir a capacidade MOD_PENT_EDT_FLH e ser um dos gestores da unidade-pai do plano de entregas;\n" .
                    "3. o plano de entregas estar com o status ATIVO, o usuário logado precisa atender os critírios da [PTR:TABELA_1] e possuir a capacidade MOD_PENT_EDT_ATV_HOMOL ou MOD_PENT_EDT_ATV_ATV;\n" .
                    "4. o usuário logado possuir a capacidade MOD_PENT_QQR_UND.\n[ver RN_PENT_L]");
            /* (RN_PENT_K)
                Após criado um plano de entregas, os seguintes campos não poderão mais ser alterados: unidade_id, programa_id;
            */
            $planoEntrega = PlanoEntrega::find($dataOrEntity["id"]);
            if ($dataOrEntity["unidade_id"] != $planoEntrega->unidade_id)
                throw new ServerException("ValidatePlanoEntrega", "Depois de criado um Plano de Entregas, não é possível alterar a sua Unidade.\n[ver RN_PENT_K]");
            if ($dataOrEntity["programa_id"] != $planoEntrega->programa_id)
                throw new ServerException("ValidatePlanoEntrega", "Depois de criado um Plano de Entregas, não é possível alterar o seu Programa.\n[ver RN_PENT_K]");
        }
    }

    /**
     * Verifica se as datas do plano de entrega se encaixam na duração do Programa de gestão
     */
    public function verificaDuracaoPlano($planoEntrega)
    {
        $result = true;
        $programa = Programa::find($planoEntrega["programa_id"]);
        if ($programa->prazo_max_plano_entrega > 0) {
            $dataInicio = new DateTime($planoEntrega["data_inicio"]);
            $dataFim = new DateTime($planoEntrega["data_fim"]);
            $diff = $dataInicio->diff($dataFim);
            if ($diff->days > $programa->prazo_max_plano_entrega) {
                $result = false;
            }
        }
        return $result;
    }

    public function temSobreposicaoDeDatas($planoEntrega)
    {
        $dataInicio = new DateTime($planoEntrega["data_inicio"]);
        $dataFim = new DateTime($planoEntrega["data_fim"]);

        $planosDaUnidade = PlanoEntrega::where('unidade_id', $planoEntrega["unidade_id"])
            ->where('status', '!=', 'CANCELADO')
            ->where(function ($query) use ($dataInicio, $dataFim) {
                $query->whereBetween('data_inicio', [$dataInicio, $dataFim])
                    ->orWhereBetween('data_fim', [$dataInicio, $dataFim]);
            })
            ->where("id", "!=", UtilService::valueOrNull($planoEntrega, "id"))->get();
        return $planosDaUnidade->count() > 0;
    }

    /**
     * Verifica se as datas de início e final das entregas do plano de entrega se encaixam na duração do Programa de gestão (true para caso esteja tudo ok)
     */
    public function verificaDatasEntregas($planoEntrega)
    {
        $result = true;
        $dataInicio = new DateTime($planoEntrega["data_inicio"]);
        $dataFim = new DateTime($planoEntrega["data_fim"]);
        if ($planoEntrega["entregas"]) {
            foreach ($planoEntrega["entregas"] as $entrega) {
                $entregaInicio = new DateTime($entrega["data_inicio"]);
                $entregaFim = new DateTime($entrega["data_fim"]);
                $result = $result && ($dataInicio <= $entregaInicio) && ($dataFim >= $entregaFim);
            }
        }
        return $result;
    }

    /**
     * Completa o processo de avaliação para o plano de entrega
     *
     * @param Avanliacao $avaliacao Avaliacao
     * @return  void
     */
    public function avaliar($avaliacao)
    {
        $planoEntrega = $avaliacao->planoEntrega;
        $planoEntrega->avaliacao_id = $avaliacao->id;
        $planoEntrega->save();
        $this->statusService->atualizaStatus($planoEntrega, 'AVALIADO');
        // (RN_PENT_O) ... sugerir arquivamento automático (vide RI_PENT_A);
        //if ($data["arquivar"]) $this->update(["id" => $planoEntrega->id, "data_arquivamento" => $this->dataHora()], $unidade, false);
    }

}

/**
 *                  MAPA DE COBERTURA DAS REGRAS DE NEGÓCIO - PLANO DE ENTREGAS
 *
 *   REGRAS NÃO     REGRAS TOTALMENTE        OUTRAS REGRAS       OUTRAS REGRAS
 *   IMPLEMENTADAS  IMPLEMENTADAS            100% COBERTAS       PARCIALMENTE COBERTAS
 *                  ----------------------------------------------------------------------
 *                  RN_PENT_A
 *                  RN_PENT_B
 *                  RN_PENT_C
 *                  RN_PENT_D
 *                  RN_PENT_E
 *                  RN_PENT_F
 *                  RN_PENT_G
 *   RN_PENT_H
 *                  RN_PENT_I
 *                  RN_PENT_J
 *                  RN_PENT_K
 *                  RN_PENT_L
 *                  RN_PENT_M
 *                  RN_PENT_N
 *                                                                  RN_PENT_O
 *                  RN_PENT_P
 *   RN_PENT_Q
 *                  RN_PENT_R
 *                  RN_PENT_S
 *                  RN_PENT_T
 *                  RN_PENT_U
 *                  RN_PENT_V
 *                  RN_PENT_W
 *                  RN_PENT_X
 *                  RN_PENT_Y
 *                  RN_PENT_Z
 *                  RN_PENT_AA
 *                  RN_PENT_AB
 *                  RN_PENT_AC
 *                  RN_PENT_AD
 *                  RN_PENT_AE
 *                  RN_PENT_AF
 *                  RN_PENT_AG
 *   RI_PENT_A
 *                  RI_PENT_B
 *                  RI_PENT_C
 *
 * Regras relativas a adesão de planos de entregas, assunto
 * adiado para discussão futura
 *   RN_PENT_2_1
 *   RN_PENT_2_2
 *                  RN_PENT_2_3
 *                  RN_PENT_2_4
 *   RN_PENT_2_5
 *   RN_PENT_2_6
 *   RN_PENT_2_7
 *   RN_PENT_3_1
 *                  RN_PENT_3_3
 *                  RN_PENT_4_1
 *
 */

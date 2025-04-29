<?php

namespace App\Services;

use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\AtividadePausa;
use App\Models\Comentario;
use App\Models\Afastamento;
use App\Services\ServiceBase;
use App\Services\UnidadeService;
use App\Services\CalendarioService;
use App\Services\ComentarioService;
use App\Services\RawWhere;
use App\Services\UtilService;
use App\Services\AtividadePausaService;
use App\Exceptions\ServerException;
use App\Models\Atividade;
use App\Models\Documento;
use App\Models\PlanoTrabalho;
use App\Models\PlanoTrabalhoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoTrabalhoConsolidacao;
use App\Models\PlanoTrabalhoConsolidacaoAtividade;
use App\Models\PlanejamentoObjetivo;
use App\Models\CadeiaValorProcesso;
use App\Models\StatusJustificativa;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Throwable;

class AtividadeService extends ServiceBase
{
    public $unidades = []; /* Buffer de unidades para funções que fazem consulta frequentes em unidades */

    public $joinable = [
        "tipo_atividade",
        "plano_trabalho_entrega.plano_entrega_entrega",
        "tarefas.tipo_tarefa",
        "demandante:id,nome,apelido,email,url_foto",
        "pausas",
        "usuario:id,nome,matricula,apelido,email,url_foto",
        "unidade:id,nome,sigla,codigo,path,atividades_arquivamento_automatico,checklist,etiquetas,distribuicao_forma_contagem_prazos,cidade_id,entidade_id,entrega_forma_contagem_prazos",
        "comentarios.usuario:id,nome,apelido,email,url_foto",
        "tarefas.tarefa",
        "tarefas.comentarios.usuario:id,nome,apelido,email,url_foto",
        "plano_trabalho.tipo_modalidade",
        "plano_trabalho.entregas.entrega:id,nome",
        "usuario.afastamentos",
        "usuario.planos_trabalho.entregas.entrega:id,nome",
        "usuario.planos_trabalho.tipo_modalidade:id,nome",
        "reacoes.usuario:id,nome,apelido"
    ];

    public function validateIniciar($data) {
        /* Testa permissão para iniciar atividade de outros usuarios */
        $usuario = parent::loggedUser();
        if ($data["usuario_id"] != $usuario->id){
            if (!$usuario->hasPermissionTo('MOD_ATV_USERS_INICIAR')){
                throw new ServerException("ValidateAtividade", "Não é permitido iniciar atividade de outro usuário!");
            }
        }
    }

    /* 
    (RN_CSLD_14) Não será possível lançar novas atividades em períodos já CONCLUIDO ou AVALIADO. 
    (RN_ATV_5) A atividade deverá ter perído compatível com o do plano de trabalho (Data de distribuição e Prazo de entrega devem estar dentro do período do plano de trabalho)
    (RN_ATV_6) Somente será permitido iniciar a atividade dentro do período do plano de trabalho.
    */        
    public function validatePeriodo($action, $id, $planoTrabalhoId, $planoTrabalhoEntregaId, $dataDistribuicao, $dataEstipuladaEntrega, $dataInicio, $dataEntrega) {
        $entrega = PlanoTrabalhoEntrega::find($planoTrabalhoEntregaId);
        if(empty($entrega)) throw new ServerException("ValidateAtividade", "Entrega não encontra");
        if($entrega->plano_trabalho_id != $planoTrabalhoId) throw new ServerException("ValidateAtividade", "Entrega não pertence ao plano de trabalho selecionado");
        $plano = PlanoTrabalho::with(["consolidacoes" => function($query) use ($dataDistribuicao, $dataEstipuladaEntrega) {
            $query->whereIn('status', ['CONCLUIDO', 'AVALIADO']);
            $query->where('data_inicio', '<=', $dataEstipuladaEntrega);
            $query->where('data_fim', '>=', $dataDistribuicao);
        }])->find($planoTrabalhoId);
        if (!empty($dataInicio)) {
            $dataInicioFormatada = date('Y-m-d', strtotime($dataInicio));
            $dataEntregaFormatada = date('Y-m-d', strtotime($dataEntrega));
            $dataInicioPlano = date('Y-m-d', strtotime($plano->data_inicio));
            $dataFimPlano = date('Y-m-d', strtotime($plano->data_fim));
        
            $periodoPlanoFormatado = "Plano de trabalho: " .
            UtilService::getDateFormatted($plano->data_inicio) . " - " .
            UtilService::getDateFormatted($plano->data_fim);
        
            if ($dataInicioFormatada < $dataInicioPlano || $dataInicioFormatada > $dataFimPlano) {
                throw new ServerException(
                    "ValidateAtividade",
                    "A inicialização da atividade não pode ser anterior ou posterior ao plano de trabalho. ($periodoPlanoFormatado)"
                );
            }
            
            if ($dataEntregaFormatada < $dataInicioPlano || $dataEntregaFormatada > $dataFimPlano) {
                throw new ServerException(
                    "ValidateAtividade",
                    "A entrega da atividade não pode ser anterior ou posterior ao plano de trabalho. ($periodoPlanoFormatado)"
                );
            }
        }
        
        if(UtilService::asTimestamp($plano->data_inicio) > UtilService::asTimestamp($dataDistribuicao) || UtilService::asTimestamp($plano->data_fim) < UtilService::asTimestamp($dataEstipuladaEntrega)) throw new ServerException("ValidateAtividade", "Data da atividade extrapola a do plano de trabalho. (Plano de trabalho: " . UtilService::getDateTimeFormatted($plano->data_inicio) . " - " . UtilService::getDateTimeFormatted($plano->data_fim) . ")\n[RN_ATV_5]");
        foreach($plano->consolidacoes as $concluida) {
            if($action == ServiceBase::ACTION_INSERT || !PlanoTrabalhoConsolidacaoAtividade::where("plano_trabalho_consolidacao_id", $concluida->id)->where("atividade_id", $id)->exists()) throw new ServerException("ValidateAtividade", "Não será possível lançar novas atividades em períodos já CONCLUIDO ou AVALIADO.\n[ver RN_CSLD_14]");
        }
    }

    public function validateStore($data, $unidade, $action) {
        $unidade = Unidade::find($data["unidade_id"]);
        if($action != ServiceBase::ACTION_INSERT) {
            $this->validateBackward($data["id"], "STORE");
        }
        if(!$this->usuarioService->hasLotacao($data["unidade_id"])) {
            throw new ServerException("ValidateAtividade", $unidade->sigla . " não é uma unidade do usuário logado nem subordinada a ele.");
        }
        if(!empty($data["plano_trabalho_id"])) {
            $this->validatePeriodo($action, $data["id"] ?? "", $data["plano_trabalho_id"], $data["plano_trabalho_entrega_id"], $data["data_distribuicao"], $data["data_estipulada_entrega"], $data["data_inicio"], $data["data_entrega"]);
            $planoTrabalho = PlanoTrabalho::find($data["plano_trabalho_id"]);
            if($planoTrabalho->unidade_id != $data["unidade_id"]) {
                throw new ServerException("ValidateAtividade", "Unidade do plano diverge da unidade da atividade");
            }
        }
        if(!empty($data["usuario_id"])) {
            $usuario = Usuario::find($data["usuario_id"]);
            if(!$this->usuarioService->hasLotacao($data["unidade_id"], $usuario, false)) {
                if (!parent::loggedUser()->hasPermissionTo('MOD_ATV_USU_EXT')) {
                    throw new ServerException("ValidateAtividade", $unidade->sigla . " não é uma unidade (lotação) para o responsável, ou você não tem permissão para incluir atividade para usuário de outra unidade (MOD_ATV_USU_EXT)");
                }
            }
        }
    }

    public function proxyStore($data, $unidade, $action) {
        if($action == ServiceBase::ACTION_INSERT) {
            $usuario = parent::loggedUser();
            $data["demandante_id"] = $usuario->id;
            $data["status"] = empty($data["plano_trabalho_consolidacao_id"]) ? 'INCLUIDO' : 'CONCLUIDO';
        }
        return $data;
    }

    public function extraStore(&$entity, $unidade, $action) {
        $metadados = $this->metadados($entity);
        /* Atualiza status */
        $status = $metadados["pausado"] ? "PAUSADO" : 
            ($metadados["concluido"] ? "CONCLUIDO" : 
            ($metadados["iniciado"] ? "INICIADO" : "INCLUIDO"));
        $this->statusService->atualizaStatus($entity, $status);
    }

    public function afterStore($entity, $action) {
        if($action == ServiceBase::ACTION_INSERT) {
            $this->notificacoesService->send("ATV_DISTRIBUICAO", ["atividade" => $entity]);
        } else {
            $this->notificacoesService->send("ATV_MODIFICACAO", ["atividade" => $entity]);
        }
    }

    public function afterUpdate($entity, $data) {
        if(isset($data["comentarios"])) {
            $this->notificacoesService->send("ATV_COMENTARIO", ["atividade" => $entity]);
        }
    }

    public function proxyQuery($query, &$data) {
        $where = [];
        $with = [];
        $unidade_id = null;
        $subordinadas = false;
        $usuario = parent::loggedUser();
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "unidade_id") {
                $unidade_id = $condition[2];
            } else if(is_array($condition) && $condition[0] == "unidades_subordinadas") {
                $subordinadas = $condition[2];
            } else if(is_array($condition) && $condition[0] == "numero_processo") {
                $ids = [];
                $documentos = Documento::where(function ($query) {
                    $query->whereNotNull('atividade_id')->orWhereNotNull('atividade_tarefa_id');
                })->whereRaw("JSON_CONTAINS(link, ?, '$.numero_processo')", [$condition[2]])->get();
                foreach($documentos as $documento) {
                    $ids[] = $documento->atividade?->id ?? $documento->atividade_tarefa?->id;
                }
                array_push($where, ["id", "in", $ids]);
            } else if(is_array($condition) && $condition[0] == "etiquetas") {
                $sql = "";
                $or = "";
                $values = [];
                foreach($condition[2] as $etiqueta) {
                    $sql .= $or . "(JSON_SEARCH(atividades.etiquetas, 'all', ?) is not null)";
                    $values[] = $etiqueta;
                    $or = " OR ";
                }
                array_push($where, RawWhere::raw("(" . $sql . ")", $values));
            } else if(is_array($condition) && $condition[0] == "status") {
                if($condition[2] == "INICIADO") {
                    array_push($where, ["data_inicio", "!=", null]);
                    array_push($where, ["data_entrega", "==", null]);
                } else if($condition[2] == "NAOCONCLUIDO") {
                    array_push($where, ["data_entrega", "==", null]);
                } else if($condition[2] == "CONCLUIDO") {
                    array_push($where, ["data_entrega", "!=", null]);
                } else if($condition[2] == "INCLUIDO") {
                    array_push($where, ["data_inicio", "==", null]);
                } else if($condition[2] == "ARQUIVADO") {
                    array_push($where, ["data_arquivamento", "!=", null]);
                }
            } else if(is_array($condition) && $condition[0] == "plano_entrega_entrega_id") {
                $ids = [];
                $entrega_atividade = PlanoTrabalhoEntrega::where("plano_entrega_entrega_id", $condition[2])->get();
                $ids = $entrega_atividade->map(fn ($a) => $a->id);
                array_push($where, ["plano_trabalho_entrega_id", "in", $ids]);
            } else if(is_array($condition) && $condition[0] == "plano_entrega_id") {
                $ids = [];
                $entregas_plano_entrega = PlanoEntregaEntrega::where("plano_entrega_id", $condition[2])->get();
                //$ids = $entregas_plano_entrega->map(fn ($epe) => $epe->id)->map(fn ($epe) => PlanoTrabalhoEntrega::where("plano_entrega_entrega_id", $epe)->get()->id);
                foreach($entregas_plano_entrega as $epe) {
                    $entregas_planos_trabalho = PlanoTrabalhoEntrega::where("plano_entrega_entrega_id", $epe->id)->get();
                    foreach($entregas_planos_trabalho as $ept) {
                        $ids[] = $ept->id;
                    }
                }
                array_push($where, ["plano_trabalho_entrega_id", "in", $ids]);
            } else {
                array_push($where, $condition);
            }
        }
        $data["where"] = $this->prefixWhere($where, "Atividade");
        foreach($data["with"] as $join) {
            if($join == "comentarios") {
                $with[$join] = function ($query) use ($usuario) {
                    $query->where('privacidade', '!=', 'PRIVADO');
                    $query->orWhere('usuario_id', '=', $usuario->id);
                };
            } else {
                array_push($with, $join);
            }
        }
        array_push($with, "consolidacoes:id,data_conclusao");
        $unidades_ids = [];
        if(!empty($unidade_id)) {
            array_push($unidades_ids, $unidade_id);
        } else {
            foreach($usuario->areasTrabalho as $lotacao) {
                array_push($unidades_ids, $lotacao->unidade_id);
            }
        }
        $where = [];
        $params = [];
        foreach($unidades_ids as $unidade) {
            array_push($where, "(id = ?" . ($subordinadas ? " OR path LIKE CONCAT('%', ?, '%')" : "") . ")");
            array_push($params, $unidade);
            if($subordinadas) array_push($params, $unidade);
        }
        array_push($data["where"], RawWhere::raw("atividades.unidade_id IN (
            SELECT * FROM (
                SELECT id
                FROM unidades
                WHERE " . (count($where) > 0 ? join(" OR ", $where) : "FALSE") . "
            ) AS subquery
        )", $params));
        return $data;
    }

    public function proxyRows(&$rows) {
        foreach($rows as $row) {
            $row->metadados = $this->metadados($row);
        }
        return $rows;
    }

    public function proxyExtra($rows, $data, $count) {
        $afastamentos = [];
        $planosTrabalhos = [];
        $result = [
            'planos_trabalho' => [],
            'afastamentos' => [],
            'feriados' => []
        ];
        foreach($rows as $row) {
            if(!empty($row->plano_trabalho_id)) $planosTrabalhos[$row->plano_trabalho_id] = true;
            if(empty($row->data_entrega)) { /* Somente as que não estiverem concluídas */
                $tomorrow = Carbon::now()->add(1, "days")->format(ServiceBase::ISO8601_FORMAT);
                $afastamentos[$row->usuario_id] = empty($afastamentos[$row->usuario_id]) ? [$row->data_distribuicao, $row->data_estipulada_entrega] : $afastamentos[$row->usuario_id];
                $afastamentos[$row->usuario_id] = [
                    UtilService::minDate($afastamentos[$row->usuario_id][0], $row->data_distribuicao),
                    UtilService::maxDate($afastamentos[$row->usuario_id][1], $row->data_estipulada_entrega, $tomorrow),
                ];
            }
            if(empty($result['feriados'][$row->unidade_id])) $result['feriados'][$row->unidade_id] = $this->calendarioService->feriadosCadastrados($row->unidade_id);
        }
        if(count($planosTrabalhos) > 0) {
            $list = PlanoTrabalho::with("tipoModalidade")->whereIn("id", array_keys($planosTrabalhos))->get();
            foreach($list as $planoTrabalho) $result['planos_trabalho'][$planoTrabalho->id] = $planoTrabalho;
        }
        if(count($afastamentos) > 0) {
            $afastamentosQuery = Afastamento::query();
            $afastamentosQuery->where("id", null); // Where false;
            foreach($afastamentos as $usuario_id => $periodo) {
                $afastamentosQuery->orWhere(function($query) use ($usuario_id, $periodo) {
                    $query->where("usuario_id", $usuario_id);
                    $query->where("data_inicio", "<=", $periodo[1]);
                    $query->where("data_fim", ">=", $periodo[0]);
                });
            }
            $list = $afastamentosQuery->get();
            foreach($list as $afastamento) {
                if(empty($result['afastamentos'][$afastamento->usuario_id])) $result['afastamentos'][$afastamento->usuario_id] = [];
                array_push($result['afastamentos'][$afastamento->usuario_id], $afastamento);
            }
        }
        return $result;
    }

    public function metadados($atividade) {
        $atividade = (object) $atividade;
        if(empty($this->unidades[$atividade->unidade_id])) {
            $this->unidades[$atividade->unidade_id] = Unidade::find($atividade->unidade_id);
        }
        $hora = $this->unidadeService->hora($this->unidades[$atividade->unidade_id]);
        $result = [
            "horario_servidor" => CalendarioService::horarioServidor(),
            "tempo_despendido" => 0,
            "concluido" => !empty($atividade->data_entrega),
            "iniciado" => !empty($atividade->data_inicio),
            "arquivado" => !empty($atividade->data_arquivamento),
            "produtividade" => 0,
        ];
        $pausado = false;
        foreach($atividade->pausas as $pausa) {
            $pausado = $pausado || empty($pausa->data_fim);
        }
        $consolidacoes = $atividade->consolidacoes ?? PlanoTrabalhoConsolidacaoAtividade::where("atividade_id", $atividade->id)->get();
        $result["pausado"] = $pausado;
        $result["atrasado"] = !$result["concluido"] && strtotime($atividade->data_estipulada_entrega) < strtotime($hora);
        $result["tempo_atraso"] = $result["atrasado"] ? $this->calendarioService->tempoAtraso($atividade->data_estipulada_entrega, $hora, $atividade->carga_horaria) : 0;
        $result["consolidacoes"] = $consolidacoes->map(fn($x) => [
            "id" => ((object) $x)->id,
            "status" => ((object) $x)->snapshot->status,
            "data_conclusao" => ((object) $x)->data_conclusao
        ]);
        return $result;
    }

    public function iniciadas($usuario_id) {
        $result = [];
        $atividades = Atividade::select("id")->where("usuario_id", $usuario_id)->whereNotNull("data_inicio")->whereNull("data_entrega")->whereDoesntHave('pausas', function (Builder $query) {
            $query->whereNull('data_fim');
        })->get();
        foreach ($atividades as $atividade) {
            array_push($result, $atividade->id);
        }
        return $result;
    }

    public function avaliadas($usuario_id) {
        $result = [];
        $atividades = Atividade::select("id")->where("usuario_id", $usuario_id)->whereNotNull("avaliacao_id")->where(["tempo_homologado",">",0])->get();
        foreach ($atividades as $atividade) {
            array_push($result, $atividade->id);
        }
        return $result;
    }

    public function isConcluida($atividade) {
        return !empty($atividade['data_entrega']);
    }

    public function isIniciada($atividade) {
        return !empty($atividade['data_inicio']);
    }

    public function withinPeriodo($atividade, $inicioPeriodo, $fimPeriodo) {
        if ($inicioPeriodo == null && $fimPeriodo == null) return true;
        if(UtilService::intersection([
                    new Interval(['start' => strtotime($inicioPeriodo), 'end' => strtotime($fimPeriodo)]),
                    new Interval(['start' => strtotime($atividade['data_distribuicao']), 'end' => $atividade['data_entrega'] ? UtilService::maxDate(strtotime($atividade['data_estipulada_entrega']),strtotime($atividade['data_entrega'])) : strtotime($atividade['data_estipulada_entrega'])])
            ])) return true;
        return false;
    }

    /* @override */
    public function getById($data)
    {
        $atividade = Atividade::find($data["id"]);
        if(!empty($atividade)) {
            $join = [];
            $util = $this->utilService;
            $data["with"] = isset($this->joinable) ? $this->getJoinable($data["with"] ?? []) : $data["with"];
            if(count($data['with']) > 0) {
                $data['with'] = $this->getCamelWith($data['with']);
                foreach($data['with'] as $with) {
                    if(strtolower($with) == "usuario.afastamentos") {
                        $join["usuario.afastamentos"] = function ($query) use ($atividade, $util) {
                            $tomorrow = Carbon::now()->add(1, "days")->format(ServiceBase::ISO8601_FORMAT);
                            $query->where("data_fim", ">=", $atividade->data_distribuicao);
                            $query->where("data_inicio", "<=", UtilService::maxDate($atividade->data_estipulada_entrega, $atividade->data_entrega, $tomorrow));
                        };
                    } else {
                        array_push($join, $with);
                    }
                }
            }
            $atividade = Atividade::with($join)->where("id", $atividade->id)->first();
            $atividade->metadados = $this->metadados($atividade);
            return $atividade;
        } else {
            throw new ServerException("ValidateAtividade", "Id não encontrado");
        }
    }

    public function lastConsolidacao($atividadeId) {
        return PlanoTrabalhoConsolidacaoAtividade::with(["consolidacao"])->where("atividade_id", $atividadeId)->orderBy("data_conclusao", "DESC")->first();
    }

    /**
     * (RN_CSLD_9) Se uma atividade for iniciada em uma outra consolidação anterior (CONCLUIDO ou AVALIADO), não poderá mais retroceder nem editar o inicio (Exemplo.: Retroceder de INICIADO para INCLUIDO, ou de CONCLUIDO para INICIADO);
     * (RN_CSLD_10) A atividade já iniciado so não pode pausar com data retroativa da última consolidação CONCLUIDO ou AVALIADO
     * 
     * @param string       $atividadeId  Id da atividade para validação
     * @param string       $newStatus    Novo status que se deseja atualizar
     * @param array | null $entity       Objeto da Pausa
     */
    public function validateBackward($atividadeId, $newStatus, $entity = null) {
        $lastConsolidacao = $this->lastConsolidacao($atividadeId);
        if(!empty($lastConsolidacao)) {
            $lastStatus = $lastConsolidacao->snapshot->status;
            $msgConsolidacao = "(Consolidação de " . UtilService::getDateFormatted($lastConsolidacao->consolidacao->data_inicio) . " até " . UtilService::getDateFormatted($lastConsolidacao->consolidacao->data_fim) . ")";
            if($newStatus == "STORE" && $lastStatus != "INCLUIDO") throw new ServerException("ValidateAtividade", "Já existe uma consolidação com esta atividade como INICIADO, não podendo ser modificada. " . $msgConsolidacao);
            if($newStatus == "INCLUIDO" && $lastStatus == "INICIADO") throw new ServerException("ValidateAtividade", "Já existe uma consolidação com esta atividade como INICIADO, não podendo retroagir. " . $msgConsolidacao);
            if($newStatus == "INICIADO" && $lastStatus == "CONCLUIDO") throw new ServerException("ValidateAtividade", "Já existe uma consolidação com esta atividade como CONCLUIDO, não podendo retroagir. " . $msgConsolidacao);
            if($newStatus == "PAUSADO" && UtilService::asTimestamp($entity["data"]) < UtilService::asTimestamp($lastConsolidacao->data_conclusao)) throw new ServerException("ValidateAtividade", "Data para pausa deverá ser superior da última consolidação concluída. " . "Já existe uma consolidação com esta atividade como INICIADO, não podendo retroagir. " . $msgConsolidacao);
        }
    }

    public function iniciar($data, $unidade) {
        $suspender = $data["suspender"];
        unset($data["suspender"]);
        try {
            DB::beginTransaction();
            $atividade = Atividade::find($data["id"]);
            if(empty($atividade)) throw new ServerException("ValidateAtividade", "Atividade não encontrada no banco de dados");
            $this->validateStore(array_merge($atividade->toArray(), $data), $unidade, ServiceBase::ACTION_EDIT);
            /*[
                "id" => $data["id"],
                "unidade_id" => $atividade->unidade_id, 
                "plano_trabalho_id" => $data["plano_trabalho_id"], 
                "plano_trabalho_entrega_id" => $data["plano_trabalho_entrega_id"], 
                "usuario_id" => $data["usuario_id"]
            ] */           
            /*if(CalendarioService::getTimestemp($data["data_inicio"]) < CalendarioService::getTimestemp($demanda->data_distribuicao)) {
                throw new ServerException("ValidateDemanda", "Data de início menor que a data de distribuição.");
            }*/
            $this->validateIniciar($data);
            $this->update($data, $unidade, false);
            $this->statusService->atualizaStatus($atividade, "INICIADO", "Iniciada nessa data manualmente");
            if($suspender) {
                $unidadeService = new UnidadeService();
                $dataHora = $unidadeService->hora($unidade->id);
                $iniciadas = $this->iniciadas($data["usuario_id"]);
                foreach ($iniciadas as $atividade_id) {
                    // Pausar todas, exceto a atividade que está iniciando
                    if ($data["id"] != $atividade_id) {
                        $pausa = new AtividadePausa([
                            "data_inicio" => $dataHora,
                            "atividade_id" => $atividade_id
                        ]);
                        $pausa->save();
                    }
                }
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function cancelarInicio($data, $unidade) {
        try {
            DB::beginTransaction();
            $this->validateBackward($data["id"], "INCLUIDO");
            $atividade = Atividade::find($data["id"]);
            $this->update([
                "id" => $atividade->id,
                "data_arquivamento" => null,
                "data_inicio" => null
            ], $unidade, false);
            $this->statusService->atualizaStatus($atividade, "INCLUIDO", "Cancelado o inínio nessa data");
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function concluir($conclusao, $unidade) {
        $descricaoTecnica = $conclusao["descricao_tecnica"];
        $arquivar = !empty($conclusao["data_arquivamento"]);
        $comentarioService = new ComentarioService();
        unset($conclusao["descricao_tecnica"]);
        unset($conclusao["arquivar"]);
        try {
            DB::beginTransaction();
            $atividade = Atividade::with(["planoTrabalho.tipoModalidade"])->where("id", $conclusao["id"])->first();
            /* Testa permissão para iniciar atividade de outros usuarios */
            if ($atividade->usuario_id != parent::loggedUser()->id){
                if (!parent::loggedUser()->hasPermissionTo('MOD_ATV_USERS_CONCL')){
                    throw new ServerException("ValidateAtividade", "Não é permitido concluir atividade de outro usuário!");
                }
            }
            $conclusao["data_arquivamento"] = $arquivar ? Carbon::now() : null;
            $this->update($conclusao, $unidade, false);
            $this->statusService->atualizaStatus($atividade, "CONCLUIDO", "Concluído nessa data");
            $comentarioTecnico = Comentario::where("atividade_id", $conclusao["id"])->where("tipo", "TECNICO")->first();
            if(!empty($comentarioTecnico)) {
                $comentarioService->destroy($comentarioTecnico->id);
            }
            if(!empty($descricaoTecnica)) {
                $unidadeService = new UnidadeService();
                $comentarioService->store([
                    "texto" => $descricaoTecnica,
                    "path" => null,
                    "data_comentario" => $unidadeService->hora($unidade->id),
                    "tipo" => "TECNICO",
                    "privacidade" => "PUBLICO",
                    "usuario_id" => parent::loggedUser()->id,
                    "atividade_id" => $conclusao["id"]
                ], $unidade, false);
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        $this->notificacoesService->send("ATV_CONCLUSAO", ["atividade" => Atividade::find($conclusao["id"])]);
        return true;
    }

    public function cancelarConclusao($data, $unidade) {
        $comentarioService = new ComentarioService();
        try {
            DB::beginTransaction();
            $this->validateBackward($data["id"], "INICIADO");
            $atividade = Atividade::find($data["id"]);
            $this->update([
                "id" => $atividade->id,
                "data_entrega" => null,
                "data_arquivamento" => null,
                "tempo_despendido" => null,
                "documento_entrega_id" => null
            ], $unidade, false);
            $this->statusService->atualizaStatus($atividade, "INICIADO", "Cancelado conclusão nessa data");
            $comentarioTecnico = Comentario::where("atividade_id", $atividade->id)->where("tipo", "TECNICO")->first();
            if(!empty($comentarioTecnico)) {
                $comentarioService->destroy($comentarioTecnico->id);
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function pausar($pausa, $unidade) {
        $atividadePausaService = new AtividadePausaService();
        try {
            DB::beginTransaction();
            $this->validateBackward($pausa["atividade_id"], "PAUSADO", $pausa);
            $atividade = Atividade::find($pausa["atividade_id"]);
            if(empty($atividade)) {
                throw new ServerException("ValidateAtividade", "Atividade não encontrada");
            }
            if(empty($atividade->data_inicio)) {
                throw new ServerException("ValidateAtividade", "Atividade não iniciada ainda");
            }
            if(CalendarioService::getTimestamp($pausa["data"]) < CalendarioService::getTimestamp($atividade->data_inicio)) {
                throw new ServerException("ValidateAtividade", "Data menor que a do início da atividade");
            }
            foreach($atividade->pausas as $suspensao) {
                if(empty($suspensao->data_fim)) {
                    throw new ServerException("ValidateAtividade", "Atividade já pausada");
                }
                if(CalendarioService::between($pausa["data"], $suspensao->data_inicio, $suspensao->data_fim)) {
                    throw new ServerException("ValidateAtividade", "Já existe uma pausa no período informado");
                }
            }
            $demandaPausa = AtividadePausa::where("atividade_id", $pausa["atividade_id"])->whereNull("data_fim")->first();
            if(empty($demandaPausa)) {
                $atividadePausa = $atividadePausaService->store([
                    "atividade_id" => $pausa["atividade_id"],
                    "data_inicio" => $pausa["data"]
                ], $unidade, false);
            } else {
                throw new ServerException("ValidateAtividade", "Demanda já pausada!");
            }
            /* Atualiza o status da atividade */
            $this->statusService->atualizaStatus($atividade, "PAUSADO", "Pausado nessa data");
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function reiniciar($pausa, $unidade) {
        $atividadePausaService = new AtividadePausaService();
        try {
            DB::beginTransaction();
            $atividade = Atividade::find($pausa["atividade_id"]);
            if(empty($atividade)) {
                throw new ServerException("ValidateAtividade", "Atividade não encontrada");
            }
            $atividadePausa = AtividadePausa::where("atividade_id", $pausa["atividade_id"])->whereNull("data_fim")->first();
            if(!empty($atividadePausa)) {
                if(CalendarioService::getTimestamp($pausa["data"]) < CalendarioService::getTimestamp($atividadePausa->data_inicio)) {
                    throw new ServerException("ValidateAtividade", "Data de reinício menor que a de início da pausa");
                }
                $pausas = AtividadePausa::where("atividade_id", $pausa["atividade_id"])->where("id", "!=", $atividadePausa->id)->get();
                foreach($pausas as $suspensao) {
                    if(CalendarioService::between($pausa["data"], $suspensao->data_inicio, $suspensao->data_fim)) {
                        throw new ServerException("ValidateAtividade", "Já existe uma pausa no período informado");
                    }
                }
                $atividadePausaService->update([
                    "id" => $atividadePausa->id,
                    "data_arquivamento" => null,
                    "data_fim" => $pausa["data"]
                ], $unidade, false);
                /* Atualiza o status da atividade */
                $this->statusService->atualizaStatus($atividade, "INICIADO", "Reiniciado nessa data");
            } else {
                throw new ServerException("ValidateAtividade", "Não há pausa para reiniciar");
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function prorrogar($data, $unidade) {
        try {
            DB::beginTransaction();
            $atividade = Atividade::find($data["id"]);
            if(!empty($atividade)) {
                $this->update([
                    "id" => $atividade->id,
                    "data_estipulada_entrega" => $data["data_estipulada_entrega"]
                ], $unidade, false);
            } else {
                throw new ServerException("ValidateAtividade", "Atividade não encontrada!");
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function arquivar($data, $unidade) {
        try {
            DB::beginTransaction();
            $atividade = Atividade::find($data["id"]);
            if(!empty($atividade)) {
                $this->update([
                    "id" => $atividade->id,
                    "data_arquivamento" => $data["arquivar"] ? Carbon::now() : null
                ], $unidade, false);
            } else {
                throw new ServerException("ValidateAtividade", "Atividade não encontrada!");
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function hierarquia($data)
    {
        $atividade = Atividade::find($data["atividade_id"]);
        if (!empty($atividade)) {
            $entregaPlanoTrabalho = $atividade->planoTrabalhoEntrega;
            $entregaPlanoEntrega = $entregaPlanoTrabalho->planoEntregaEntrega;
            $entregasPlanoEntrega = $this->recuperarEntregasSuperiores($entregaPlanoEntrega);

            $retorno = [
                'atividade' => $atividade,
                'entregaPlanoTrabalho' => $entregaPlanoTrabalho,
                'entregasPlanoEntrega' => $entregasPlanoEntrega,
            ];

            $resultados = $this->recuperarObjetivosProcessosParaEntregas($entregasPlanoEntrega);
            $retorno['objetivos'] = $resultados['objetivos'];
            $retorno['processos'] = $resultados['processos'];

            $retorno['planejamento'] = count($resultados['objetivos'])>0 ? $resultados['objetivos'][0]->planejamento : null;
            $retorno['cadeiaValor'] = count($resultados['processos'])>0 ? $resultados['processos'][0]->cadeiaValor : null;

            return $retorno;
        } else {
            throw new ServerException("ValidateAtividade", "Id não encontrado");
        }
    }

    public function recuperarEntregasSuperiores($entregaPlanoEntrega = null)
    {
        $result = [];
        if(!empty($entregaPlanoEntrega)) {
            $entregaPlanoEntrega->entrega;
            $result = [$entregaPlanoEntrega];
            $atual = $entregaPlanoEntrega;
            while(!empty($atual->entrega_pai_id)) {
                $result[] = $atual->entregaPai;
                $atual = $atual->entregaPai;
                $atual->entrega;
            }
        }
        return $result;

    }

    public function recuperarObjetivosProcessosParaEntregas($entregas)
    {
        $objetivosIds = [];
        $processosIds = [];
        foreach ($entregas as $entrega) {
            $objetivosIds = array_merge($objetivosIds, $entrega->objetivos->pluck('planejamento_objetivo_id')->toArray());
            $processosIds = array_merge($processosIds, $entrega->processos->pluck('cadeia_processo_id')->toArray());
        }

        $objetivos = [];
        $processos = [];
        $planejamentoObjetivos = PlanejamentoObjetivo::whereIn('id', $objetivosIds)->get();
        $planejamnetoProcessos = CadeiaValorProcesso::whereIn('id', $processosIds)->get();


       foreach ($planejamentoObjetivos as $objetivo) {
            $objetivos = [$objetivo];
            $atual = $objetivo;
            while(!empty($atual->objetivo_pai_id)) {
                $objetivos[] = $atual->objetivoPai;
                $atual = $atual->objetivoPai;
            }        
        }

        foreach ($planejamnetoProcessos as $processo) {
            $processos = [$processo];
            $atual = $processo;
            while(!empty($atual->processo_pai_id)) {
                $processos[] = $atual->processoPai;
                $atual = $atual->processoPai;
            }        
        }

        return [
            'objetivos' => $objetivos,
            'processos' => $processos,
        ];
    }
    
}

<?php

namespace App\Services;

use App\Models\Atividade;
use App\Models\Entidade;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\Plano;
use App\Models\Demanda;
use App\Models\DemandaPausa;
use App\Models\DemandaAvaliacao;
use App\Models\Comentario;
use App\Models\Afastamento;
use App\Models\TipoAvaliacao;
use App\Services\ServiceBase;
use App\Services\UnidadeService;
use App\Services\CalendarioService;
use App\Services\ComentarioService;
use App\Services\RawWhere;
use App\Services\UtilService;
use App\Services\DemandaAvaliacaoService;
use App\Services\DemandaPausaService;
use App\Services\NotificacoesService;
use App\Exceptions\ServerException;
use App\Exceptions\LogError;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Throwable;

class DemandaService extends ServiceBase
{
    public $unidades = []; /* Buffer de unidades para funções que fazem consulta frequentes em unidades */

    public $joinable = [
        "atividade",
        "demandante:id,nome,apelido,email,url_foto",
        "pausas",
        "usuario:id,nome,matricula,apelido,email,url_foto",
        "unidade:id,nome,sigla,codigo,path,atividades_arquivamento_automatico,atividades_avaliacao_automatico,autoedicao_subordinadas,checklist,etiquetas,distribuicao_forma_contagem_prazos,cidade_id,entidade_id,gestor_id,gestor_substituto_id,entrega_forma_contagem_prazos,horario_trabalho_fim,horario_trabalho_inicio,horario_trabalho_intervalo,planos_prazo_comparecimento,planos_tipo_prazo_comparecimento",
        "comentarios.usuario:id,nome,apelido,email,url_foto",
        "entregas.tarefa",
        "entregas.comentarios.usuario:id,nome,apelido,email,url_foto",
        "plano.tipo_modalidade",
        "avaliacao",
        "avaliacoes",
        "usuario.afastamentos",
        "usuario.planos.tipo_modalidade:id,nome"
    ];

    public function validateIniciar($data) {
        /*Testa permissão para iniciar demanda de outros usuarios */
        $usuario = parent::loggedUser();
        if ($data["usuario_id"] != $usuario->id){
            if (!$usuario->hasPermissionTo('MOD_DMD_USERS_INICIAR')){
                throw new ServerException("ValidateDemanda", "Não é permitido iniciar demanda de outro usuário!");
            }
        }
    }
    public function validateStore($data, $unidade, $action) {
        $unidade = Unidade::find($data["unidade_id"]);
        if(!$this->usuarioService->hasLotacao($data["unidade_id"])) {
            throw new ServerException("ValidateDemanda", $unidade->sigla . " não é uma unidade do usuário logado nem subordinada a ele.");
        }
        if(!empty($data["plano_id"])) {
            $plano = Plano::find($data["plano_id"]);
            if($plano->unidade_id != $data["unidade_id"]) {
                throw new ServerException("ValidateDemanda", "Unidade do plano diverge da unidade da demanda");
            }
            if(!empty($data["atividade_id"])) {
                $atividade = Atividade::find($data["atividade_id"]);
                if(isset($plano->documento?->metadados?->atividades_termo_adesao) && !parent::loggedUser()->hasPermissionTo('MOD_DMD_ATV_FORA_PL_TRB') &&
                    !in_array(UtilService::removeAcentos(strtolower($atividade->nome)), $plano->documento?->metadados?->atividades_termo_adesao)) {
                    throw new ServerException("ValidateDemanda", "Atividade não consta na lista permitida pelo plano de trabalho selecionado");
                }
            }
        }
        if(!empty($data["usuario_id"])) {
            $usuario = Usuario::find($data["usuario_id"]);
            if(!$this->usuarioService->hasLotacao($data["unidade_id"], $usuario, false)) {
                if (!parent::loggedUser()->hasPermissionTo('MOD_DMD_EXT') && !parent::loggedUser()->hasPermissionTo('MOD_DMD_USERS_ATRIB')){
                    throw new ServerException("ValidateDemanda", $unidade->sigla . " não é uma unidade (lotação) para o responsável, ou você não tem permissão para incluir para qualquer usuário");
                }
            }
        }
    }

    public function proxyStore($data, $unidade, $action) {
        if(empty($data["id"])) {
            $usuario = parent::loggedUser();
            $data["demandante_id"] = $usuario->id;
        }
        //$this->validateStore($data, $unidade);
        return $data;
    }

    public function proxyQuery($query, &$data) {
        //LogError::newWarn("PROXY: Iniciou", $data);
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
                $sql = "(demandas.numero_processo = ? OR demandas.numero_processo_entrega = ? OR EXISTS(SELECT where_demandas_entregas.id FROM demandas_entregas where_demandas_entregas WHERE where_demandas_entregas.demanda_id = demandas.id and where_demandas_entregas.numero_processo = ?))";
                array_push($where, RawWhere::raw($sql, [$condition[2], $condition[2], $condition[2]]));
            } else if(is_array($condition) && $condition[0] == "etiquetas") {
                $sql = "";
                $or = "";
                $values = [];
                foreach($condition[2] as $etiqueta) {
                    $sql .= $or . "(JSON_SEARCH(demandas.etiquetas, 'all', ?) is not null)";
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
                } else if($condition[2] == "AVALIADO") {
                    array_push($where, ["avaliacao_id", "!=", null]);
                } else if($condition[2] == "LANCADO") {
                    array_push($where, ["data_inicio", "==", null]);
                } else if($condition[2] == "ARQUIVADO") {
                    array_push($where, ["data_arquivamento", "!=", null]);
                }
            } else {
                array_push($where, $condition);
            }
        }
        $data["where"] = $this->prefixWhere($where, "Demanda");
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
        $unidades_ids = [];
        if(!empty($unidade_id)) {
            array_push($unidades_ids, $unidade_id);
        } else {
            foreach($usuario->lotacoes as $lotacao) {
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
        array_push($data["where"], RawWhere::raw("demandas.unidade_id IN (
            SELECT * FROM (
                SELECT id
                FROM unidades
                WHERE " . (count($where) > 0 ? join(" OR ", $where) : "FALSE") . "
            ) AS subquery
        )", $params));
        return $data;
    }

    public function proxyRows($rows) {
        foreach($rows as $row) {
            $row->metadados = $this->metadados($row);
        }
        return $rows;
    }

    public function proxyExtra($rows, $data) {
        $afastamentos = [];
        $planos = [];
        $result = [
            'planos' => [],
            'afastamentos' => [],
            'feriados' => []
        ];
        foreach($rows as $row) {
            if(empty($row->data_entrega)) { /* Somente as que não estiverem concluídas */
                if(!empty($row->plano_id)) $planos[$row->plano_id] = true;
                $tomorrow = Carbon::now()->add(1, "days")->format(ServiceBase::ISO8601_FORMAT);
                $afastamentos[$row->usuario_id] = empty($afastamentos[$row->usuario_id]) ? [$row->data_distribuicao, $row->prazo_entrega] : $afastamentos[$row->usuario_id];
                $afastamentos[$row->usuario_id] = [
                    UtilService::minDate($afastamentos[$row->usuario_id][0], $row->data_distribuicao),
                    UtilService::maxDate($afastamentos[$row->usuario_id][1], $row->prazo_entrega, $tomorrow),
                ];
            }
            if(empty($result['feriados'][$row->unidade_id])) $result['feriados'][$row->unidade_id] = $this->calendarioService->feriadosCadastrados($row->unidade_id);
        }
        if(count($planos) > 0) {
            $list = Plano::with("tipoModalidade")->whereIn("id", array_keys($planos))->get();
            foreach($list as $plano) $result['planos'][$plano->id] = $plano;
        }
        if(count($afastamentos) > 0) {
            $afastamentosQuery = Afastamento::query();
            $afastamentosQuery->where("id", null); // Where false;
            foreach($afastamentos as $usuario_id => $periodo) {
                $afastamentosQuery->orWhere(function($query) use ($usuario_id, $periodo) {
                    $query->where("usuario_id", $usuario_id);
                    $query->where("inicio_afastamento", "<=", $periodo[1]);
                    $query->where("fim_afastamento", ">=", $periodo[0]);
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

    public function metadados($demanda) {
        if(empty($this->unidades[$demanda->unidade_id])) {
            $this->unidades[$demanda->unidade_id] = Unidade::find($demanda->unidade_id);
        }
        $hora = $this->unidadeService->hora($this->unidades[$demanda->unidade_id]);
        $result = [
            "horario_servidor" => CalendarioService::horarioServidor(),
            "tempo_despendido" => 0,
            "avaliado" => $demanda->avaliacao_id !== null,
            "concluido" => !empty($demanda->data_entrega),
            "iniciado" => !empty($demanda->data_inicio),
            "arquivado" => !empty($demanda->data_arquivamento),
            "produtividade" => 0,
        ];
        $suspenso = false;
        foreach($demanda->pausas as $pausa) {
            $suspenso = $suspenso || empty($pausa->data_fim);
        }
        $result["suspenso"] = $suspenso;
        $result["atrasado"] = !$result["concluido"] && strtotime($demanda->prazo_entrega) < strtotime($hora);
        $result["tempo_atraso"] = $result["atrasado"] ? $this->calendarioService->tempoAtraso($demanda->prazo_entrega, $hora, $demanda->carga_horaria) : 0;
        $result["status"] = $result["avaliado"] ? "AVALIADO" :
            ($result["concluido"] ? "CONCLUIDO" :
            ($result["iniciado"] ? "INICIADO" : "LANCADO"));
        return $result;
    }

    public function iniciadas($usuario_id) {
        $result = [];
        $demandas = Demanda::select("id")->where("usuario_id", $usuario_id)->whereNotNull("data_inicio")->whereNull("data_entrega")->whereDoesntHave('pausas', function (Builder $query) {
            $query->whereNull('data_fim');
        })->get();
        foreach ($demandas as $demanda) {
            array_push($result, $demanda->id);
        }
        return $result;
    }

    public function avaliadas($usuario_id) {
        $result = [];
        $demandas = Demanda::select("id")->where("usuario_id", $usuario_id)->whereNotNull("avaliacao_id")->get();
        foreach ($demandas as $demanda) {
            array_push($result, $demanda->id);
        }
        return $result;
    }

    public function isAvaliada($demanda) {
        return $demanda['avaliacao_id'] !== null;
    }

    public function isConcluida($demanda) {
        return !empty($demanda['data_entrega']);
    }

    public function isCumprida($demanda) {
        return !empty($demanda['tempo_homologado']);
    }

    public function withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo) {
        if ($inicioPeriodo == null && $fimPeriodo == null) return true;
        if (CalendarioService::between($demanda['data_inicio'], $inicioPeriodo, $fimPeriodo) || CalendarioService::between($demanda['data_entrega'], $inicioPeriodo, $fimPeriodo)) return true;
        return false;
    }

    /* @override */
    public function getById($data)
    {
        $demanda = Demanda::find($data["id"]);
        if(!empty($demanda)) {
            $join = [];
            $util = $this->utilService;
            $data["with"] = isset($this->joinable) ? $this->getJoinable($data["with"] ?? []) : $data["with"];
            if(count($data['with']) > 0) {
                $data['with'] = $this->getCamelWith($data['with']);
                foreach($data['with'] as $with) {
                    if(strtolower($with) == "usuario.afastamentos") {
                        $join["usuario.afastamentos"] = function ($query) use ($demanda, $util) {
                            $tomorrow = Carbon::now()->add(1, "days")->format(ServiceBase::ISO8601_FORMAT);
                            $query->where("fim_afastamento", ">=", $demanda->data_distribuicao);
                            $query->where("inicio_afastamento", "<=", UtilService::maxDate($demanda->prazo_entrega, $demanda->data_entrega, $tomorrow));
                        };
                    } else {
                        array_push($join, $with);
                    }
                }
            }
            $demanda = Demanda::with($join)->where("id", $demanda->id)->first();
            $demanda->metadados = $this->metadados($demanda);
            return $demanda;
        } else {
            throw new ServerException("ValidateDemanda", "Id não encontrado");
        }
    }

    public function afterStore($entity, $action) {
        if($action == ServiceBase::ACTION_INSERT) {
            $this->notificacoesService->sendDemandaDistribuicao($entity);
        } else {
            $this->notificacoesService->sendDemandaModificacao($entity);
        }
    }

    public function afterUpdate($entity, $data) {
        if(isset($data["comentarios"])) {
            $this->notificacoesService->sendDemandaComentario($entity);
        }
    }

    public function iniciar($data, $unidade) {
        $suspender = $data["suspender"];
        unset($data["suspender"]);
        try {
            DB::beginTransaction();
            $demanda = Demanda::find($data["id"]);
            $this->validateStore(["unidade_id" => $demanda->unidade_id, "plano_id" => $data["plano_id"], "usuario_id" => $data["usuario_id"]], $unidade, ServiceBase::ACTION_UPDATE);
            /*if(CalendarioService::getTimestemp($data["data_inicio"]) < CalendarioService::getTimestemp($demanda->data_distribuicao)) {
                throw new ServerException("ValidateDemanda", "Data de início menor que a data de distribuição.");
            }*/
            $this->validateIniciar($data);
            $this->update($data, $unidade, false);
            if($suspender) {
                $unidadeService = new UnidadeService();
                $dataHora = $unidadeService->hora($unidade->id);
                $iniciadas = $this->iniciadas($data["usuario_id"]);
                foreach ($iniciadas as $demanda_id) {
                    // Pausar todas, exceto a demanda que está iniciando
                    if ($data["id"] != $demanda_id) {
                        $pausa = new DemandaPausa([
                            "data_inicio" => $dataHora,
                            "demanda_id" => $demanda_id
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
            $demanda = Demanda::find($data["id"]);
            $this->update([
                "id" => $demanda->id,
                "data_arquivamento" => null,
                "data_inicio" => null
            ], $unidade, false);
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
            $demanda = Demanda::with(["plano.tipoModalidade"])->where("id", $conclusao["id"])->first();
            /*Testa permissão para iniciar demanda de outros usuarios*/
            if ($demanda->usuario_id != parent::loggedUser()->id){
                if (!parent::loggedUser()->hasPermissionTo('MOD_DMD_USERS_CONCL')){
                    throw new ServerException("ValidateDemanda", "Não é permitido concluir demanda de outro usuário!");
                }
            }
            /*Testa permissão para incluir atividades que estão fora do plano de trabalho*/
            $plano = $demanda->plano;
            if(isset($plano->documento?->metadados?->atividades_termo_adesao) && !parent::loggedUser()->hasPermissionTo('MOD_DMD_ATV_FORA_PL_TRB') &&
                !in_array(UtilService::removeAcentos(strtolower($demanda->atividade->nome)), $plano->documento?->metadados?->atividades_termo_adesao)) {
                throw new ServerException("ValidateDemanda", "Atividade não consta na lista permitida pelo plano de trabalho selecionado");
            }
            $dispensaAvaliacao = !empty($demanda->plano->tipoModalidade) && $demanda->plano->tipoModalidade->dispensa_avaliacao;
            $conclusao["tempo_homologado"] = $dispensaAvaliacao ? $conclusao["tempo_pactuado"] : null;
            $conclusao["data_arquivamento"] = $arquivar ? Carbon::now() : null;
            $this->update($conclusao, $unidade, false);
            $comentarioTecnico = Comentario::where("demanda_id", $conclusao["id"])->where("tipo", "TECNICO")->first();
            if(!empty($comentarioTecnico)) {
                $comentarioService->destroy($comentarioTecnico->id);
            }
            if(!empty($descricaoTecnica)) {
                $unidadeService = new UnidadeService();
                $comentarioService->store([
                    "texto" => $descricaoTecnica,
                    "path" => null,
                    "data_hora" => $unidadeService->hora($unidade->id),
                    "tipo" => "TECNICO",
                    "privacidade" => "PUBLICO",
                    "usuario_id" => parent::loggedUser()->id,
                    "demanda_id" => $conclusao["id"]
                ], $unidade, false);
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        $this->notificacoesService->sendDemandaConclusao(Demanda::find($conclusao["id"]));
        return true;
    }

    public function cancelarConclusao($data, $unidade) {
        $comentarioService = new ComentarioService();
        try {
            DB::beginTransaction();
            $demanda = Demanda::find($data["id"]);
            $this->update([
                "id" => $demanda->id,
                "produtividade" => null,
                "data_entrega" => null,
                "data_arquivamento" => null,
                "tempo_despendido" => null,
                "tempo_homologado" => null,
                "id_documento_entrega" => null,
                "numero_documento_entrega" => null,
                "titulo_documento_entrega" => null,
                "tipo_documento_entrega_id" => null
            ], $unidade, false);
            $comentarioTecnico = Comentario::where("demanda_id", $demanda->id)->where("tipo", "TECNICO")->first();
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

    public function avaliar($avaliacao, $unidade) {
        $comentarioService = new ComentarioService();
        $demandaAvaliacaoService = new DemandaAvaliacaoService();
        $comentario = $avaliacao["comentario_avaliacao"];
        $demanda = Demanda::with("plano.tipoModalidade")->where("id", $avaliacao["demanda_id"])->first();
        $dispensaAvaliacao = !empty($demanda->plano->tipo_modalidade) && $demanda->plano->tipo_modalidade->dispensa_avaliacao;
        try {
            /*Testa permissão para avaliar demanda de outros usuarios,
            prevista para o Gestor ou Gestor substituto da Unidade da Demanda*/
            if (($demanda->unidade->gestor_id != parent::loggedUser()->id) && ($demanda->unidade->gestor_substituto_id != parent::loggedUser()->id)) {
                throw new ServerException("ValidateDemanda", "Não é permitido avaliar demanda da qual usuário logado não é Gestor!");
            }
            DB::beginTransaction();
            $tipoAvaliacao = TipoAvaliacao::find($avaliacao["tipo_avaliacao_id"]);
            DemandaAvaliacao::where("demanda_id", $avaliacao["demanda_id"])->
                whereNull("data_fim")->update(["data_fim" => Carbon::now()]);
            $demandaAvaliacao = $demandaAvaliacaoService->store([
                "usuario_id" => parent::loggedUser()->id,
                "demanda_id" => $avaliacao["demanda_id"],
                "justificativas" => $avaliacao["justificativas"],
                "tipo_avaliacao_id" => $avaliacao["tipo_avaliacao_id"],
                "nota_atribuida" => $avaliacao["nota_atribuida"]
            ], $unidade, false);
            $update = [
                "id" => $avaliacao["demanda_id"],
                "atividade_id" => $avaliacao["atividade_id"],
                "fator_complexidade" => $avaliacao["fator_complexidade"],
                "tempo_pactuado" => $avaliacao["tempo_pactuado"],
                "produtividade" => $avaliacao["produtividade"],
                "avaliacao_id" => $demandaAvaliacao->id,
                "data_arquivamento" => $avaliacao["arquivar"] ? Carbon::now() : null
            ];
            if(!$dispensaAvaliacao) $update["tempo_homologado"] = $tipoAvaliacao->aceita_entrega ? $avaliacao["tempo_pactuado"] : 0;
            $this->update($update, $unidade, false);
            $comentarioAvaliacao = Comentario::where("demanda_id", $avaliacao["demanda_id"])->where("tipo", "AVALIACAO")->first();
            if(!empty($comentarioAvaliacao)) {
                $comentarioService->destroy($comentarioAvaliacao->id);
            }
            if(!empty($comentario)) {
                $unidadeService = new UnidadeService();
                $comentarioService->store([
                    "texto" => $comentario,
                    "path" => null,
                    "data_hora" => $unidadeService->hora($unidade->id),
                    "tipo" => "AVALIACAO",
                    "privacidade" => "PUBLICO",
                    "usuario_id" => parent::loggedUser()->id,
                    "demanda_id" => $avaliacao["demanda_id"]
                ], $unidade, false);
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        $this->notificacoesService->sendDemandaAvaliacao(Demanda::find($avaliacao["demanda_id"]));
        return true;
    }

    public function cancelarAvaliacao($data, $unidade) {
        $comentarioService = new ComentarioService();
        try {
            DB::beginTransaction();
            //$demanda = Demanda::find($data["id"]);
            $demanda = Demanda::with("plano.tipoModalidade")->where("id", $data["id"])->first();
            $dispensaAvaliacao = !empty($demanda->plano->tipo_modalidade) && $demanda->plano->tipo_modalidade->dispensa_avaliacao;
            $update = ["id" => $demanda->id, "avaliacao_id" => null, "data_arquivamento" => null];
            if(!$dispensaAvaliacao) $update["tempo_homologado"] = null;
            $this->update($update, $unidade, false);
            DemandaAvaliacao::where("demanda_id", $data["id"])->
                whereNull("data_fim")->update(["data_fim" => Carbon::now()]);
            $comentarioAvaliacao = Comentario::where("demanda_id", $data["id"])->where("tipo", "AVALIACAO")->first();
            if(!empty($comentarioAvaliacao)) {
                $comentarioService->destroy($comentarioAvaliacao->id);
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function pausar($pausa, $unidade) {
        $demandaPausaService = new DemandaPausaService();
        try {
            DB::beginTransaction();
            $demanda = Demanda::find($pausa["demanda_id"]);
            if(empty($demanda)) {
                throw new ServerException("ValidateDemanda", "Demanda não encontrada");
            }
            if(empty($demanda->data_inicio)) {
                throw new ServerException("ValidateDemanda", "Demanda não iniciada ainda");
            }
            if(CalendarioService::getTimestamp($pausa["data"]) < CalendarioService::getTimestamp($demanda->data_inicio)) {
                throw new ServerException("ValidateDemanda", "Data menor que a do início da demanda");
            }
            foreach($demanda->pausas as $suspensao) {
                if(empty($suspensao->data_fim)) {
                    throw new ServerException("ValidateDemanda", "Demanda já pausada");
                }
                if(CalendarioService::between($pausa["data"], $suspensao->data_inicio, $suspensao->data_fim)) {
                    throw new ServerException("ValidateDemanda", "Já existe uma pausa no período informado");
                }
            }
            //$demandaPausa = DemandaPausa::where("demanda_id", $pausa["demanda_id"])->whereNull("data_fim")->first();
            //if(empty($demandaPausa)) {
            $demandaPausa = $demandaPausaService->store([
                "demanda_id" => $pausa["demanda_id"],
                "data_inicio" => $pausa["data"]
            ], $unidade, false);
            //} else {
            //    throw new Exception("Demanda já pausada");
            //}
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function reiniciar($pausa, $unidade) {
        $demandaPausaService = new DemandaPausaService();
        try {
            DB::beginTransaction();
            $demandaPausa = DemandaPausa::where("demanda_id", $pausa["demanda_id"])->whereNull("data_fim")->first();
            if(!empty($demandaPausa)) {
                if(CalendarioService::getTimestamp($pausa["data"]) < CalendarioService::getTimestamp($demandaPausa->data_inicio)) {
                    throw new ServerException("ValidateDemanda", "Data de reinício menor que a de início da pausa");
                }
                $pausas = DemandaPausa::where("demanda_id", $pausa["demanda_id"])->where("id", "!=", $demandaPausa->id)->get();
                foreach($pausas as $suspensao) {
                    if(CalendarioService::between($pausa["data"], $suspensao->data_inicio, $suspensao->data_fim)) {
                        throw new ServerException("ValidateDemanda", "Já existe uma pausa no período informado");
                    }
                }
                $demandaPausaService->update([
                    "id" => $demandaPausa->id,
                    "data_arquivamento" => null,
                    "data_fim" => $pausa["data"]
                ], $unidade, false);
            } else {
                throw new ServerException("ValidateDemanda", "Não há pausa para reiniciar");
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
            $demanda = Demanda::find($data["id"]);
            if(!empty($demanda)) {
                $this->update([
                    "id" => $demanda->id,
                    "prazo_entrega" => $data["prazo_entrega"]
                ], $unidade, false);
            } else {
                throw new ServerException("ValidateDemanda", "Demanda não encontrada!");
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
            $demanda = Demanda::find($data["id"]);
            if(!empty($demanda)) {
                $this->update([
                    "id" => $demanda->id,
                    "data_arquivamento" => $data["arquivar"] ? Carbon::now() : null
                ], $unidade, false);
            } else {
                throw new ServerException("ValidateDemanda", "Demanda não encontrada!");
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

}

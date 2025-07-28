<?php

namespace App\Services;

use App\Models\CadeiaValorProcesso;
use App\Models\PlanejamentoObjetivo;
use App\Models\PlanoEntregaEntrega;
use App\Models\PlanoEntregaEntregaProgresso;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon;

class PlanoEntregaEntregaService extends ServiceBase
{

    public function proxyStore(&$planoEntregaEntrega, $unidade, $action)
    {
        if ($action == ServiceBase::ACTION_EDIT) {
            /* (RN_PTR_E) O Plano de Trabalho precisará ser repactuado (retornar ao status de AGUARDANDO_ASSINATURA) quando houver quaisquer alterações no plano de entrega que impacte as entregas do plano de trabalho; (alterada a entrega ou cancelada); */
            $planoEntregaEntrega["_status"] = "EDIT";
            $this->buffer["planosTrabalhosImpactados"] = $this->planoEntregaService->planosImpactadosPorAlteracaoEntrega($planoEntregaEntrega);
        }
        return $planoEntregaEntrega;
    }

    public function extraStore($entity, $unidade, $action)
    {
        if ($action == ServiceBase::ACTION_EDIT) {
            /* (RN_PTR_E) O Plano de Trabalho precisará ser repactuado (retornar ao status de AGUARDANDO_ASSINATURA) quando houver quaisquer alterações no plano de entrega que impacte as entregas do plano de trabalho; (alterada a entrega ou cancelada); */
            if (!empty($this->buffer["planosTrabalhosImpactados"])) {
                foreach ($this->buffer["planosTrabalhosImpactados"] as $planoTrabalhoId) {
                    $this->planoTrabalhoService->repactuar($planoTrabalhoId, true);
                }
            }
        }
    }

    public function extraDestroy($planoEntregaEntrega)
    {
        $entrega = $planoEntregaEntrega->toArray();
        $entrega["_status"] = "DELETE";
        $planosTrabalhosImpactados = $this->planoEntregaService->planosImpactadosPorAlteracaoEntrega($entrega);
        foreach ($planosTrabalhosImpactados as $planoTrabalhoId) {
            $this->planoTrabalhoService->repactuar($planoTrabalhoId, true);
        }
    }

    public function proxyQuery($query, &$data)
    {
        $where = [];
        foreach ($data["where"] as $condition) {
            if (is_array($condition) && $condition[0] == "objetivos.planejamento_objetivo_id") {
                $query->whereHas('objetivos', function (Builder $query) use ($condition) {
                    $query->where('planejamento_objetivo_id', $condition[2]);
                });
            } else if (is_array($condition) && $condition[0] == "processos.cadeia_processo_id") {
                $query->whereHas('processos', function (Builder $query) use ($condition) {
                    $query->where('cadeia_processo_id', $condition[2]);
                });
            } else if (is_array($condition) && $condition[0] == "plano_entrega.unidade_id") {
                $query->whereHas('planoEntrega', function (Builder $query) use ($condition) {
                    $query->whereIn('unidade_id', $condition[2]);
                });
            } else if (is_array($condition) && $condition[0] == "objetivos.objetivo_id") {
                $query->whereHas('objetivos', function (Builder $query) use ($condition) {
                    $query->where('planejamento_objetivo_id', $condition[2]);
                });
            } else if (is_array($condition) && $condition[0] == "processos.processo_id") {
                $query->whereHas('processos', function (Builder $query) use ($condition) {
                    $query->where('cadeia_processo_id', $condition[2]);
                });
            } else {
                array_push($where, $condition);
            }
        }
        $data["where"] = $where;
        return $data;
    }

    public function afterUpdate($data)
    {
        $entrega = PlanoEntregaEntrega::find($data['id']);
        $usuario = parent::loggedUser();

        $atributosParaCopiar = [
            'homologado',
            'progresso_esperado',
            'progresso_realizado',
            'data_inicio',
            'data_fim',
            'meta',
            'realizado',
        ];

        $atributosParaMonitorar = [
            'progresso_esperado',
            'progresso_realizado',
            'meta',
            'realizado',
        ];

        $dadosAlterados = false;
        foreach ($atributosParaMonitorar as $atributo) {
            if (isset($data[$atributo]) && $data[$atributo] != $entrega->$atributo) {
                $dadosAlterados = true;
                break;
            }
        }

        if ($dadosAlterados) {
            $dadosProgresso = collect($entrega->getAttributes())
                ->only($atributosParaCopiar)
                ->merge([
                    'usuario_id' => $usuario->id,
                    'plano_entrega_entrega_id' => $entrega->id,
                    'data_progresso' => Carbon::now(),
                ])->toArray();

            $progresso = new PlanoEntregaEntregaProgresso($dadosProgresso);
            $progresso->save();
        }

        return $entrega;
    }

    public function hierarquia($data)
    {
        $entregaRaiz = PlanoEntregaEntrega::find($data['entrega_id']);
        $hierarquia = $this->construirHierarquia($entregaRaiz, true);
        return $hierarquia;

    }

    protected function construirHierarquia($entrega, $incluirPai = false)
    {
        $result = [
            'id' => $entrega->id,
            'descricao' => $entrega->descricao,
            'descricao_entrega' => $entrega->descricao_entrega,
            'destinatario' => $entrega->destinatario,
            'descricao_meta' => $entrega->descricao_meta,
            'etiquetas' => $entrega->etiquetas,
            'meta' => $entrega->meta,
            'objetivos' => $entrega->objetivos,
            'processos' => $entrega->processos,
            'produtos' => $entrega->produtos,
            'data_inicio' => $entrega->data_inicio,
            'data_fim' => $entrega->data_fim,
            'unidade' => $entrega->unidade,
            'filhos' => [],
        ];

        if ($incluirPai) {
            $result['pai'] = PlanoEntregaEntrega::with('unidade')->find($entrega->entrega_pai_id);
        }

        $filhos = PlanoEntregaEntrega::where('entrega_pai_id', $entrega->id)->get();

        if ($filhos->isNotEmpty()) {
            $result['filhos'] = $filhos->map(function ($filho) {
                return $this->construirHierarquia($filho, false);
            })->all();
        }

        return $result;
    }

    public function possuiVinculosExcluidos($entregaIds)
    {
        $entregas = PlanoEntregaEntrega::with(['objetivos', 'processos', 'entregaPai'])
            ->whereIn('id', $entregaIds)
            ->get();

        $vinculosExcluidos = [];

        foreach ($entregas as $entrega) {
            if ($this->verificarVinculosExcluidos($entrega)) {
                $vinculosExcluidos[] = $entrega->id;
            }
        }

        return $vinculosExcluidos;
    }
    protected function verificarVinculosExcluidos($entrega)
    {
    
        $objetivos = PlanejamentoObjetivo::onlyTrashed()
            ->whereIn('id', $entrega->objetivos->pluck('planejamento_objetivo_id'))
            ->exists();
        if ($objetivos) {
            return true;
        }

        $processos = CadeiaValorProcesso::onlyTrashed()
            ->whereIn('id', $entrega->processos->pluck('cadeia_processo_id'))
            ->exists(); 
        if ($processos) {
            return true;
        }

        if ($entrega->entrega_pai_id) {
            $entregaPaiExcluida = PlanoEntregaEntrega::onlyTrashed()
                ->where('id', $entrega->entrega_pai_id)
                ->exists();

            if ($entregaPaiExcluida) {
                return true;
            }
        }

        return false;
    }


}

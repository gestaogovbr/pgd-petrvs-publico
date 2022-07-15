<?php

namespace App\Services;

use App\Models\Plano;
use App\Models\Usuario;
use App\Services\RawWhere;
use App\Services\ServiceBase;
use App\Services\DemandaService;
use App\Services\CalendarioService;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Facades\Auth;
use App\Traits\UseDataFim;

class PlanoService extends ServiceBase
{
    use UseDataFim;

    public function planosAtivos($usuario_id) {
        return Plano::where("usuario_id", $usuario_id)->where("data_inicio_vigencia", "<=", now())->where("data_fim_vigencia", ">=", now())->get();
        // adicionar no gitlab para considerar o fuso horário
    }

    public function validateStore($data, $unidade) {
        $usuario = Usuario::find($data["usuario_id"]);
        if(!$this->usuarioService->hasLotacao($data["unidade_id"], $usuario, false)) {
            if (!Auth::user()->hasPermissionTo('MOD_USER_TUDO')) {
            throw new ServerException("ValidatePlanoStore", $unidade->sigla . " não é uma unidade (lotação) do usuário");
            }
        }
    }

    public function metadados($plano, $inicioPeriodo, $fimPeriodo) {
        $result = [
            "concluido" => true,
            "produtividadeMedia" => 0,
            "horasDecorridas" => 0,
            "horasUteisDecorridas" => 0,
            "horasTotais" => 0,
            "tempoTotal" => $plano['tempo_total'],
            "demandasNaoIniciadas" => array_filter($plano['demandas'], fn($demanda) => $demanda['data_inicio'] == null),
            "demandasEmAndamento" => array_filter($plano['demandas'], fn($demanda) => $demanda['data_inicio'] != null && $demanda['data_entrega'] == null),
            "demandasConcluidas" => $this->demandasConcluidas($plano, $inicioPeriodo, $fimPeriodo),
            "demandasAvaliadas" => $this->demandasAvaliadas($plano, $inicioPeriodo, $fimPeriodo),
            "demandasCumpridas" => $this->demandasCumpridas($plano, $inicioPeriodo, $fimPeriodo),
            "horasDemandasNaoIniciadas" => 0,
            "horasDemandasEmAndamento" => 0,
            "horasDemandasConcluidas" => 0,
            "horasDemandasAvaliadas" => 0,
            "horasDemandasCumpridas" => 0
        ];

        /*  Nesse trecho, o método define se o plano foi concluído ou não.
        O plano será considerado CONCLUÍDO quando todas as suas demandas forem CUMPRIDAS. Uma demanda é considerada cumprida quando
        seu tempo homologado não for mais nulo. */
        foreach ($plano['demandas'] as $demanda) {
            if ($demanda['tempo_homologado'] == null) $result['concluido'] = false;
        }

        /* Nesse trecho, o método calcula o total de horas das demandas avaliadas, ou seja, a soma dos seus tempos homologados */
        foreach ($result['demandasAvaliadas'] as $demanda) {
            $result['horasDemandasAvaliadas'] += $demanda['tempo_homologado'];
        }

        /* Nesse trecho, o método calcula o total de horas das demandas ainda não iniciadas, ou seja, a soma dos seus tempos pactuados */
        foreach ($result['demandasNaoIniciadas'] as $demanda) {
            $result['horasDemandasNaoIniciadas'] += $demanda['tempo_pactuado'];
        }

        /* Nesse trecho, o método calcula o total de horas das demandas já iniciadas, mas ainda não concluídas, ou seja, a soma dos seus tempos pactuados */
        foreach ($result['demandasEmAndamento'] as $demanda) {
            $result['horasDemandasEmAndamento'] += $demanda['tempo_pactuado'];
        }

        /* Nesse trecho, o método calcula o total de horas das demandas cumpridas, ou seja, a soma dos seus tempos homologados */
        foreach ($result['demandasCumpridas'] as $demanda) {
            $result['horasDemandasCumpridas'] += $demanda['tempo_homologado'];
        }

        /* Nesse trecho, o método calcula o total das horas das demandas concluidas, ou seja, a soma dos seus tempos despendidos.
        Além disso, também calcula a produtividade média das demandas concluídas. */
        foreach ($result['demandasConcluidas'] as $demanda) {
            $result['horasDemandasConcluidas'] += $demanda['tempo_despendido'];
            $result['produtividadeMedia'] += $demanda['produtividade'];
        }
        $result['produtividadeMedia'] = count($result['demandasConcluidas']) ? $result['produtividadeMedia'] / count($result['demandasConcluidas']) : 0;

        $hi = new DateTime($plano['data_inicio_vigencia']);
        $hf = new DateTime('now', $hi->getTimezone());
        $result['horasDecorridas'] = $this->calendario->horasEntreDatas($hi, $hf);
        $hf = new DateTime($plano['data_fim_vigencia'], $hi->getTimezone());
        $result['horasTotais'] = $this->calendario->horasEntreDatas($hi, $hf);
        return $result;
    }

    /** Este método foi criado para atender ao Relatório de Força de Trabalho - Servidor.
     *  Observe também que os cálculos das horas leva em consideração sempre os tempos pactuados - uma alteração conceitual
     *  introduzida nos Relatórios de Força de Trabalho.
    */
    public function metadadosPlano($plano_id) {
        $plano = Plano::where('id', $plano_id)->with(['demandas', 'demandas.avaliacao'])->first()->toArray();
        $result = [
            "concluido" => true,
            "horasUteisTotais" => $plano['tempo_total'],
            "demandasNaoIniciadas" => array_filter($plano['demandas'], fn($demanda) => $demanda['data_inicio'] == null),
            "demandasEmAndamento" => array_filter($plano['demandas'], fn($demanda) => $demanda['data_inicio'] != null && $demanda['data_entrega'] == null),
            "demandasConcluidas" => $this->demandasConcluidas($plano, null, null),
            "demandasAvaliadas" => $this->demandasAvaliadas($plano, null, null),
            "horasTotaisAlocadas" => 0,
            "mediaAvaliacoes" => null,
            "horasDemandasNaoIniciadas" => 0,
            "horasDemandasEmAndamento" => 0,
            "horasDemandasConcluidas" => 0,
            "horasDemandasAvaliadas" => 0
        ];

        /*  Nesse trecho, o método define se o plano foi concluído ou não.
        O plano será considerado CONCLUÍDO quando todas as suas demandas forem CUMPRIDAS. Uma demanda é considerada cumprida quando
        seu tempo homologado não for mais nulo. */
        foreach ($plano['demandas'] as $demanda) {
            if ($demanda['tempo_homologado'] == null) $result['concluido'] = false;
        }
        if (count($plano['demandas']) == 0) $result['concluido'] = false;

        /* Nesse trecho, o método calcula a soma dos tempos pactuados das demandas avaliadas, e ainda a média das avaliações das demandas */
        foreach ($result['demandasAvaliadas'] as $demanda) {
            $result['horasDemandasAvaliadas'] += $demanda['tempo_pactuado'];
        }
        $result['mediaAvaliacoes'] = (count($result['demandasAvaliadas']) == 0) ? null : $this->utilService->avg(array_map(function($d) {
                                                                                                                        return $d['avaliacao']['nota_atribuida'];
                                                                                                                    }, $result['demandasAvaliadas']));

        /* Nesse trecho, o método calcula a soma dos tempos pactuados das demandas ainda não iniciadas */
        foreach ($result['demandasNaoIniciadas'] as $demanda) {
            $result['horasDemandasNaoIniciadas'] += $demanda['tempo_pactuado'];
        }

        /* Nesse trecho, o método calcula a soma dos tempos pactuados das demandas já iniciadas, mas ainda não concluídas */
        foreach ($result['demandasEmAndamento'] as $demanda) {
            $result['horasDemandasEmAndamento'] += $demanda['tempo_pactuado'];
        }

        /* Nesse trecho, o método calcula a soma dos tempos pactuados das demandas concluidas */
        foreach ($result['demandasConcluidas'] as $demanda) {
            $result['horasDemandasConcluidas'] += $demanda['tempo_pactuado'];
        }
        $result['horasTotaisAlocadas'] = $result['horasDemandasAvaliadas'] + $result['horasDemandasNaoIniciadas'] + $result['horasDemandasEmAndamento'] + $result['horasDemandasConcluidas'];
        return $result;
    }

    /* Este método retorna um array com todas as demandas avaliadas de um determinado plano. Uma demanda é considerada avaliada se
    o seu campo avalicao_id não for mulo. */
    public function demandasAvaliadas($plano, $inicioPeriodo, $fimPeriodo) {
        $result = [];
        foreach ($plano['demandas'] as $demanda) {
            if ($this->demandaService->isAvaliada($demanda) && $this->demandaService->withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo)) array_push($result, $demanda);
        }
        return $result;
    }

    /* Este método retorna um array com todas as demandas concluidas de um determinado plano. Uma demanda é considerada concluída se
    o seu campo data_entrega não for mulo e se ainda não foi avaliada. */
    public function demandasConcluidas($plano, $inicioPeriodo, $fimPeriodo) {
        $result = [];
        foreach ($plano['demandas'] as $demanda) {
            if ($this->demandaService->isConcluida($demanda) && !($this->demandaService->isAvaliada($demanda)) && $this->demandaService->withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo)) array_push($result, $demanda);
        }
        return $result;
    }

    /* Este método retorna um array com todas as demandas cumpridas de um determinado plano. Uma demanda é considerada cumprida se
    o seu campo tempo_homologado não for mulo. */
    public function demandasCumpridas($plano, $inicioPeriodo, $fimPeriodo) {
        $result = [];
        foreach ($plano['demandas'] as $demanda) {
            if ($this->demandaService->isCumprida($demanda) && $this->demandaService->withinPeriodo($demanda, $inicioPeriodo, $fimPeriodo)) array_push($result, $demanda);
        }
        return $result;
    }
}

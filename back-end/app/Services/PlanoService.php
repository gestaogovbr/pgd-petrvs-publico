<?php

namespace App\Services;

use App\Models\Plano;
use App\Models\Usuario;
use App\Services\RawWhere;
use App\Services\ServiceBase;
use App\Services\DemandaService;
use App\Services\CalendarioService;
use App\Services\UtilService;
use App\Exceptions\ServerException;
use DateTime;
use DateTimeZone;
use Illuminate\Support\Facades\Auth;
use App\Traits\UseDataFim;

class PlanoService extends ServiceBase
{
    use UseDataFim;

    /**
     * planosAtivos: Este método retorna todos os Planos de Trabalho de um determinado usuário, que ainda se encontram dentro da vigência
     *
     * @param  mixed $usuario_id
     * @return void
     */
    public function planosAtivos($usuario_id) {
        return Plano::where("usuario_id", $usuario_id)->where("data_inicio_vigencia", "<=", now())->where("data_fim_vigencia", ">=", now())->get();
        // adicionar no gitlab para considerar o fuso horário
    }

    public function validateStore($data, $unidade, $action) {
        $unidade_id = $data["unidade_id"];
        $usuario = Usuario::with(["lotacoes" => function ($query){
            $query->whereNull("data_fim");
        }])->find($data["usuario_id"]);
        $criador = Usuario::with(["lotacoes" => function ($query){
            $query->whereNull("data_fim");
        }])->find(Auth::user()->id);
        /*if(!$this->usuarioService->hasLotacao($unidade_id, $usuario, false) && !Auth::user()->hasPermissionTo('MOD_USER_TUDO')) {
            throw new ServerException("ValidatePlano", $unidade->sigla . " não é uma unidade (lotação) do usuário");
        }*/
        $usuario_lotacoes_ids = $usuario->lotacoes->map(function ($item, $key) { return $item->unidade_id; })->all();
        $criador_lotacoes_ids = $criador->lotacoes->map(function ($item, $key) { return $item->unidade_id; })->all();
        if(!count(array_intersect($usuario_lotacoes_ids, $criador_lotacoes_ids)) && !Auth::user()->hasPermissionTo('MOD_PTR_USERS_INCL')) {
            throw new ServerException("ValidatePlano", "Usuário do plano fora das lotações de quem está lançando o plano (MOD_PTR_USERS_INCL)");
        }
        if(!in_array($unidade_id, $usuario_lotacoes_ids) && !Auth::user()->hasPermissionTo('MOD_PTR_INCL_SEM_LOT')) {
            throw new ServerException("ValidatePlano", "Usuário não lotado na unidade do plano (MOD_PTR_INCL_SEM_LOT)");
        }
        $planos = Plano::where("usuario_id", $data["usuario_id"])->where("usuario_id", $data["unidade_id"])->where("tipo_modalidade_id", $data["tipo_modalidade_id"])->whereNull("data_fim")->get();
        foreach ($planos as $plano) {
            if(UtilService::intersect($plano->data_inicio_vigencia, $plano->data_fim_vigencia, $data["data_inicio_vigencia"], $data["data_fim_vigencia"]) &&
                UtilService::valueOrNull($data, "id") != $plano->id && !Auth::user()->hasPermissionTo('MOD_PTR_INTSC_DATA')) {
                throw new ServerException("ValidatePlano", "O plano de trabalho #" . $plano->numero . " (" . UtilService::getDateTimeFormatted($plano->data_inicio_vigencia) . " à " . UtilService::getDateTimeFormatted($plano->data_fim_vigencia) . ") possui período conflitante para a mesma modalidade (MOD_PTR_INTSC_DATA)");
            }
        }
    }

    public function extraStore($plano, $unidade, $action) {
        /* Adiciona a Lotação automaticamente case o usuário não tenha */
        $usuario = Usuario::with(["lotacoes" => function ($query){
            $query->whereNull("data_fim");
        }])->find($plano->usuario_id);
        $usuario_lotacoes_ids = $usuario->lotacoes->map(function ($item, $key) { return $item->unidade_id; })->all();
        if(!in_array($plano->unidade_id, $usuario_lotacoes_ids)) {
            $this->lotacaoService->store([
                'usuario_id' => $plano->usuario_id,
                'unidade_id' => $plano->unidade_id,
                'principal' => false
            ], $unidade);
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
        $plano = Plano::where('id', $plano_id)->with(['demandas', 'demandas.avaliacao', 'tipoModalidade'])->first()->toArray();
        $result = [
            "usuario_id" => $plano['usuario_id'],
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
            "horasDemandasAvaliadas" => 0,
            "percentualHorasNaoIniciadas" => 0,
            "modalidade" => $plano['tipo_modalidade']['nome']
        ];

        /** TRECHO A SER EXCLUÍDO, APÓS A CONCLUSÃO DA FUNÇÃO 'CALCULA DATA TEMPO' */
        $hi = new DateTime($plano['data_inicio_vigencia']);
        $hf = new DateTime('now', $hi->getTimezone());
        $horasDecorridas = $this->calendario->horasEntreDatas($hi, $hf);
        $hf = new DateTime($plano['data_fim_vigencia'], $hi->getTimezone());
        $horasTotais = $this->calendario->horasEntreDatas($hi, $hf);
        $percentualAjuste = $result["horasUteisTotais"] / $horasTotais;
        $result["horasUteisDecorridas"] = $horasDecorridas * $percentualAjuste;

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

    public function isPlanoGestao($plano) {
        return !$plano['programa']['normativa'] == null;
    }

    public function proxyGetAllIdsExtra($result, $data) {
        $tipoModalidades = [];
        $usuarios = [];
        $unidades = [];
        foreach($result["rows"] as $plano) {
            $tipoModalidades[$plano->tipo_modalidade_id] = $plano->tipoModalidade;
            $usuarios[$plano->usuario_id] = $plano->usuario;
            $unidades[$plano->unidade_id] = $plano->unidade;
        }
        return [
            "merge" => [
                "tipo_modalidade" => $tipoModalidades,
                "usuario" => $usuarios,
                "unidade" => $unidades
            ]
        ];
    }

}

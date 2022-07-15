<?php

namespace App\Services;

use App\Models\Unidade;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use DateTime;
use Illuminate\Support\Facades\Auth;
use App\Traits\UseDataFim;

class UnidadeService extends ServiceBase
{
    use UseDataFim;

    public function hora($idOrUnidade) {
        $unidade = gettype($idOrUnidade) == "string" ? Unidade::find($idOrUnidade) : $idOrUnidade;
        $timeZone = $unidade->cidade->timezone;
        $dateTime = new DateTime();
        $dateTime->setTimestamp($dateTime->getTimestamp() + (60 * 60 * (config('petrvs')["timezone"] - $timeZone)));
        return ServiceBase::toIso8601($dateTime);
    }

    public function proxyStore($data, $unidade) {
        $unidade = Unidade::find($data["id"]);
        $pai = Unidade::find($data["unidade_id"]);
        $data["path"] = empty($pai) ? null : $pai->path . "/" . $pai->id;
        if(!empty($unidade)) {
            $oldPath = $unidade->path . "/" . $unidade->id . "/";
            $newPath = $data["path"] . "/" . $unidade->id . "/";
            Unidade::where('path', 'like', $oldPath . "%")
                ->update(['path' => DB::raw(sprintf("CONCAT('%s', SUBSTR(path, %d))", $newPath, strlen($newPath)))]);
        }
        return $data;
    }

    public function proxySearch($query, &$data, &$text) {
        $data["where"][] = ["subordinadas", "==", true];
        return $this->proxyQuery($query, $data);
    }

    public function proxyQuery($query, &$data) {
        $usuario = Auth::user();
        $where = [];
        $subordinadas = true;
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "subordinadas") {
                $subordinadas = $condition[2];
            } else {
                array_push($where, $condition);
            }
        }
        if(!$usuario->hasPermissionTo("MOD_UND_TUDO")) {
            $lotacoesWhere = $this->usuarioService->lotacoesWhere($subordinadas);
            array_push($where, new RawWhere("($lotacoesWhere)", []));
        }
        $data["where"] = $where;
        return $data;
    }

    public function metadadosArea($unidade_id) {
        $result = null;
        $dadosArea = [
            'qdePlanosPGPRF' => 0,
            'nrServidoresPGPRF' => 0,
            'horasUteisTotais' => 0,
            'qdeDemandasAvaliadas' => 0,
            'horasDemandasNaoIniciadas' => 0,
            'horasDemandasEmAndamento' => 0,
            'horasDemandasConcluidas' => 0,
            'horasDemandasAvaliadas' => 0,
            'horasTotaisAlocadas' => 0,
            'mediaAvaliacoes' => null
        ];
        $dadosUnidades = [];        // array que armazenará os dados das Unidades-filhas da Área (id, nome, sigla e media de todas as avaliações) que possuírem ao menos 1 Plano de Trabalho do PGPRF
        $unidadePrincipal = Unidade::find($unidade_id);
        $unidades_ids = [$unidade_id];
/*         $temp3 = $this->unidadesFilhas($unidade_id);
        $temp4 = array_merge($unidades_ids, $temp3); */
        $unidades_ids = array_merge($unidades_ids, $this->unidadesFilhas($unidade_id));
        foreach ($unidades_ids as $id) {
            $temp = $this->metadadosUnidade($id);
            if ($id == $unidade_id) $aux = $temp;

            if ($temp['qdePlanosPGPRF'] != 0) {
                array_push($dadosUnidades, [
                    'id' => $temp['id'],
                    'nome' => $temp['nome'],
                    'sigla' => $temp['sigla'],
                    'mediaAvaliacoes' => $temp['mediaAvaliacoes'],
                    'nrServidoresPGPRF' => $temp['nrServidoresPGPRF']
                ]);

                $dadosArea['qdePlanosPGPRF'] += $temp['qdePlanosPGPRF'];
                $dadosArea['nrServidoresPGPRF'] += $temp['nrServidoresPGPRF'];
                $dadosArea['horasUteisTotais'] += $temp['horasUteisTotais'];
                $dadosArea['qdeDemandasAvaliadas'] += $temp['qdeDemandasAvaliadas'];
                $dadosArea['horasDemandasNaoIniciadas'] += $temp['horasDemandasNaoIniciadas'];
                $dadosArea['horasDemandasEmAndamento'] += $temp['horasDemandasEmAndamento'];
                $dadosArea['horasDemandasConcluidas'] += $temp['horasDemandasConcluidas'];
                $dadosArea['horasDemandasAvaliadas'] += $temp['horasDemandasAvaliadas'];
                $dadosArea['horasTotaisAlocadas'] += $temp['horasTotaisAlocadas'];
            };

        }
        /** Neste trecho calcula-se a média das avaliações de toda a Área, partindo-se da média das avaliações de cada Unidade que a compõe.
         *  Se um dada Unidade possui mediaAvaliacoes = null, é porque ela não possui nenhuma demanda ainda avaliada. Neste caso, a media das avaliações desta Unidade
         *  (null) não será utilizada no cálculo da média da Área, caso contrário a média seria indevidamente afetada. A função array_map prepara o array com
         *  os valores válidos das médias das avaliações das Unidades, que será enviado à função avg para o cálculo da média aritmética.
         *  Se a Área não possuir nenhuma Unidade-filha, a métrica 'mediaAvaliacoes' será preenchida com null e não será enviada para o cálculo da média.
         */
        if ((count(array_filter($dadosUnidades, fn($p) => $p['mediaAvaliacoes'] != null)) == 0)) {
            $dadosArea['mediaAvaliacoes'] = null;
        } else {
/*             $temp3 = array_filter($dadosUnidades, fn($u) => $u['mediaAvaliacoes'] != null);
            $temp4 = array_map(fn($u) => $u['mediaAvaliacoes'],array_filter($dadosUnidades, fn($u) => $u['mediaAvaliacoes'] != null)); */
            $dadosArea['mediaAvaliacoes'] = $this->utilService->avg(array_map(fn($u) => $u['mediaAvaliacoes'],array_filter($dadosUnidades, fn($u) => $u['mediaAvaliacoes'] != null)));
        }

        $dadosArea['percentualHorasNaoIniciadas'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasDemandasNaoIniciadas'] / $dadosArea['horasUteisTotais'];
        $dadosArea['percentualHorasEmAndamento'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasDemandasEmAndamento'] / $dadosArea['horasUteisTotais'];
        $dadosArea['percentualHorasConcluidas'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasDemandasConcluidas'] / $dadosArea['horasUteisTotais'];
        $dadosArea['percentualHorasAvaliadas'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasDemandasAvaliadas'] / $dadosArea['horasUteisTotais'];
        $dadosArea['percentualHorasTotaisAlocadas'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasTotaisAlocadas'] / $dadosArea['horasUteisTotais'];

        $result = [
            'descricaoArea' => $unidadePrincipal->nome . ' - ' . $unidadePrincipal->sigla,
            'dadosArea' => $dadosArea,
            'dadosUnidade' => $aux,
            'dadosUnidades' => $dadosUnidades
        ];

        return $result;
    }

    public function metadadosUnidade($unidade_id) {
        $unidade = Unidade::where('id', $unidade_id)->with(['planos', 'planos.demandas', 'planos.tipoModalidade'])->first();
        $metadadosPlanos = [];
        foreach ($unidade['planos']->toArray() as $plano) {
            if (str_starts_with($plano['tipo_modalidade']['nome'], 'PGPRF') && ($this->calendarioService->between(new DateTime(), $plano['data_inicio_vigencia'], $plano['data_fim_vigencia']))) array_push($metadadosPlanos, $this->planoService->metadadosPlano($plano['id']));
        }
        $result = [
            "id" => $unidade->id,
            "nome" => $unidade->nome,
            "sigla" => $unidade->sigla,
            "qdePlanosPGPRF" => count($metadadosPlanos),
            "nrServidoresPGPRF" => 0,       // Aguardar definição de como calcular
            "horasUteisTotais" => array_reduce(array_map(fn($m) => $m['horasUteisTotais'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "qdeDemandasAvaliadas" => array_reduce(array_map(fn($m) => count($m['demandasAvaliadas']), $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "horasDemandasNaoIniciadas" => array_reduce(array_map(fn($m) => $m['horasDemandasNaoIniciadas'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "horasDemandasEmAndamento" => array_reduce(array_map(fn($m) => $m['horasDemandasEmAndamento'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "horasDemandasConcluidas" => array_reduce(array_map(fn($m) => $m['horasDemandasConcluidas'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "horasDemandasAvaliadas" => array_reduce(array_map(fn($m) => $m['horasDemandasAvaliadas'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "horasTotaisAlocadas" => array_reduce(array_map(fn($m) => $m['horasTotaisAlocadas'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "mediaAvaliacoes" => null
        ];
        /** Neste trecho calcula-se a média das avaliações de toda a Unidade, partindo-se da média das avaliações de cada Plano de Trabalho considerado.
         *  Se um dado Plano de Trabalho possui mediaAvaliacoes = null, é porque ele não possui nenhuma demanda ainda avaliada. Neste caso, a media das avaliações deste Plano
         *  de Trabalho (null) não será utilizada no cálculo da média da Unidade, caso contrário a média seria indevidamente afetada. A função array_map prepara o array com
         * os valores válidos das médias das avaliações dos Planos, que será enviado à função avg para o cálculo da média aritmética.
         */
        $result['mediaAvaliacoes'] = (count(array_filter($metadadosPlanos, fn($p) => $p['mediaAvaliacoes'] != null)) == 0) ? null : $this->utilService->avg(array_map(function($p) {
            if ($p['mediaAvaliacoes'] != null) return $p['mediaAvaliacoes'];
        }, $metadadosPlanos));

        return $result;
    }

    /** Este método recebe o ID de uma Unidade-Mãe e retorna um array com os IDs de todas as suas unidades-filhas, ou seja,
     *  de todas as Unidades que estão hierarquicamente organizadas abaixo da Unidade-Mãe.
     */
    public function unidadesFilhas($unidade_id) {
        $path = DB::table('unidades')->select('path')->where('id',$unidade_id)->first()->path . '/' . $unidade_id;
        return array_map(fn($x) => $x->id,DB::table('unidades')->select('id')->where('path', 'like', $path)->orWhere('path', 'like', $path . '/%')->get()->toArray());
    }

}

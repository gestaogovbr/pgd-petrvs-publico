<?php

namespace App\Services;

use App\Exceptions\LogError;
use App\Models\ModelBase;
use DateTime;
use DateTimeZone;
use App\Models\Unidade;
use App\Models\Programa;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Traits\UseDataFim;
use Exception;
use Throwable;

class UnidadeService extends ServiceBase
{
    use UseDataFim;

    public function hora($idOrUnidade) {
        $unidade = gettype($idOrUnidade) == "string" ? Unidade::find($idOrUnidade) : $idOrUnidade;
        $timeZone = $unidade->cidade->timezone;
        $timezone_abbr = timezone_name_from_abbr("", -3600*abs($timeZone), 0);
        $dateTime = new DateTime('now', new DateTimeZone($timezone_abbr));
        
        $dateTime->setTimestamp($dateTime->getTimestamp());
        return ServiceBase::toIso8601($dateTime);
    }

    public function proxyStore($data, $unidade, $action) {
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
        //$data["where"][] = ["inativo", "==", null];
        return $this->proxyQuery($query, $data);
    }

    public function proxyQuery($query, &$data) {
        $usuario = parent::loggedUser();
        $where = [];
        $subordinadas = true;
        $inativos = !empty(array_filter($data["where"], fn($w) => $w[0] == "inativo"));
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "subordinadas") {
                $subordinadas = $condition[2];
            } else if(is_array($condition) && $condition[0] == "inativos" && !$inativos) {
                $inativos = $condition[2];
            } else {
                array_push($where, $condition);
            }
        }
        if(!$inativos) {
            array_push($where, ["inativo", "==", null]);
        }
        if(!$usuario->hasPermissionTo("MOD_UND_TUDO")) {
            $lotacoesWhere = $this->usuarioService->lotacoesWhere($subordinadas, null, "unidades");
            array_push($where, new RawWhere("($lotacoesWhere)", []));
        }
        $data["where"] = $where;
        return $data;
    }

    public function mesmaSigla($entidadeId) {
        $repetidos = DB::table('unidades')->select(DB::raw('count(*) as qtd, sigla'))
            ->where('entidade_id', $entidadeId)
            ->whereNull('data_fim')
            ->groupBy('sigla')
            ->having('qtd', '>', 1)
            ->get()->toArray();
        $siglas = array_map(fn($row) => $row->sigla, $repetidos);
        return Unidade::where("entidade_id", $entidadeId)->whereIn("sigla", $siglas)->get();
    }

    public function unificar($correspondencias, $exclui) {
        DB::beginTransaction();
        try {
            $constraints = $this->foreigns("unidades");
            foreach($correspondencias as $dePara) {
                $de = $dePara["unidade_origem_id"];
                $para = $dePara["unidade_destino_id"];
                foreach($constraints as $contraint) {
                    $changes = DB::select("SELECT id, {$contraint->COLUMN_NAME} FROM {$contraint->TABLE_NAME} WHERE {$contraint->COLUMN_NAME} = :de", [":de" => $de]);
                    DB::update("UPDATE {$contraint->TABLE_NAME} SET {$contraint->COLUMN_NAME} = :para WHERE {$contraint->COLUMN_NAME} = :de", [":de" => $de, ":para" => $para]);
                    /* Registra o log das mudanças */
                    foreach($changes as $change) {
                        $delta = [];
                        $delta[$contraint->COLUMN_NAME] = $de;
                        ModelBase::customLogChange($contraint->TABLE_NAME, $change->id, "EDIT", $delta);
                    }
                }
                if($exclui) $this->destroy($de, false);
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function inativo($id, $inativo) {
        DB::beginTransaction();
        try {
            $unidade = Unidade::find($id);
            if(empty($unidade)) throw new Exception("Unidade não encontrada");
            $unidade->inativo = $inativo ? date("Y-m-d H:i:s") : null;
            $unidade->save();
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function metadadosArea($unidade_id, $programa_id) {
        $result = null;
        $programa = Programa::find($programa_id);
        $dadosArea = [
            'nomePrograma' => $programa['nome'],
            'normativa' => $programa['normativa'],
            'qdePlanosPrograma' => 0,
            'nrServidoresPrograma' => 0,
            'horasUteisTotais' => 0,
            'horasUteisDecorridas' => 0,
            'qdeDemandasAvaliadas' => 0,
            'horasDemandasNaoIniciadas' => 0,
            'horasDemandasEmAndamento' => 0,
            'horasDemandasConcluidas' => 0,
            'horasDemandasAvaliadas' => 0,
            'horasTotaisAlocadas' => 0,
            'mediaAvaliacoes' => null
        ];
        $idsServidoresPrograma = [];
        $dadosUnidades = [];        // array que armazenará os dados das Unidades-filhas da Área (id, nome, sigla e media de todas as avaliações) que possuírem ao menos 1 Plano de Trabalho vinculado ao Programa escolhido
        $unidadePrincipal = Unidade::find($unidade_id);
        $unidades_ids = [$unidade_id];
        $unidades_ids = array_merge($unidades_ids, $this->unidadesFilhas($unidade_id));
        foreach ($unidades_ids as $id) {
            $temp = $this->metadadosUnidade($id, $programa_id);
            if ($id == $unidade_id) $aux = $temp;

            if ($temp['qdePlanosPrograma'] != 0) {

                array_push($dadosUnidades, [
                    'id' => $temp['id'],
                    'nome' => $temp['nome'],
                    'sigla' => $temp['sigla'],
                    'mediaAvaliacoes' => $temp['mediaAvaliacoes'],
                    'nrServidoresPrograma' => $temp['nrServidoresPrograma']
                ]);
                //array_push($idsServidoresPrograma, $temp['idsServidoresPrograma']);
                $idsServidoresPrograma = array_merge($idsServidoresPrograma, $temp['idsServidoresPrograma']);

                $dadosArea['qdePlanosPrograma'] += $temp['qdePlanosPrograma'];
                $dadosArea['horasUteisTotais'] += $temp['horasUteisTotais'];
                $dadosArea['horasUteisDecorridas'] += $temp['horasUteisDecorridas'];
                $dadosArea['qdeDemandasAvaliadas'] += $temp['qdeDemandasAvaliadas'];
                $dadosArea['horasDemandasNaoIniciadas'] += $temp['horasDemandasNaoIniciadas'];
                $dadosArea['horasDemandasEmAndamento'] += $temp['horasDemandasEmAndamento'];
                $dadosArea['horasDemandasConcluidas'] += $temp['horasDemandasConcluidas'];
                $dadosArea['horasDemandasAvaliadas'] += $temp['horasDemandasAvaliadas'];
                $dadosArea['horasTotaisAlocadas'] += $temp['horasTotaisAlocadas'];
            };
            $dadosArea['nrServidoresPrograma'] = count(array_unique($idsServidoresPrograma));
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
            $dadosArea['mediaAvaliacoes'] = $this->utilService->avg(array_map(fn($u) => $u['mediaAvaliacoes'],array_filter($dadosUnidades, fn($u) => $u['mediaAvaliacoes'] != null)));
        }

        $dadosArea['percentualHorasNaoIniciadas'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasDemandasNaoIniciadas'] / $dadosArea['horasUteisTotais'];
        $dadosArea['percentualHorasEmAndamento'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasDemandasEmAndamento'] / $dadosArea['horasUteisTotais'];
        $dadosArea['percentualHorasConcluidas'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasDemandasConcluidas'] / $dadosArea['horasUteisTotais'];
        $dadosArea['percentualHorasAvaliadas'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasDemandasAvaliadas'] / $dadosArea['horasUteisTotais'];
        $dadosArea['percentualHorasTotaisAlocadas'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasTotaisAlocadas'] / $dadosArea['horasUteisTotais'];
        $dadosArea['percentualPlanoDecorrido'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasUteisDecorridas'] / $dadosArea['horasUteisTotais'];

        $result = [
            'descricaoArea' => $unidadePrincipal->nome . ' - ' . $unidadePrincipal->sigla,
            'dadosArea' => $dadosArea,
            'dadosUnidade' => $aux,
            'dadosUnidades' => $dadosUnidades
        ];

        return $result;
    }

    /** Este método retorna os dados acerca dos Planos de Trabalho de uma Unidade, associados a um determinado Programa, que se encontrem dentro da vigência. */
    public function metadadosUnidade($unidade_id, $programa_id) {
        $unidade = Unidade::where('id', $unidade_id)->with(['planos', 'planos.demandas', 'planos.tipoModalidade'])->first();
        $metadadosPlanos = [];
        foreach ($unidade['planos']->toArray() as $plano) {
            if (($plano['programa_id'] == $programa_id) && ($plano['data_fim'] == null) && ($this->calendarioService->between(new DateTime(), $plano['data_inicio_vigencia'], $plano['data_fim_vigencia']))) {
                array_push($metadadosPlanos, $this->planoService->metadadosPlano($plano['id']));
            };
        }
        $result = [
            "id" => $unidade->id,
            "nome" => $unidade->nome,
            "sigla" => $unidade->sigla,
            "qdePlanosPrograma" => count($metadadosPlanos),
            "nrServidoresPrograma" => count(array_unique(array_map(fn($x) => $x["usuario_id"], $metadadosPlanos))),
            "idsServidoresPrograma" => array_unique(array_map(fn($x) => $x["usuario_id"], $metadadosPlanos)),
            "modalidadesPlanos" => array_map(fn($x) => $x["modalidade"], $metadadosPlanos),
            "horasUteisTotais" => array_reduce(array_map(fn($m) => $m['horasUteisTotais'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "horasUteisDecorridas" => array_reduce(array_map(fn($m) => $m['horasUteisDecorridas'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "qdeDemandasAvaliadas" => array_reduce(array_map(fn($m) => count($m['demandasAvaliadas']), $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "horasDemandasNaoIniciadas" => array_reduce(array_map(fn($m) => $m['horasDemandasNaoIniciadas'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "horasDemandasEmAndamento" => array_reduce(array_map(fn($m) => $m['horasDemandasEmAndamento'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "horasDemandasConcluidas" => array_reduce(array_map(fn($m) => $m['horasDemandasConcluidas'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "horasDemandasAvaliadas" => array_reduce(array_map(fn($m) => $m['horasDemandasAvaliadas'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "horasTotaisAlocadas" => array_reduce(array_map(fn($m) => $m['horasTotaisAlocadas'], $metadadosPlanos), function($acum, $item) {return $acum + $item;},0),
            "mediaAvaliacoes" => null
        ];
        $result['percentualHorasNaoIniciadas'] = $result['horasUteisTotais'] == 0 ? 0 : $result['horasDemandasNaoIniciadas'] / $result['horasUteisTotais'];
        $result['percentualHorasEmAndamento'] = $result['horasUteisTotais'] == 0 ? 0 : $result['horasDemandasEmAndamento'] / $result['horasUteisTotais'];
        $result['percentualHorasConcluidas'] = $result['horasUteisTotais'] == 0 ? 0 : $result['horasDemandasConcluidas'] / $result['horasUteisTotais'];
        $result['percentualHorasAvaliadas'] = $result['horasUteisTotais'] == 0 ? 0 : $result['horasDemandasAvaliadas'] / $result['horasUteisTotais'];
        $result['percentualHorasTotaisAlocadas'] = $result['horasUteisTotais'] == 0 ? 0 : $result['horasTotaisAlocadas'] / $result['horasUteisTotais'];
        $result['percentualPlanoDecorrido'] = $result['horasUteisTotais'] == 0 ? 0 : $result['horasUteisDecorridas'] / $result['horasUteisTotais'];

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

    public function dashboards($idsUnidades, $programa_id, $unidadesSubordinadas) {
        if (count($idsUnidades) > 0) {
            $unidadesFilhas = [];
            if ($unidadesSubordinadas) foreach ($idsUnidades as $unidade_id) {
                $unidadesFilhas = array_merge($unidadesFilhas, $this->unidadesFilhas($unidade_id));
            }

            $idsUnidades = array_unique(array_merge($idsUnidades, $unidadesFilhas));
            $result = [];
            foreach ($idsUnidades as $unidade_id) {
                $metadadosUnidade = $this->metadadosUnidade($unidade_id, $programa_id);
                if ($metadadosUnidade['qdePlanosPrograma'] > 0) {
                    array_push($result, [
                        'sigla' => $metadadosUnidade['sigla'],
                        'qdePTAtivos' => $metadadosUnidade['qdePlanosPrograma'],
                        'horasUteisTotaisPTAtivos' => $metadadosUnidade['horasUteisTotais'],
                        'qdeServidores' => $metadadosUnidade['nrServidoresPrograma'],
                        'modalidadesPlanos' => $metadadosUnidade['modalidadesPlanos']
                    ]);
                }
            }
        } else return LogError::newError('Nenhuma Unidade foi fornecida!');
        return $result;
    }

}

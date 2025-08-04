<?php

namespace App\Services;

use App\Exceptions\LogError;
use App\Exceptions\NotFoundException;
use App\Exceptions\ServerException;
use App\Models\ModelBase;
use App\Models\Programa;
use App\Models\Unidade;
use App\Services\RawWhere;
use App\Services\ServiceBase;
use App\Services\Siape\DadosExternosSiape;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use DateTime;
use DateTimeZone;
use SimpleXMLElement;
use Throwable;

class UnidadeService extends ServiceBase
{

    use DadosExternosSiape;

    public function validateStore($data, $unidade, $action)
    {
        #se action insert retornar uma mensagem de erro
        if ($action == "INSERT") {
            throw new ServerException(
                "ValidateUnidade",
                "Não é possível inserir uma unidade. Essa ação é feita somente pela integração com o SIAPE."
            );
        }
        // Validar se houve alteração no campo instituidora, somente usuário com a capacidade MOD_UND_INST pode alterar
        if ($action == "EDIT" && $unidade->instituidora != $data["instituidora"]) {
            if (!parent::loggedUser()->hasPermissionTo("MOD_UND_INST")) {
                throw new ServerException(
                    "ValidateUnidade",
                    "Você não tem permissão para alterar o campo instituidora da unidade."
                );
            }
        }
    }

    /**
     * Um array com os IDs de todas as Unidades pesquisadas, que possuem Planos de Trabalho ativos, e seus respectivos dashboards.
     *
     * @param array $idsUnidades Um array com os ids das unidades das quais se deseja o dashboard
     * @param string $programa_id O id do programa dentro do qual serão procurados os planos de trabalho
     * @param boolean $unidadesSubordinadas Define se devem ser incluídas ou não as unidades subordinadas
     * @return array|LogError
     */
    public function dashboards($idsUnidades, $programa_id, $unidadesSubordinadas): array|LogError
    {
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

    public function hora($idOrUnidade)
    {
        $unidade = gettype($idOrUnidade) == "string" ? Unidade::find($idOrUnidade) : $idOrUnidade;
        $timeZone = $unidade->cidade?->timezone ?? -3;
        $timezone_abbr = timezone_name_from_abbr("", -3600 * abs($timeZone), 0);
        $dateTime = new DateTime('now', new DateTimeZone($timezone_abbr));
        $dateTime->setTimestamp($dateTime->getTimestamp());
        return ServiceBase::toIso8601($dateTime);
    }

    public function inativar($id, $inativo)
    {
        DB::beginTransaction();
        try {
            $unidade = Unidade::find($id);
            if (empty($unidade)) throw new NotFoundException("Unidade não encontrada");
            $unidade->data_inativacao = $inativo ? date("Y-m-d H:i:s") : null;
            $unidade->save();
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function mesmaSigla($entidadeId)
    {
        $repetidos = DB::table('unidades')->select(DB::raw('count(*) as qtd, sigla'))
            ->where('entidade_id', $entidadeId)
            //->whereNull('data_fim')
            ->groupBy('sigla')
            ->having('qtd', '>', 1)
            ->get()->toArray();
        $siglas = array_map(fn($row) => $row->sigla, $repetidos);
        return Unidade::where("entidade_id", $entidadeId)->whereIn("sigla", $siglas)->get();
    }

    /**
     * Retorna um array com os dados totais de uma determinada Área, e os dados individuais de cada uma das suas unidades componentes.
     *
     * @param string $unidade_id O ID de uma Unidade.
     * @param string $programa_id O ID de um Programa.
     * @return array
     */
    public function metadadosArea($unidade_id, $programa_id): array
    {
        $result = [];
        $programa = Programa::find($programa_id);
        $dadosArea = [
            'nomePrograma' => $programa['nome'],
            'normativa' => $programa['normativa'],
            'qdePlanosPrograma' => 0,
            'nrServidoresPrograma' => 0,
            'horasUteisTotais' => 0,
            'horasUteisDecorridas' => 0,
            'horasAtividadesNaoIniciadas' => 0,
            'horasAtividadesEmAndamento' => 0,
            'horasAtividadesConcluidas' => 0,
            //'horasAtividadesAvaliadas' => 0,
            'horasTotaisAlocadas' => 0,
            //'mediaAvaliacoes' => null
        ];
        $idsServidoresPrograma = [];
        $dadosUnidades = [];        // array que armazenará os dados das Unidades-filhas da Área (id, nome, sigla) que possuírem ao menos 1 Plano de Trabalho vinculado ao Programa escolhido
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
                    //'mediaAvaliacoes' => $temp['mediaAvaliacoes'],
                    'nrServidoresPrograma' => $temp['nrServidoresPrograma']
                ]);
                $idsServidoresPrograma = array_merge($idsServidoresPrograma, $temp['idsServidoresPrograma']);
                $dadosArea['qdePlanosPrograma'] += $temp['qdePlanosPrograma'];
                $dadosArea['horasUteisTotais'] += $temp['horasUteisTotais'];
                $dadosArea['horasUteisDecorridas'] += $temp['horasUteisDecorridas'];
                //$dadosArea['qdeDemandasAvaliadas'] += $temp['qdeDemandasAvaliadas'];
                $dadosArea['horasAtividadesNaoIniciadas'] += $temp['horasAtividadesNaoIniciadas'];
                $dadosArea['horasAtividadesEmAndamento'] += $temp['horasAtividadesEmAndamento'];
                $dadosArea['horasAtividadesConcluidas'] += $temp['horasAtividadesConcluidas'];
                //$dadosArea['horasAtividadesAvaliadas'] += $temp['horasAtividadesAvaliadas'];
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
        /*         if ((count(array_filter($dadosUnidades, fn($p) => $p['mediaAvaliacoes'] != null)) == 0)) {
                $dadosArea['mediaAvaliacoes'] = null;
            } else {
                $dadosArea['mediaAvaliacoes'] = $this->utilService->avg(array_map(fn($u) => $u['mediaAvaliacoes'],array_filter($dadosUnidades, fn($u) => $u['mediaAvaliacoes'] != null)));
            } */
        $dadosArea['percentualHorasNaoIniciadas'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasAtividadesNaoIniciadas'] / $dadosArea['horasUteisTotais'];
        $dadosArea['percentualHorasEmAndamento'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasAtividadesEmAndamento'] / $dadosArea['horasUteisTotais'];
        $dadosArea['percentualHorasConcluidas'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasAtividadesConcluidas'] / $dadosArea['horasUteisTotais'];
        //$dadosArea['percentualHorasAvaliadas'] = $dadosArea['horasUteisTotais'] == 0 ? 0 : $dadosArea['horasAtividadesAvaliadas'] / $dadosArea['horasUteisTotais'];
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

    /**
     * Retorna os usuários lotados na unidade
     *
     * @param string $unidade_id O ID de uma Unidade.
     * @return array
     */
    public function lotados($unidadeId): array
    {
        if ($this->hasBuffer("lotados", $unidadeId)) {
            return $this->getBuffer("lotados", $unidadeId);
        }

        $result = Unidade::with("lotados.usuario")
            ->find($unidadeId)?->lotados
            ->map(fn($integrante) => $integrante->usuario)
            ->all() ?? [];

        $usuarios = [];
        foreach ($result as $usuario) {
            if (!is_null($usuario)) {
                $usuarios[] = $usuario;
            }
        }

        return $this->setBuffer("lotados", $unidadeId, $usuarios);
    }


    /**
     * Retorna os dados acerca dos Planos de Trabalho de uma Unidade, associados a um determinado Programa,
     * que se encontrem dentro da vigência.
     *
     * @param string $unidade_id O ID de uma Unidade.
     * @param string $programa_id O ID de um Programa.
     * @return array
     */
    public function metadadosUnidade($unidade_id, $programa_id): array
    {
        $unidade = Unidade::where('id', $unidade_id)->with(['planosTrabalho', 'planosTrabalho.atividades', 'planosTrabalho.tipoModalidade'])->first();
        $metadadosPlanosTrabalho = [];
        foreach ($unidade['planosTrabalho']->toArray() as $plano) {
            if (($plano['programa_id'] == $programa_id) && ($this->calendarioService->between(new DateTime(), $plano['data_inicio'], $plano['data_fim']))) {
                array_push($metadadosPlanosTrabalho, $this->planoService->metadadosPlano($plano['id']));
            };
        }
        $result = [
            "id" => $unidade->id,
            "nome" => $unidade->nome,
            "sigla" => $unidade->sigla,
            "qdePlanosTrabalhoPrograma" => count($metadadosPlanosTrabalho),
            "nrServidoresPrograma" => count(array_unique(array_map(fn($x) => $x["usuario_id"], $metadadosPlanosTrabalho))),
            "idsServidoresPrograma" => array_unique(array_map(fn($x) => $x["usuario_id"], $metadadosPlanosTrabalho)),
            "tiposModalidadesPlanosTrabalho" => array_map(fn($x) => $x["tipoModalidade"], $metadadosPlanosTrabalho),
            "horasUteisTotais" => array_reduce(array_map(fn($m) => $m['horasUteisTotais'], $metadadosPlanosTrabalho), function ($acum, $item) {
                return $acum + $item;
            }, 0),
            "horasAtividadesNaoIniciadas" => array_reduce(array_map(fn($m) => $m['horasAtividadesNaoIniciadas'], $metadadosPlanosTrabalho), function ($acum, $item) {
                return $acum + $item;
            }, 0),
            "horasAtividadesEmAndamento" => array_reduce(array_map(fn($m) => $m['horasAtividadesEmAndamento'], $metadadosPlanosTrabalho), function ($acum, $item) {
                return $acum + $item;
            }, 0),
            "horasAtividadesConcluidas" => array_reduce(array_map(fn($m) => $m['horasAtividadesConcluidas'], $metadadosPlanosTrabalho), function ($acum, $item) {
                return $acum + $item;
            }, 0),
            "horasTotaisAlocadas" => array_reduce(array_map(fn($m) => $m['horasTotaisAlocadas'], $metadadosPlanosTrabalho), function ($acum, $item) {
                return $acum + $item;
            }, 0)
        ];
        $result['percentualHorasNaoIniciadas'] = $result['horasUteisTotais'] == 0 ? 0 : $result['horasAtividadesNaoIniciadas'] / $result['horasUteisTotais'];
        $result['percentualHorasEmAndamento'] = $result['horasUteisTotais'] == 0 ? 0 : $result['horasAtividadesEmAndamento'] / $result['horasUteisTotais'];
        $result['percentualHorasConcluidas'] = $result['horasUteisTotais'] == 0 ? 0 : $result['horasAtividadesConcluidas'] / $result['horasUteisTotais'];
        $result['percentualHorasTotaisAlocadas'] = $result['horasUteisTotais'] == 0 ? 0 : $result['horasTotaisAlocadas'] / $result['horasUteisTotais'];
        $result['percentualPlanoDecorrido'] = $result['horasUteisTotais'] == 0 ? 0 : $result['horasUteisDecorridas'] / $result['horasUteisTotais'];

        /** Neste trecho calcula-se a média das avaliações de toda a Unidade, partindo-se da média das avaliações de cada Plano de Trabalho considerado.
         *  Se um dado Plano de Trabalho possui mediaAvaliacoes = null, é porque ele não possui nenhuma demanda ainda avaliada. Neste caso, a media das avaliações deste Plano
         *  de Trabalho (null) não será utilizada no cálculo da média da Unidade, caso contrário a média seria indevidamente afetada. A função array_map prepara o array com
         * os valores válidos das médias das avaliações dos Planos, que será enviado à função avg para o cálculo da média aritmética.
         */
        /*         $result['mediaAvaliacoes'] = (count(array_filter($metadadosPlanosTrabalho, fn($p) => $p['mediaAvaliacoes'] != null)) == 0) ? null : $this->utilService->avg(array_map(function($p) {
                if ($p['mediaAvaliacoes'] != null) return $p['mediaAvaliacoes'];
            }, $metadadosPlanosTrabalho)); */

        return $result;
    }

    /**
     * Retorna um array com os planos de entregas EM CURSO relativos à unidade recebida como parâmetro.
     * Um Plano de Entregas está EM CURSO quando não foi deletado, nem cancelado, nem arquivado e possui status ATIVO;
     * @param string $unidade_id
     */
    public function planosEntregaEmCurso(string $unidade_id): array
    {
        $unidade = Unidade::where("id", $unidade_id)->with(["planos_entrega"])->get()->first();
        return array_filter($unidade->planosEntrega, fn($x) => $this->planoEntrega->emCurso($x));
    }

    public function proxyQuery($query, &$data)
    {
        $usuario = parent::loggedUser();
        $where = [];
        $subordinadas = true;
        //  unidades-list-grid
        $dataInativacao = $this->extractWhere($data, "data_inativacao");                    //  	data_inativacao (selectable)
        $inativos = empty($dataInativacao) || $dataInativacao[1] == "!=" ? true : false;    //  		!= null		......................	retornar somente as unidades inativas   => $inativos = true


        foreach ($data["where"] as $condition) {                                             //  		== null		......................	retornar somente as unidades ativas     => $inativos = false
            if (is_array($condition) && $condition[0] == "subordinadas") {                   //  	inativos (not selectable)
                $subordinadas = $condition[2];                                              //  		== true		......................	retornar unidades ativas e inativas     => $inativos = true
            } else if (is_array($condition) && $condition[0] == "inativos") {                //  		== false	......................	retornar somente as unidades ativas     => $inativos = false
                $inativos = $condition[2];
            } else {
                array_push($where, $condition);
            }
        }

        if (!empty($dataInativacao) || empty($inativos)) array_push($where, ["data_inativacao", $inativos ? "!=" : "==", null]);

        if (!$usuario->hasPermissionTo("MOD_UND_TUDO")) {
            $areasTrabalhoWhere = $this->usuarioService->areasTrabalhoWhere($subordinadas, null, "unidades");
            $where[] = new RawWhere("($areasTrabalhoWhere)", []);
        }

        // utilize para exibir apenas a unidades a partir de um determinado pai
        $unidade_pai = $this->extractWhere($data, "unidade_pai");
        if (isset($unidade_pai[2])) {
            $subordinadasIds = $this->subordinadas($unidade_pai[2])->pluck('id')->toArray();
            $unidadeIds = array_merge([$unidade_pai[2]], $subordinadasIds);
            $where[] = ['informal', '==', 0];
            $where[] = ['id', 'in', $unidadeIds];

            // remove o unidade_pai das condições, uma vez que a coluna não existe
            $where = array_values(array_filter($where, function ($item) {
                return !is_array($item) || ($item[0] !== 'unidade_pai');
            }));
        }

        $data["where"] = $where;
        return $data;
    }

    public function proxySearch($query, &$data, &$text)
    {
        $data["where"][] = ["subordinadas", "==", true];
        return $this->proxyQuery($query, $data);
    }

    public function proxyStore($data, $unidade, $action)
    {
        $unidade = Unidade::find($data["id"]);
        $pai = Unidade::find($data["unidade_pai_id"]);
        $data["path"] = empty($pai) ? null : $pai->path . "/" . $pai->id;
        if (!empty($unidade)) { // Depois de atualizar o campo 'path' da unidade, atualiza os campos 'path' de todas suas unidades-filhas
            $oldPath = $unidade->path . "/" . $unidade->id . "/";
            $newPath = $data["path"] . "/" . $unidade->id . "/";
            Unidade::where('path', 'like', $oldPath . "%")
                ->update(['path' => DB::raw(sprintf("CONCAT('%s', SUBSTR(path, %d))", $newPath, strlen($newPath)))]);
        }
        /* Armazena as informações que serão necessárias no extraStore */
        $this->buffer["integrantes"] = $this->UtilService->getNested($data, "integrantes") ?? [];
        return $data;
    }

    public function extraStore(&$entity, $unidade, $action)
    {
        foreach ($this->buffer["integrantes"] as $integrante) {
            $integrante["unidade_id"] = $entity->id;
        }
        $this->UnidadeIntegranteService->salvarIntegrantes($this->buffer["integrantes"]);
    }

    /**
     * Retorna um array com os IDs de todas as suas unidades-filhas, ou seja,
     * de todas as Unidades que estão hierarquicamente organizadas abaixo da Unidade-mãe.
     *
     * @param string $unidade_id O ID de uma Unidade-mãe.
     * @return array
     */
    public function unidadesFilhas($unidadeId): array
    {
        $path = DB::table('unidades')->select('path')->where('id', $unidadeId)->first()->path . '/' . $unidadeId;
        return array_map(fn($x) => $x->id, DB::table('unidades')->select('id')->where('path', 'like', $path)->orWhere('path', 'like', $path . '/%')->get()->toArray());
    }

    /**
     * @param string | null $unidadeId Unidade de refêrneica (caso null, então irá retornar somente a unidade raiz)
     */
    function hierarquia($unidadeId)
    {
        $unidades = [];
        $unidades_irmaos = [];
        $irmaos = [];
        $unidade = null;

        if (!empty($unidadeId)) {
            $unidade = Unidade::find($unidadeId);
            if ($unidade) {
                $unidades = Unidade::whereIn("id", array_filter(explode('/', $unidade->path), fn($x) => $x != ""))->get()->toArray();
                $this->obterIrmaosRecursivamente($unidade, $irmaos);
            }
        } else {
            $unidade = Unidade::where('unidade_pai_id', null)->first();
            if ($unidade) {
                $unidades = Unidade::whereIn("id", array_filter(explode('/', $unidade->path), fn($x) => $x != ""))->get();
                $unidades = $unidades->toArray();
                $unidades[] = $unidade;
            }
        }
        $mergedArray = array_merge($unidades, $irmaos, $unidades_irmaos, [$unidade]);

        return $mergedArray;
    }

    function filhas($unidadeId)
    {
        return Unidade::where("unidade_pai_id", $unidadeId)->get()->toArray();
    }

    public function subordinadas($id)
    {

        $unidade = Unidade::findOrFail($id);

        if (!$unidade) {
            throw new NotFoundException("Unidade não encontrada");
        }

        // Obtém todas as unidades subordinadas de forma recursiva
        $subordinadas = collect(); // Inicializa uma Collection vazia
        $filhas = Unidade::where('unidade_pai_id', $id)->get(); // Obtém as unidades filhas diretas

        foreach ($filhas as $filha) {
            $subordinadas->push($filha); // Adiciona a unidade filha à lista
            $subordinadas = $subordinadas->merge($this->buscarSubordinadasRecursivamente($filha)); // Busca subordinadas recursivamente
        }

        return $subordinadas->values(); // Retorna a lista plana
    }

    /**
     * Método auxiliar para buscar subordinadas recursivamente.
     */
    private function buscarSubordinadasRecursivamente($unidade)
    {
        $subordinadas = collect();
        $filhas = Unidade::where('unidade_pai_id', $unidade->id)->get();

        foreach ($filhas as $filha) {
            $subordinadas->push($filha);
            $subordinadas = $subordinadas->merge($this->buscarSubordinadasRecursivamente($filha));
        }

        return $subordinadas;
    }


    function obterIrmaosRecursivamente($unidade, &$irmaos)
    {
        $irmaosDaUnidade = Unidade::where("unidade_pai_id", $unidade->unidade_pai_id)
            ->where('id', '!=', $unidade->id)
            ->get()
            ->toArray();

        $irmaos = array_merge($irmaos, $irmaosDaUnidade);

        // Chamada recursiva para obter os irmãos das unidades superiores
        $unidadePai = Unidade::find($unidade->unidade_pai_id);

        if ($unidadePai) {
            $this->obterIrmaosRecursivamente($unidadePai, $irmaos);
        }
    }

    public function unificar($correspondencias, $exclui)
    {
        DB::beginTransaction();
        try {
            $constraints = $this->foreigns("unidades");
            foreach ($correspondencias as $dePara) {
                $de = $dePara["unidade_origem_id"];
                $para = $dePara["unidade_destino_id"];
                foreach ($constraints as $contraint) {
                    $changes = DB::select("SELECT id, {$contraint->COLUMN_NAME} FROM {$contraint->TABLE_NAME} WHERE {$contraint->COLUMN_NAME} = :de", [":de" => $de]);
                    DB::update("UPDATE {$contraint->TABLE_NAME} SET {$contraint->COLUMN_NAME} = :para WHERE {$contraint->COLUMN_NAME} = :de", [":de" => $de, ":para" => $para]);
                    /* Registra o log das mudanças */
                    foreach ($changes as $change) {
                        $delta = [];
                        $delta[$contraint->COLUMN_NAME] = $de;
                        ModelBase::customLogChange($contraint->TABLE_NAME, $change->id, "EDIT", $delta);
                    }
                }
                if ($exclui) $this->destroy($de, false);
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    /**
     * Retorna um array com os ids das unidades que compõem a linha hierárquica ascendente da unidade recebida como parâmetro.
     * Caso a unidade não tenha um path de hierarquia, retorna um array com a própria unidade consultada.
     * @param string $unidade_id
     * @return array
     */
    public function linhaAscendente($unidade_id): array
    {
        $path = Unidade::find($unidade_id)->path;
        if (!empty($path)) {
            return array_filter(explode('/', $path), fn($x) => $x != "");
        } else {
            return [$unidade_id];
        }
    }

    public function lookupTodasUnidades(): array
    {
        return Unidade::all()->map(fn($u) => ["key" => $u->id, "value" => $u->sigla])->toArray();
    }

    /**
     * Retorna o ID das unidades que possuem algum plano de entregas no status ATIVO
     */
    public function unidadesEmPgd(): array
    {
        // (RN_PENT_G) Uma vez homologado um Plano de Entregas, a Unidade do plano está em PGD;
        return Unidade::with(['planosEntrega' => function ($query) {
            $query->where('status', 'ATIVO');
        }])->whereHas('planosEntrega')->get()->map(fn($u) => $u->id)->toArray();
    }

    /**
     * Retorna os gestores da unidade superior a unidade informada
     */
    public function gestoresUnidadeSuperior($unidadeId)
    {
        if ($this->hasBuffer("gestoresUnidadeSuperior", $unidadeId)) {
            return $this->getBuffer("gestoresUnidadeSuperior", $unidadeId);
        } else {
            $unidadeSup = Unidade::find($unidadeId)?->unidadePai;
            return $this->setBuffer("gestoresUnidadeSuperior", $unidadeId, [
                "gestor" => $unidadeSup?->gestor?->usuario,
                "gestoresSubstitutos" => $unidadeSup?->gestoresSubstitutos->map(fn($x) => $x->usuario)->toArray() ?? [],
                "gestoresDelegados" => $unidadeSup?->gestoresDelegados->map(fn($x) => $x->usuario)->toArray() ?? []
            ]);
        }
    }

    /**
     * Retorna um array com os usuários que são gestores (titular, substitutos e delegados) da unidade recebida como parâmetro.
     * @param string $unidade_id
     * @return array
     */
    public function gestoresUnidade($unidadeId): array
    {
        $result = [];
        if ($this->hasBuffer("gestoresUnidade", $unidadeId)) {
            $result = $this->getBuffer("gestoresUnidade", $unidadeId);
        } else {
            if (!empty($unidadeId)) $unidade = Unidade::find($unidadeId);
            if (!empty($unidade)) {
                $result = $unidade->gestoresSubstitutos->map(fn($x) => $x->usuario)->toArray();
                if ($unidade->gestor) $result[] = $unidade->gestor->usuario;
                array_merge($result, $unidade->gestoresDelegados->map(fn($x) => $x->usuario)->toArray());
            }
            $this->setBuffer("gestoresUnidade", $unidadeId, $result);
        }
        return $result;
    }
    /**
     * Retorna os gestores que podem assinar o TCR em caso de usuário informado ser gestor.
     * @param Unidade $unidade
     * @param int $usuarioId
     * @param int $participanteId
     * @return array
     */
    public function getGestoresPorUnidade($unidade, $usuarioId, $participanteId): array
    {
        if (!$unidade) {
            return []; // garante que não será null
        }

        $atribuicoes = $this->usuarioService->atribuicoesGestor($unidade->id, $usuarioId);

        if ($atribuicoes["gestor"]) {
            return array_values(array_filter([
                $unidade->unidadePai?->gestor?->usuario_id,
                ...($unidade->unidadePai?->gestoresSubstitutos?->pluck('usuario_id')->toArray() ?? [])
            ]));
        }

        if ($atribuicoes["gestorSubstituto"]) {
            return array_values(array_filter(array_merge(
                [$unidade->gestor?->usuario_id, $unidade->unidadePai?->gestor?->usuario_id],
                $unidade->unidadePai?->gestoresSubstitutos?->pluck('usuario_id')->toArray() ?? [],
                $unidade->gestoresSubstitutos?->reject(fn($g) => $g->usuario_id == $participanteId)->pluck('usuario_id')->toArray() ?? []
            )));
        }

        if ($atribuicoes["gestorDelegado"]) {
            return array_values(array_filter(array_merge(
                [$unidade->gestor?->usuario_id],
                $unidade->gestoresSubstitutos?->pluck('usuario_id')->toArray() ?? []
            )));
        }

        // Se o usuário não é gestor, substituto ou delegado, retorna somente o gestor titular e os substitutos

        $gestores = array_values(array_filter(array_merge(
            [$unidade->gestor?->usuario_id],
            $unidade->gestoresSubstitutos?->pluck('usuario_id')->toArray() ?? []
        )));

        if (count($gestores) > 0) {
            return $gestores;
        } else {
            // Se não houver gestores, retorna o gestor da unidade superior
            return array_values(array_filter([
                $unidade->unidadePai?->gestor?->usuario_id,
                ...($unidade->unidadePai?->gestoresSubstitutos?->pluck('usuario_id')->toArray() ?? [])
            ]));
        }
    }


    //
    /*
      (*) vide no front end, unidade-list-grid.component.ts
      unidades-list-grid
          data_inativacao (selectable)
              != null		......................	retornar somente as unidades inativas
              == null		......................	retornar somente as unidades ativas
          inativos (not selectable)
              == true		......................	retornar unidades ativas e inativas
              == false	......................	retornar somente as unidades ativas
      */

    public function consultaUnidadeSiape(string $unidadecodigoSiape): array
{
    $retornoXml = $this->buscaDadosUnidade($unidadecodigoSiape);

    $retornoXml->registerXPathNamespace('soap', 'http://schemas.xmlsoap.org/soap/envelope/');
    $retornoXml->registerXPathNamespace('ns1',  'http://servico.wssiapenet');

    $resultado = $retornoXml->xpath('//soap:Body/ns1:dadosUorgResponse/out');

    if (!isset($resultado[0]) || !($resultado[0] instanceof SimpleXMLElement)) {
        Log::error("Não foi possível encontrar <out> em dadosUorgResponse");
        return [];
    }

    /** @var SimpleXMLElement $out */
    $out = $resultado[0];

    $retornoArray = simpleXmlElementToArrayComNamespace($out);

    // Log::info('--- XML bruto de <out> ---');
    // Log::info($out->asXML());

    // Log::info('--- Array convertido de <out> --- ' . json_encode($retornoArray, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

    return $retornoArray;
}

    public function consultaUnidadeSiapeXml(string $unidadecodigoSiape): SimpleXMLElement
    {

        return $this->buscaDadosUnidade($unidadecodigoSiape);

    }
}

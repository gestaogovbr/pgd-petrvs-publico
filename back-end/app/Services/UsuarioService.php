<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Models\Demanda;
use App\Models\Plano;
use App\Models\Unidade;
use App\Models\Lotacao;
use App\Models\TipoAvaliacao;
use App\Models\DemandaEntrega;
use App\Services\ServiceBase;
use App\Services\PlanoService;
use App\Services\Util;
use App\Services\DemandaService;
use App\Services\LotacaoService;
use App\Services\RawWhere;
use App\Services\UtilService;
use App\Traits\UseDataFim;
use Database\Seeders\UsuarioSeeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Iterator;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Throwable;

class UsuarioService extends ServiceBase
{
    use UseDataFim;

    const LOGIN_GOOGLE = "GOOGLE";
    const LOGIN_MICROSOFT = "AZURE";
    const LOGIN_FIREBASE = "FIREBASE";

    public function proxyStore(&$data, $unidade, $action) {
        $data['cpf'] = $this->UtilService->onlyNumbers($data['cpf']);
        $data['telefone'] = $this->UtilService->onlyNumbers($data['telefone']);
        /* Faz as atualizações das lotações de forma segura 
        if($action != ServiceBase::ACTION_INSERT) {
            foreach($data['lotacoes'] as $lotacao) {
                if($lotacao["status"] == "DELETE") {
                    $this->LotacaoService->destroy($lotacao["id"], false);
                } else {
                    $this->LotacaoService->save($lotacao);
                }
            }
            $data['lotacoes'] = []; /* avoid fillablechanges
        } else if(empty($data['lotacoes'])) {
            throw new ServerException("ValidateUsuario", "Obrigatório existir ao menos uma lotação para o usuário");
        }*/
        return $data;
    }

    public function extraStore($entity, $unidade, $action) {
        $this->LotacaoService->checksLotacoes($entity->id);
    }

    public function proxySearch($query, &$data, &$text) {
        $data["where"][] = ["subordinadas", "==", true];
        return $this->proxyQuery($query, $data);
        /*        $where = [];
        $unidade_id = null;
        $vinculadas = false;
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "unidade_id") {
                $unidade_id = $condition[2];
            } else if(is_array($condition) && $condition[0] == "subordinadas") {
                $vinculadas = $condition[2];
            } else {
                array_push($where, $condition);
            }
        }
        $unidades_ids = [];
        if(!empty($unidade_id)) {
            array_push($unidades_ids, $unidade_id);
        } else {
            $usuario = parent::loggedUser();
            foreach($usuario->lotacoes as $lotacao) {
                array_push($unidades_ids, $lotacao->unidade_id);
            }
        }
        if($vinculadas) {
            $origens = UnidadeOrigemAtividade::whereIn("unidade_id", $unidades_ids)->whereNotIn("unidade_origem_atividade_id", $unidades_ids)->get();
            $unidades_ids = array_merge($unidades_ids, array_map(fn($origem) => $origem->unidade_origem_atividade_id, $origens->all()));
        }
        array_push($where, ["unidade_id", "in", $unidades_ids]);
        $data["where"] = $where;
        return $data;*/
    }

    public function atualizarFotoPerfil($tipo, &$usuario, $url) {
        $mudou = ($tipo == UsuarioService::LOGIN_GOOGLE ? $usuario->foto_google != $url :
                 ($tipo == UsuarioService::LOGIN_MICROSOFT ? $usuario->foto_microsoft != $url :
                 ($tipo == UsuarioService::LOGIN_FIREBASE ? $usuario->foto_firebase != $url : false)));
        if(!empty($url) && !empty($usuario) && $mudou) {
            $downloaded = $this->downloadImgProfile($url, "usuarios/" . $usuario->id);
            if(!empty($downloaded)) {
                $usuario->foto_perfil = $downloaded;
                switch($tipo) {
                    case UsuarioService::LOGIN_GOOGLE: $usuario->foto_google = $url; break;
                    case UsuarioService::LOGIN_MICROSOFT: $usuario->foto_microsoft = $url; break;
                    case UsuarioService::LOGIN_FIREBASE: $usuario->foto_firebase = $url; break;
                }
                $usuario->save();
            }
        }
    }

    public function downloadImgProfile($url, $path) {
        if(!Storage::exists($path)) {
            Storage::makeDirectory($path, 0755, true);
        }
        try {
            $contents = file_get_contents($url);
        } catch(Throwable $e) {}
        if(!empty($contents)) {
            $name = $path . "/profile_" . md5($contents) . ".jpg";
            if(!Storage::exists($name)) Storage::put($name, $contents);
            return $name;
        } else {
            return "";
        }
    }

    public function hasLotacao($id, $usuario = null, $subordinadas = true, $dataRef = null) {
        return Unidade::where("id", $id)->whereRaw($this->lotacoesWhere($subordinadas, $usuario, "", false, $dataRef))->count() > 0;
        /*Usuario::where("id", $usuario->id)->whereHas('lotacoes', function (Builder $query) use ($id) {
            $query->where('id', $id);
        })->count() > 0;*/
    }

    public function lotacoesWhere($subordinadas, $usuario = null, $prefix = "", $deleted = false, $dataRef = null) {
        $where = [];
        $prefix = empty($prefix) ? "" : $prefix . ".";
        $usuario = $usuario ?? parent::loggedUser();
        foreach($usuario->lotacoes as $lotacao) {
            if(($deleted || empty($lotacao->data_fim)) && !UtilService::greaterThanOrIqual($dataRef, $lotacao->data_fim)) {
                $where[] = $prefix . "id = '" . $lotacao->unidade_id . "'";
                if($subordinadas) $where[] = $prefix . "path like '%" . $lotacao->unidade_id . "%'";
            }
        }
        $result = implode(" OR ", $where);
        return empty($result) ? "false" : "(" . $result . ")";
    }

    public function proxyQuery($query, &$data) {
        $usuario = parent::loggedUser();
        $where = [];
        $subordinadas = true;
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "lotacao") {
                array_push($where, new RawWhere("EXISTS(SELECT id FROM lotacoes where_lotacoes WHERE where_lotacoes.usuario_id = usuarios.id AND where_lotacoes.unidade_id = ?)", [$condition[2]]));
            } else if(is_array($condition) && $condition[0] == "subordinadas") {
                $subordinadas = $condition[2];
            } else {
                array_push($where, $condition);
            }
        }
        if(!$usuario->hasPermissionTo("MOD_USER_TUDO")) {
            $lotacoesWhere = $this->lotacoesWhere($subordinadas, null, "where_unidades");
            array_push($where, new RawWhere("EXISTS(SELECT where_lotacoes.id FROM lotacoes where_lotacoes LEFT JOIN unidades where_unidades ON (where_unidades.id = where_lotacoes.unidade_id) WHERE where_lotacoes.usuario_id = usuarios.id AND ($lotacoesWhere))", []));
        }
        $data["where"] = $where;
        return $data;
    }

    public function dashboard($data_inicial, $data_final, $usuario_id) {
        $result = [];
        $planosAtivos = $this->PlanoService->planosAtivosPorData($data_inicial, $data_final, $usuario_id);
        $planos_ids = $planosAtivos->map(function($plano){return $plano->id;});
        $notas_validas = TipoAvaliacao::where('aceita_entrega', true)->get()->pluck('nota_atribuida');
  
        $media_avaliacao = Demanda::doUsuario($usuario_id)->dosPlanos($planos_ids)->avaliadas()->with(['avaliacao'])->get()->avg(function($demanda){
            return $demanda["avaliacao"]["nota_atribuida"];
        });
        
        foreach ($planosAtivos as $plano) {
            $total_consolidadas = Demanda::doUsuario($usuario_id)->dosPlanos([$plano->id])->avaliadas()->with(['avaliacao'])->get()->sum(function($demanda) use ($notas_validas){
                return in_array($demanda["avaliacao"]["nota_atribuida"], $notas_validas->all()) ? $demanda['tempo_pactuado'] : 0;
            });

            $horas_alocadas = $plano->demandas->sum('tempo_pactuado');
            $result['planos'][] = [
                'data_inicio_vigencia' => $plano['data_inicio_vigencia'],
                'data_fim_vigencia' => $plano['data_fim_vigencia'],
                'total_horas' => $plano['tempo_total'],
                'horas_alocadas' => $horas_alocadas,
                'horas_consolidadas' => $total_consolidadas,
                'progresso' => $total_consolidadas > 0 ? round((float)(($total_consolidadas / $plano['tempo_total']) * 100), 2) : 0
            ];           
        }

        $avaliadas = Demanda::doUsuario($usuario_id)->dosPlanos($planos_ids)->avaliadas()->get();
        $nao_iniciadas = Demanda::doUsuario($usuario_id)->dosPlanos($planos_ids)->naoIniciadas()->get();
        $concluidas = Demanda::doUsuario($usuario_id)->dosPlanos($planos_ids)->concluidas()->get();
        $nao_concluidas = Demanda::doUsuario($usuario_id)->dosPlanos($planos_ids)->naoConcluidas()->get();
        $atrasadas = Demanda::doUsuario($usuario_id)->dosPlanos($planos_ids)->atrasadas()->get();

        $result['demandas'] = [
            'avaliadas' => $avaliadas->count(),
            'horas_avalidas' => $avaliadas->sum('tempo_pactuado'),
            'nao_iniciadas' => $nao_iniciadas->count(),
            'horas_nao_iniciadas' => $nao_iniciadas->sum('tempo_pactuado'),
            'concluidas' => $concluidas->count(),
            'horas_concluidas' => $concluidas->sum('tempo_pactuado'),
            'nao_concluidas' => $nao_concluidas->count(),
            'horas_nao_concluidas' => $nao_concluidas->sum('tempo_pactuado'),
            'atrasadas' => $atrasadas->count(),
            'horas_atrasadas' => $atrasadas->sum('tempo_pactuado'),
            'media_avaliacoes' => $media_avaliacao,
            'total_demandas' => Demanda::doUsuario($usuario_id)->dosPlanos($planos_ids)->get()->count()
        ];
        $result['horas_afastamentos'] = 0;

        return $result;
    }

    /**
     * dashboard
     *
     * @param  mixed $data_inicial: Data inicial dos planos de trabalho
     * @param  mixed $data_final: Data final dos planos de trabalho
     * @param  mixed $usuario_id: ID do usuário do qual se deseja as informações para o dashboard
     * @return array: array contendo todas as informações para o front-end do usuário
     */
    public function dashboard_gestor($data_inicial, $data_final, $unidade_ids) {
        $result = [];
        // $lotacoes = Lotacao::whereIn("unidade_id", $unidade_ids)->with(['usuario'])->get();

        $usuarios = Usuario::select('usuarios.*')
                    ->distinct()
                    ->join('lotacoes', 'lotacoes.usuario_id', '=', 'usuarios.id')
                    ->whereIn('lotacoes.unidade_id', $unidade_ids)->get();

        foreach ($usuarios as $usuario) {
            $planosAtivos = $this->PlanoService->planosAtivosPorData($data_inicial, $data_final, $usuario->id);
            $planos_ids = $planosAtivos->map(function($plano){return $plano->id;});
            $notas_validas = TipoAvaliacao::where('aceita_entrega', true)->get()->pluck('nota_atribuida');
    
            $total_consolidadas = Demanda::doUsuario($usuario->id)->dosPlanos($planos_ids)->avaliadas()->with(['avaliacao'])->get()->sum(function($demanda) use ($notas_validas){
                return in_array($demanda["avaliacao"]["nota_atribuida"], $notas_validas->all()) ? $demanda['tempo_pactuado'] : 0;
            });

            $media_avaliacao = Demanda::doUsuario($usuario->id)->dosPlanos($planos_ids)->avaliadas()->with(['avaliacao'])->get()->avg(function($demanda){
                return $demanda["avaliacao"]["nota_atribuida"];
            });

            $planos = [];

            foreach ($planosAtivos as $plano) {
                $horas_alocadas = $plano->demandas->sum('tempo_pactuado');
                $planos[] = [
                    'data_inicio_vigencia' => $plano['data_inicio_vigencia'],
                    'data_fim_vigencia' => $plano['data_fim_vigencia'],
                    'total_horas' => $plano['tempo_total'],
                    'horas_alocadas' => $horas_alocadas,
                    'horas_consolidadas' => $total_consolidadas,
                    'progresso' => $total_consolidadas > 0 ? round((float)(($total_consolidadas / $plano['tempo_total']) * 100), 2) : 0
                ];           
            }

            
            $result['usuarios'][] = [
                'nome' => $usuario->nome,
                'foto' => $usuario->foto_perfil,
                'planos' => $planos
            ];

            
        }

        return $result;
    }
    /**
     * dashboard gestor
     *
     * @param  mixed $data_inicial: Data inicial dos planos de trabalho
     * @param  mixed $data_final: Data final dos planos de trabalho
     * @param  mixed $unidade_ids: Unidades que o usuário gerencia
     * @return array: array contendo todas as informações dos planos de trabalho de cada usuário da unidade (front-end do gestor)
     */


    public function old_dashboard($usuario_id): array {
        $planosAtivos = $this->PlanoService->planosAtivos($usuario_id);
        $planos_ids = [];
        $result = [
            "total_demandas" => 0,
            "produtividade" => 0,
            "demandas_totais_atrasadas" => 0
        ];
        foreach($planosAtivos as $plano) {
            array_push($planos_ids, $plano->id);
        }
        // A variável $demandas armazena todas as demandas de todos os planos ativos do usuário
        $demandas = Demanda::where("usuario_id", $usuario_id)->whereIn("plano_id", $planos_ids)->get();
        $demandasTotaisNaoIniciadas = Demanda::where("usuario_id", $usuario_id)->whereNull('data_inicio')->get();
        $demandasTotaisNaoConcluidas = Demanda::where("usuario_id", $usuario_id)->whereNotNull('data_inicio')->whereNull('data_entrega')->get();
        $demandasTotaisConcluidas = Demanda::where("usuario_id", $usuario_id)->whereNotNull('data_entrega')->get();
        $demandasTotaisAvaliadas = Demanda::where("usuario_id", $usuario_id)->whereNotNull('avaliacao_id')->with(['avaliacao'])->get();

        $tarefasTotaisNaoConcluidas = DemandaEntrega::where("usuario_id", $usuario_id)->where('concluido', 0)->get();

        $result["total_demandas"] = $demandas->count();

        foreach($demandasTotaisNaoConcluidas as $demanda) {
            $metadados = $this->DemandaService->metadados($demanda);
            $result["demandas_totais_atrasadas"] += $metadados["atrasado"] ? 1 : 0;
        }

        $result["demandas_totais_nao_iniciadas"] = $demandasTotaisNaoIniciadas->count();
        $result["demandas_totais_nao_concluidas"] = $demandasTotaisNaoConcluidas->count();
        $result["demandas_totais_concluidas"] = $demandasTotaisConcluidas->count();
        $result["demandas_totais_avaliadas"] = $demandasTotaisAvaliadas->count();
        $result["media_avaliacoes"] = (count($demandasTotaisAvaliadas) == 0) ? null : $this->utilService->avg(array_map(function($d) {
                return $d["avaliacao"]["nota_atribuida"];
            }, $demandasTotaisAvaliadas->toArray()));


        $result["tarefas_totais_nao_concluidas"] = $tarefasTotaisNaoConcluidas->count();

        return $result;
    }

    public function planosPorPeriodo($usuario_id, $inicioPeriodo = null, $fimPeriodo = null){
        $result = [];
        $planos = Plano::where("usuario_id", $usuario_id)->with(['demandas', 'unidade', 'tipoModalidade'])->get();
        if ($inicioPeriodo == null || $fimPeriodo == null) {
            $result = $planos;
        } else {
            foreach ($planos as $plano) {
                if (CalendarioService::between($plano['data_inicio_vigencia'], $inicioPeriodo, $fimPeriodo) || CalendarioService::between($plano['data_fim_vigencia'], $inicioPeriodo, $fimPeriodo)) array_push($result, $plano);
            }
        }
        return $result;
    }

    /**
     * Este método impede que um usuário seja inserido com e-mail/CPF/Matrícula já existentes no Banco de Dados, bem como
     * impede também a inserção de um usuário com o perfil de Desenvolvedor. Usuários com esse perfil só podem ser inseridos
     * através do próprio código da aplicação.
     */
    public function validateStore($data, $unidade, $action) {
        if($action == ServiceBase::ACTION_INSERT) {
            if(empty($data["email"])) throw new Exception("O campo de e-mail é obrigatório");
            if(empty($data["cpf"])) throw new Exception("O campo de CPF é obrigatório");
            $alreadyHas = Usuario::where("id", "!=", $data["id"])->where("email", $data["email"])->orWhere("cpf", $data["cpf"])->first();
            if(!empty($alreadyHas)) {
                if(!empty($alreadyHas->data_fim)) { /* Caso o usuário exista, mas esteja excluído, reabilita o usuário */
                    $this->LotacaoService->removerLotacoesUsuario($alreadyHas);
                    $alreadyHas->data_fim = null;
                    return $alreadyHas;
                } else {
                    throw new Exception("Já existe um usuário com mesmo e-mail ou CPF no sistema");
                }
            }
            if(($data["perfil_id"] == $this->developerId) && (!$this->isLoggedUserADeveloper())) throw new Exception("Tentativa de inserir um usuário com o perfil de Desenvolvedor");
        }
    }

    /**
     * Este método impede que um usuário, com perfil diferente de Desenvolvedor, tenha seu perfil alterado para este último.
     */
    public function proxyUpdate($data, $unidade){
        $perfilAtual = $this->getById($data["id"])["perfil_id"];
        if((($perfilAtual == $this->developerId) || ($data["perfil_id"] != $this->developerId)) && (!$this->isLoggedUserADeveloper())) throw new Exception("Tentativa de alterar o perfil de/para um Desenvolvedor");
    }

}
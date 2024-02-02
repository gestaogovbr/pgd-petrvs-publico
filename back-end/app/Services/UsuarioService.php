<?php

namespace App\Services;

use App\Models\Usuario;
use App\Models\Unidade;
use App\Models\Programa;
use App\Models\Atividade;
use App\Models\PlanoTrabalho;
use App\Services\ServiceBase;
use App\Services\RawWhere;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Builder;
use Exception;
use Throwable;

class UsuarioService extends ServiceBase
{
    const LOGIN_GOOGLE = "GOOGLE";
    const LOGIN_MICROSOFT = "AZURE";
    const LOGIN_FIREBASE = "FIREBASE";

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

/*     public function dashboard($data_inicial, $data_final, $usuario_id) {
        $result = [];
        $planosTrabalhoAtivos = $this->planoTrabalhoService->planosAtivosPorData($data_inicial, $data_final, $usuario_id);
        $planos_ids = $planosTrabalhoAtivos->map(function($plano){return $plano->id;});
        foreach ($planosTrabalhoAtivos as $plano) {
            $result['planos'][] = [
                'data_inicio' => $plano['data_inicio'],
                'data_fim' => $plano['data_fim'],
                'total_horas' => $plano['tempo_total'],
            ];           
        }
        $nao_iniciadas = Atividade::doUsuario($usuario_id)->dosPlanosTrabalho($planos_ids)->naoIniciadas()->get();
        $concluidas = Atividade::doUsuario($usuario_id)->dosPlanosTrabalho($planos_ids)->concluidas()->get();
        $nao_concluidas = Atividade::doUsuario($usuario_id)->dosPlanosTrabalho($planos_ids)->naoConcluidas()->get();
        $atrasadas = Atividade::doUsuario($usuario_id)->dosPlanosTrabalho($planos_ids)->atrasadas()->get();
        $result['atividades'] = [
            'nao_iniciadas' => $nao_iniciadas->count(),
            'horas_nao_iniciadas' => $nao_iniciadas->sum('tempo_pactuado'),
            'concluidas' => $concluidas->count(),
            'horas_concluidas' => $concluidas->sum('tempo_pactuado'),
            'nao_concluidas' => $nao_concluidas->count(),
            'horas_nao_concluidas' => $nao_concluidas->sum('tempo_pactuado'),
            'atrasadas' => $atrasadas->count(),
            'horas_atrasadas' => $atrasadas->sum('tempo_pactuado'),
            'total_atividades' => Atividade::doUsuario($usuario_id)->dosPlanosTrabalho($planos_ids)->get()->count()
        ];
        $result['horas_afastamentos'] = 0;
        return $result;
    } */

    /**
     * dashboard
     *
     * @param  mixed $data_inicial: Data inicial dos planos de trabalho
     * @param  mixed $data_final: Data final dos planos de trabalho
     * @param  mixed $usuario_id: ID do usuário do qual se deseja as informações para o dashboard
     * @return array: array contendo todas as informações para o front-end do usuário
     */
/*     public function dashboardGestor($data_inicial, $data_final, $unidade_ids) {
        $result = [];
        $usuarios = [];
        foreach(Unidade::whereIn('id',$unidade_ids)->get() as $u) { array_push($usuarios, ...$u->integrantes); }
        foreach ($usuarios as $usuario) {
            $planosTrabalhoAtivos = $this->planoTrabalhoService->planosAtivosPorData($data_inicial, $data_final, $usuario->id);
            $planos_ids = $planosTrabalhoAtivos->map(function($plano){return $plano->id;});
            $total_consolidadas = Atividade::doUsuario($usuario->id)->dosPlanosTrabalho($planos_ids)->concluidas()->get()->sum(['tempo_planejado']);
            $planos = [];
            foreach ($planosTrabalhoAtivos as $plano) {
                $planos[] = [
                    'data_inicio' => $plano['data_inicio'],
                    'data_fim' => $plano['data_fim'],
                    'total_horas' => $plano['tempo_total'],
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
    } */

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

    public function extraStore($entity, $unidade, $action) {
        foreach($this->buffer["integrantes"] as $integrante) {
            $integrante["usuario_id"] = $entity->id;
        }        
        $this->UnidadeIntegranteService->salvarIntegrantes($this->buffer["integrantes"]);
        if($action != ServiceBase::ACTION_INSERT) $this->unidadeIntegranteAtribuicaoService->checkLotacoes($entity->id);
    }

    public function hasLotacao($id, $usuario = null, $subordinadas = true) {
        return Unidade::where("id", $id)->whereRaw($this->areasTrabalhoWhere($subordinadas, $usuario, ""))->count() > 0;
    }

    /**
     * Informa se o usuário logado é gestor(titular ou substituto) da unidade recebida como parâmetro.
     * @param string $unidade_id 
     */
    public function isGestorUnidade(string $unidade_id): bool {
        return $this->isIntegrante('GESTOR',$unidade_id) || $this->isIntegrante('GESTOR_SUBSTITUTO',$unidade_id) || $this->isIntegrante('GESTOR_DELEGADO',$unidade_id);
    }

    /**
     * Informa se o usuário logado é participante do plano de trabalho recebido como parâmetro.
     * @param string $unidade_id 
     */
    public function isParticipante($planoTrabalho){
        return $planoTrabalho['usuario_id'] == self::loggedUser()->id;
    }

    /**
     * Recebe os IDs de um usuário e de um PGD, e informa se o usuário é participante habilitado do Programa.
     * Se o usuário não for informado, será utilizado o usuário logado.
     * @param string $usuario_id 
     * @param string $pgd_id 
     * @return bool
     */
    public function isParticipantePgdHabilitado(string | null $usuario_id = null, string $pgd_id): bool {
        $usuario_id = $usuario_id ?? parent::loggedUser()->id;
        $programa = Programa::find($pgd_id);
        $participante = $programa->participantes->where("usuario_id",$usuario_id)->first();
        return $participante ? $participante->habilitado : false;
    }

    /**
     * Informa se existe determinada atribuição entre o usuário e a unidade informados. Caso não seja informado um usuário, a
     * verificação será feita com base no usuário logado.
     * @param string $atribuicao 
     * @param string $unidade_id 
     * @param string $usuario_id
     */
    public static function isIntegrante(string $atribuicao, string $unidade_id, string | null $usuario_id = null): bool {
        $unidade = Unidade::find($unidade_id) ?? null;
        $usuario = isset($usuario_id) ? Usuario::find($usuario_id) : parent::loggedUser();
        $atribuicoes = array_key_exists($usuario->id, $unidade->integrantesAtribuicoes) ? $unidade->integrantesAtribuicoes[$usuario->id] : null;
        return empty($atribuicoes) ? false : in_array($atribuicao, $atribuicoes); 
    }

    /**
     * Recebe os IDs de um usuário e de uma unidade, e informa se a unidade é a lotação do usuário.
     * Se o usuário não for informado, será utilizado o usuário logado.
     * @param string $unidade_id 
     */
    public function isLotacao(string | null $usuario_id = null, string $unidade_id): bool {
        $usuario = isset($usuario_id) ? Usuario::find($usuario_id) : parent::loggedUser();
        return $usuario->lotacao->unidade_id == $unidade_id;
    }

    /**
     * Informa se o usuário logado tem como lotação alguma das unidades pertencentes à linha hierárquica ascendente da unidade 
     * recebida como parâmetro.
     * @param string $unidade_id 
     * @returns 
     */
    public function isLotadoNaLinhaAscendente(string | null $unidade_id): bool {
        $result = false;
        if($unidade_id == null) return $result;
        $linhaAscendente = $this->unidadeService->linhaAscendente($unidade_id);
        foreach($linhaAscendente as $unidade_id) {
            if($this->isIntegrante('LOTADO',$unidade_id)) $result = true;
        };
        return $result;
    }

    public function areasTrabalhoWhere($subordinadas, $usuario = null, $prefix = "") {
        $where = [];
        $prefix = empty($prefix) ? "" : $prefix . ".";
        $usuario = $usuario ?? parent::loggedUser();
        foreach($usuario->areasTrabalho as $lotacao) {
            $where[] = $prefix . "id = '" . $lotacao->unidade_id . "'";
            if($subordinadas) $where[] = $prefix . "path like '%" . $lotacao->unidade_id . "%'";
        }
        $result = implode(" OR ", $where);
        return empty($result) ? "false" : "(" . $result . ")";
    }

    /**
     * dashboard gestor
     *
     * @param  mixed $data_inicial: Data inicial dos planos de trabalho
     * @param  mixed $data_final: Data final dos planos de trabalho
     * @param  mixed $unidade_ids: Unidades que o usuário gerencia
     * @return array: array contendo todas as informações dos planos de trabalho de cada usuário da unidade (front-end do gestor)
     */
/*     public function planosTrabalhoPorPeriodo($usuario_id, $inicioPeriodo = null, $fimPeriodo = null){
        $result = [];
        $planos = PlanoTrabalho::where("usuario_id", $usuario_id)->with(['atividades', 'unidade', 'tipoModalidade'])->get();
        if ($inicioPeriodo == null || $fimPeriodo == null) {
            $result = $planos;
        } else {
            foreach ($planos as $plano) {
                if (CalendarioService::between($plano['data_inicio'], $inicioPeriodo, $fimPeriodo) || CalendarioService::between($plano['data_fim'], $inicioPeriodo, $fimPeriodo)) array_push($result, $plano);
            }
        }
        return $result;
    } */

    public function proxyQuery($query, &$data) {   
        $usuario = parent::loggedUser();
        $where = [];
        $subordinadas = true;
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "lotacao") {
                $query->whereHas('lotacao', function (Builder $query) use ($condition) {
                    $query->where('unidade_id', $condition[2]);
                });
            } else if(is_array($condition) && $condition[0] == "subordinadas") {
                $subordinadas = $condition[2];
            } else {
                array_push($where, $condition);
            }
        }
        if(!$usuario->hasPermissionTo("MOD_USER_TUDO")) {
            $areasTrabalhoWhere = $this->areasTrabalhoWhere($subordinadas, null, "where_unidades");
            array_push($where, new RawWhere("EXISTS(SELECT where_lotacoes.id FROM lotacoes where_lotacoes LEFT JOIN unidades where_unidades ON (where_unidades.id = where_lotacoes.unidade_id) WHERE where_lotacoes.usuario_id = usuarios.id AND ($areasTrabalhoWhere))", []));
        }
        $data["where"] = $where;
        return $data;
    }

    public function proxySearch($query, &$data, &$text) {
        $data["where"][] = ["subordinadas", "==", true];
        return $this->proxyQuery($query, $data);
    }
    
    public function proxyStore(&$data, $unidade, $action) {
        $data['cpf'] = $this->UtilService->onlyNumbers($data['cpf']);
        if(!empty($data['telefone'])) $data['telefone'] = $this->UtilService->onlyNumbers($data['telefone']);
        /* Armazena as informações que serão necessárias no extraStore */
        $this->buffer = [ "integrantes" => $this->UtilService->getNested($data, "integrantes") ];
        return $data;
    }

    /**
     * Este método impede que um usuário, com perfil diferente de Desenvolvedor, tenha seu perfil alterado para este último.
     */
    public function proxyUpdate($data, $unidade){
        $perfilAtual = $this->getById($data["id"])["perfil_id"];
        if((($perfilAtual == $this->developerId) || ($data["perfil_id"] != $this->developerId)) && (!$this->isLoggedUserADeveloper())) throw new Exception("Tentativa de alterar o perfil de/para um Desenvolvedor");
    }

    /**
     * Este método impede que um usuário seja inserido com e-mail/CPF já existentes no Banco de Dados, bem como
     * impede também a inserção de um usuário com o perfil de Desenvolvedor. Usuários com esse perfil só podem ser inseridos
     * através do próprio código da aplicação.
     */
    public function validateStore(&$data, $unidade, $action) {
        if($action == ServiceBase::ACTION_INSERT) {
            if(empty($data["email"])) throw new Exception("O campo de e-mail é obrigatório");
            if(empty($data["cpf"])) throw new Exception("O campo de CPF é obrigatório");
            $query1 = Usuario::where("id", "!=", $data["id"])->where(function ($query) use ($data) {
                                                                return $query->where("cpf", UtilService::onlyNumbers($data["cpf"]))->orWhere("email", $data["email"]);
                                                            });
            $query2 = Usuario::where("id", "!=", $data["id"])->whereNotNull("deleted_at")->where(function ($query) use ($data) {
                                                                                                return $query->where("cpf", UtilService::onlyNumbers($data["cpf"]))->orWhere("email", $data["email"]);
                                                                                            });
            $alreadyHas = $query1->first() ?? $query2->first();
            if(!empty($alreadyHas)) {
                if($alreadyHas->deleted_at) { // Caso o usuário exista, mas esteja excluído, reabilita o usuário deletando todos os seus vínculos anteriores e recuperando seus dados sensíveis (cpf, e-mail funcional, matricula, nome, apelido, data_nascimento)
                    // TODO: Sugestão - refatorar esse código deixando para o usuário logado decidir se deseja reativar e, em caso positivo, decidir se atualiza os dados ou não
                    $this->removerVinculosUsuario($alreadyHas);
                    $data["id"] = $alreadyHas->id;
                    $data["cpf"] = $alreadyHas->cpf;
                    $data["email"] = $alreadyHas->email;
                    $data["matricula"] = $alreadyHas->matricula;
                    $data["nome"] = $alreadyHas->nome;
                    $data["apelido"] = $alreadyHas->apelido;
                    $data["data_nascimento"] = $alreadyHas->data_nascimento;
                    $alreadyHas->deleted_at = null;
                    return $alreadyHas;
                } else {
                    throw new Exception("Já existe um usuário com mesmo e-mail ou CPF no sistema");
                }
            }
            if($data["perfil_id"] == $this->developerId && !$this->isLoggedUserADeveloper()) throw new Exception("Tentativa de inserir um usuário com o perfil de Desenvolvedor");
            //$query->toSql();    $query->getBindings();
        }
    }

    public function removerVinculosUsuario(&$usuario) {
        if(!empty($usuario)) {
            foreach($usuario->unidadesIntegrantes as $vinculo){ $vinculo->deleteCascade(); }
            $usuario->fresh();
        }
    }
}

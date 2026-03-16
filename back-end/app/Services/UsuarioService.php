<?php

namespace App\Services;

use App\Enums\TipoModalidadeEnum;
use App\Enums\UsuarioSituacaoSiape;
use App\Exceptions\DBException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ServerException;
use App\Exceptions\ValidateException;
use App\Facades\SiapeLog;
use App\Models\Usuario;
use App\Repository\IntegracaoServidorRepository;
use App\Repository\PerfilRepository;
use App\Repository\PlanoEntregaRepository;
use App\Repository\PlanoTrabalhoConsolidacaoRepository;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\TipoModalidadeRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\Repository\SiapeBlackListServidorRepository;
use App\Services\IntegracaoService;
use App\Services\RawWhere;
use App\Services\ServiceBase;
use App\Services\Siape\DadosExternosSiape;
use App\Services\UnidadeService;
use App\Services\UtilService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;
use Throwable;

/**
 * @property-read UnidadeService $unidadeService
 * @property-read IntegracaoService $integracaoService
 * @property UnidadeIntegranteService $UnidadeIntegranteService
 * @property UnidadeIntegranteAtribuicaoService $unidadeIntegranteAtribuicaoService
 * @property NivelAcessoService $nivelAcessoService
 */
class UsuarioService extends ServiceBase
{
    use DadosExternosSiape;

    const LOGIN_GOOGLE = "GOOGLE";
    const LOGIN_MICROSOFT = "AZURE";
    const LOGIN_FIREBASE = "FIREBASE";

    protected UsuarioRepository $usuarioRepository;
    protected UnidadeRepository $unidadeRepository;
    protected IntegracaoServidorRepository $integracaoServidorRepository;
    protected PerfilRepository $perfilRepository;
    protected TipoModalidadeRepository $tipoModalidadeRepository;
    protected PlanoTrabalhoConsolidacaoRepository $planoTrabalhoConsolidacaoRepository;
    protected PlanoTrabalhoRepository $planoTrabalhoRepository;
    protected PlanoEntregaRepository $planoEntregaRepository;
    protected SiapeBlackListServidorRepository $siapeBlackListServidorRepository;

    public function __construct() {
        parent::__construct();
        $this->usuarioRepository = app(UsuarioRepository::class);
        $this->unidadeRepository = app(UnidadeRepository::class);
        $this->integracaoServidorRepository = app(IntegracaoServidorRepository::class);
        $this->perfilRepository = app(PerfilRepository::class);
        $this->tipoModalidadeRepository = app(TipoModalidadeRepository::class);
        $this->planoTrabalhoConsolidacaoRepository = app(PlanoTrabalhoConsolidacaoRepository::class);
        $this->planoTrabalhoRepository = app(PlanoTrabalhoRepository::class);
        $this->planoEntregaRepository = app(PlanoEntregaRepository::class);
        $this->siapeBlackListServidorRepository = app(SiapeBlackListServidorRepository::class);
    }

    private function applyDefaultTipoModalidadeId(array &$data): void
    {
        if (!empty($data['tipo_modalidade_id'] ?? null)) {
            return;
        }

        $defaultTipoModalidade = $this->tipoModalidadeRepository->findByNome(TipoModalidadeEnum::SEM_DADOS_SIAPE->nome());

        if (!$defaultTipoModalidade) {
            throw new ValidateException("Tipo de Modalidade Padrão não definido no sistema. Consulte um administrador", 422);
        }

        $data['tipo_modalidade_id'] = $defaultTipoModalidade->id;
    }

    /**
     * @param object{
     *   id: string,
     *   matriculasiape: string,
     *   emailfuncional: string,
     *   modalidade_pgd: mixed,
     *   nome_servidor: string,
     *   nome_guerra: string,
     *   cod_jornada: mixed,
     *   nome_jornada: mixed,
     *   participa_pgd: mixed,
     *   ident_unica: mixed,
     *   data_modificacao: mixed,
     *   data_nascimento: mixed
     * } $usuario
     * @return void
     */
    public function atualizarServidor($usuario)
    {
        if (empty($usuario->id)) {
            SiapeLog::error("ID do usuário não encontrado para atualização", ['usuario' => (array) $usuario]);
            return;
        }

        SiapeLog::info("Atualizando dados do servidor Matricula: " . $usuario->matriculasiape);

        $this->integracaoService->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($usuario->emailfuncional, $usuario->matriculasiape, $usuario->id);
        $modalidadePgdValida = $this->integracaoService->validarModalidadePgd($usuario->modalidade_pgd);

        $this->usuarioRepository->update($usuario->id, [
            'nome'               => $usuario->nome_servidor,
            'apelido'            => $usuario->nome_guerra,
            'email'              => $usuario->emailfuncional,
            'cod_jornada'        => $usuario->cod_jornada,
            'nome_jornada'       => $usuario->nome_jornada,
            'tipo_modalidade_id' => $modalidadePgdValida,
            'participa_pgd'      => $usuario->participa_pgd,
            'ident_unica'        => $usuario->ident_unica,
            'data_modificacao'   => UtilService::asDateTime($usuario->data_modificacao),
            'data_nascimento'    => $usuario->data_nascimento,
        ]);
    }

    public function atualizarMatriculasUsuariosSemMatricula()
    {
        try {
            $usuariosSemMatricula = $this->usuarioRepository->findAllSemMatricula();

            if ($usuariosSemMatricula->isEmpty()) {
                return;
            }

            foreach ($usuariosSemMatricula as $usr) {
                /** @var Usuario $usr */
                $matriculaSiape = $this->integracaoServidorRepository->getMatriculaByCpf($usr->cpf);

                if (!empty($matriculaSiape)) {
                    $this->usuarioRepository->update($usr->id, ['matricula' => $matriculaSiape]);
                    SiapeLog::info(sprintf("Atualizada matrícula do usuário id=%s a partir do SIAPE.", $usr->id));
                } else {
                    SiapeLog::warning(sprintf("Matrícula SIAPE não encontrada para usuário id=%s com CPF %s.", $usr->id, $usr->cpf));
                }
            }
        } catch (Throwable $e) {
            report($e);
            SiapeLog::error(sprintf("Erro ao atualizar matrículas de usuários sem matrícula: %s", $e->getMessage()));
        }
    }

    public function verificaSeUsuarioSoMudouMatricula($cpfCheck, $unidadeExercicioIdCheck, $matriculaNova, $codigoExercicio): bool
    {
        if (!empty($cpfCheck) && !empty($unidadeExercicioIdCheck)) {
            $usuarioLotadoMesmaUnidade = $this->usuarioRepository->findByCpfAndLotacao($cpfCheck, $unidadeExercicioIdCheck);

            if (!empty($usuarioLotadoMesmaUnidade) && isset($usuarioLotadoMesmaUnidade->id)) {
                $this->usuarioRepository->update($usuarioLotadoMesmaUnidade->id, ['matricula' => $matriculaNova]);

                SiapeLog::info(sprintf('Atualizada matrícula do usuário CPF %s para %s (unidade exercício código %s) sem criar novo usuário.',
                    (string) $cpfCheck,
                    (string) $matriculaNova,
                    (string) $codigoExercicio
                ));
                return false;
            }
            return true;
        }
        return true;
    }

    public function gerarUsuario($dados, $modalidade, $perfil): Usuario
    {
        $tipoModalidadePgd = UtilService::valueOrDefault($dados['modalidade_pgd']);

        $tipoModalidadePgd = empty($tipoModalidadePgd) ? $modalidade : $this->integracaoService->validarModalidadePgd($tipoModalidadePgd);

        if (empty($tipoModalidadePgd)) {
            $tipoModalidadePgd = $this->tipoModalidadeRepository->getDefaultId();
        }

        $matriculaNova = UtilService::valueOrDefault($dados['matricula']);

        if (empty($tipoModalidadePgd)) {
             SiapeLog::error("Não foi possível identificar um Tipo de Modalidade para o servidor {$matriculaNova}. O registro será ignorado.");
             throw new NotFoundException("Nenhum tipo de modalidade foi encontrado para o servidor {$matriculaNova}.");
        }

        return $this->usuarioRepository->newUsuario([
                    'id' => Uuid::uuid4(),
                    'email' => UtilService::valueOrDefault($dados['emailfuncional']),
                    'nome' => UtilService::valueOrDefault($dados['nome']),
                    'cpf' => UtilService::valueOrDefault($dados['cpf']),
                    'matricula' => UtilService::valueOrDefault($dados['matricula']),
                    'apelido' => UtilService::valueOrDefault($dados['apelido']),
                    'telefone' => UtilService::valueOrDefault($dados['telefone'], null),
                    'data_nascimento' => UtilService::valueOrDefault($dados['data_nascimento'], null),
                    'sexo' => UtilService::valueOrDefault($dados['sexo']),
                    'situacao_funcional' => UtilService::valueOrDefault($dados['situacao_funcional'], "DESCONHECIDO"),
                    'perfil_id' => $perfil,
                    'tipo_modalidade_id' => $tipoModalidadePgd,
                    'exercicio' => UtilService::valueOrDefault($dados['exercicio']),
                    'uf' => UtilService::valueOrDefault($dados['uf'], null),
                    'data_modificacao' => UtilService::asDateTime($dados['data_modificacao']),
                    'ident_unica' => UtilService::valueOrDefault($dados['ident_unica']),
                ]);
    }

    public function areasTrabalhoWhere($subordinadas, $tabela = ""): string
    {
        $usuario = parent::loggedUser();
        return $this->unidadeRepository->getAreasTrabalhoWhereClause($usuario->id, $subordinadas, $tabela);
    }

    public function atualizarFotoPerfil($tipo, &$usuario, $url)
    {
        $mudou = ($tipo == UsuarioService::LOGIN_GOOGLE ? $usuario->foto_google != $url :
                 ($tipo == UsuarioService::LOGIN_MICROSOFT ? $usuario->foto_microsoft != $url :
                 ($tipo == UsuarioService::LOGIN_FIREBASE ? $usuario->foto_firebase != $url : false)));

        if (!empty($url) && !empty($usuario) && $mudou) {
            $downloaded = $this->downloadImgProfile($url, "usuarios/" . $usuario->id);
            if (!empty($downloaded)) {
                $this->usuarioRepository->updateFotoPerfil($usuario->id, $tipo, $url, $downloaded);

                $usuario->foto_perfil = $downloaded;
                switch ($tipo) {
                    case UsuarioService::LOGIN_GOOGLE:
                        $usuario->foto_google = $url;
                        break;
                    case UsuarioService::LOGIN_MICROSOFT:
                        $usuario->foto_microsoft = $url;
                        break;
                    case UsuarioService::LOGIN_FIREBASE:
                        $usuario->foto_firebase = $url;
                        break;
                }
            }
        }
    }

    public function downloadImgProfile($url, $path)
    {
        if (!Storage::exists($path)) {
            Storage::makeDirectory($path);
        }
        try {
            $contents = file_get_contents($url);
        } catch (Throwable $e) {
        }
        if (!empty($contents)) {
            $name = $path . "/profile_" . md5($contents) . ".jpg";
            if (!Storage::exists($name))
                Storage::put($name, $contents);
            return $name;
        } else {
            return "";
        }
    }

    public function store($dataOrEntity, $unidade, $transaction = true)
    {
        if ($transaction) DB::beginTransaction();
        try {
            $data = (array) $dataOrEntity;
            $action = empty($data['id']) ? ServiceBase::ACTION_INSERT : ServiceBase::ACTION_EDIT;

            if ($action == ServiceBase::ACTION_EDIT) {
                if (!$data['usuario_externo']) unset($data['cpf']);
                $result = $this->update($data, $unidade, $transaction);
                if ($transaction) DB::commit();
                return $result;
            }

            $restoredEntity = $this->validateStore($data, $unidade, $action);

            if ($restoredEntity) {
                if ($restoredEntity instanceof Usuario) {
                    $restoredEntity->restore();
                }
                unset($data['pedagio']);
                if (!empty($data['cpf'])) {
                    $data['cpf'] = UtilService::onlyNumbers($data['cpf']);
                }
                if (!empty($data['telefone'])) {
                    $data['telefone'] = UtilService::onlyNumbers($data['telefone']);
                }
                $this->applyDefaultTipoModalidadeId($data);
                $updated = $this->usuarioRepository->update($restoredEntity->id, $data);
                if (!$updated) {
                    throw new DBException("Falha ao reativar o usuário", 500);
                }
                $this->extraStore($updated, $unidade, $action);
                if ($transaction) DB::commit();
                return $updated;
            }

            $data = $this->proxyStore($data, $unidade, $action);
            $entity = $this->usuarioRepository->create($data);
            if (!$entity) {
                throw new DBException("Falha ao inserir o usuário", 500);
            }
            $this->extraStore($entity, $unidade, $action);

            if ($transaction) DB::commit();
            if (method_exists($this, "afterStore")) $this->afterStore($entity, $action);
            return $entity;
        } catch (Throwable $e) {
            if ($transaction) DB::rollback();
            throw $e;
        }
    }

    public function update($data, $unidade, $transaction = true)
    {
        if ($transaction) DB::beginTransaction();
        try {
            if (empty($data['id'])) {
                throw new NotFoundException("ID do usuário não encontrado para atualização");
            }

            $id = $data['id'];
            $data = $this->proxyUpdate($data, $unidade);

            $entity = $this->usuarioRepository->update($id, $data);

            if (!$entity) throw new NotFoundException("Usuário não encontrado");

            if (method_exists($this, "extraUpdate")) $this->extraUpdate($entity, $unidade);
            if ($transaction) DB::commit();
            if (method_exists($this, "afterUpdate")) $this->afterUpdate($entity, $data);
            return $entity;
        } catch (Throwable $e) {
            if ($transaction) DB::rollback();
            throw $e;
        }
    }

    public function destroy($id, $transaction = true)
    {
        if ($transaction) DB::beginTransaction();
        try {
            $entity = $this->usuarioRepository->findById($id);
            if (!$entity) throw new NotFoundException("Id não encontrado");

            $this->removerVinculosUsuario($entity);

            $this->usuarioRepository->delete($id);

            if (method_exists($this, "extraDestroy")) $this->extraDestroy($entity);
            if ($transaction) DB::commit();
            return true;
        } catch (Throwable $e) {
            if ($transaction) DB::rollback();
            throw $e;
        }
    }

    public function extraStore($entity, $unidade, $action)
    {
        $integrantes = $this->buffer["integrantes"] ?? [];
        if (!is_array($integrantes)) {
            $integrantes = [];
        }

        foreach ($integrantes as &$integrante) {
            $integrante["usuario_id"] = $entity->id;
        }

        $this->buffer["integrantes"] = $integrantes;

        if (!empty($integrantes)) {
            $this->UnidadeIntegranteService->salvarIntegrantes($integrantes);
        }
        if ($action != ServiceBase::ACTION_INSERT)
            $this->unidadeIntegranteAtribuicaoService->checkLotacoes($entity->id);
    }

    public function atribuicoesGestor(?string $unidadeId, ?string $usuarioId = null)
    {
        $result = ["gestor" => false, "gestorSubstituto" => false, "gestorDelegado" => false];

        if(!$unidadeId)
            return $result;

        $key = [$unidadeId, $usuarioId];
        if ($this->hasBuffer("atribuicoesGestor", $key)) {
            $result = $this->getBuffer("atribuicoesGestor", $key);
        } else {
            $uid = $usuarioId ?? parent::loggedUser()->id;
            $atribuicoes = $this->usuarioRepository->getAtribuicoes($uid, $unidadeId);

            $result = [
                "gestor" => in_array('GESTOR', $atribuicoes),
                "gestorSubstituto" => in_array('GESTOR_SUBSTITUTO', $atribuicoes),
                "gestorDelegado" => in_array('GESTOR_DELEGADO', $atribuicoes)
            ];

            $this->setBuffer("atribuicoesGestor", $key, $result);
        }
        return $result;
    }

    public function isGestorUnidade(string $unidadeId, $incluiDelegado = true): bool
    {
        if ($this->hasBuffer("isGestorUnidade", $unidadeId)) {
            return $this->getBuffer("isGestorUnidade", $unidadeId);
        } else {
            $atribuicoes = $this->atribuicoesGestor($unidadeId);
            $isGestor = $atribuicoes['gestor'] || $atribuicoes['gestorSubstituto'] || ($incluiDelegado && $atribuicoes['gestorDelegado']);
            return $this->setBuffer("isGestorUnidade", $unidadeId, $isGestor);
        }
    }

    public function isGestorUnidadeRecursivo(string $unidadeId, ?string $usuarioId = null): bool
    {
        $usuarioId = $usuarioId ?? $this->loggedUser()->id;
        return $this->unidadeRepository->isUsuarioGestorRecursivo($unidadeId, $usuarioId);
    }

    public function isParticipante($planoTrabalho)
    {
        return $planoTrabalho['usuario_id'] == self::loggedUser()->id;
    }

    public function isParticipanteHabilitado(string|null $usuarioId = null, string $programaId): bool
    {
        $key = [$usuarioId, $programaId];
        if ($this->hasBuffer("isParticipanteHabilitado", $key)) {
            return $this->getBuffer("isParticipanteHabilitado", $key);
        } else {
            $usuarioId = $usuarioId ?? parent::loggedUser()->id;
            return $this->setBuffer("isParticipanteHabilitado", $key, $this->usuarioRepository->isParticipanteHabilitado($usuarioId, $programaId));
        }
    }

    public function isIntegrante(string $atribuicao, string $unidadeId, string|null $usuarioId = null): bool
    {
        $result = false;
        $key = [$atribuicao, $unidadeId, $usuarioId];
        if ($this->hasBuffer("isIntegrante", $key)) {
            $result = $this->getBuffer("isIntegrante", $key);
        } else {
            $uid = $usuarioId ?? parent::loggedUser()->id;
            $exists = $this->usuarioRepository->isIntegrante($uid, $unidadeId, $atribuicao);
            $result = $this->setBuffer("isIntegrante", $key, $exists);
        }
        return $result;
    }

    public function isLotadoNaLinhaAscendente(string|null $unidadeId): bool
    {
        $result = false;
        if ($unidadeId == null)
            return $result;
        if ($this->hasBuffer("isLotadoNaLinhaAscendente", $unidadeId)) {
            $result = $this->getBuffer("isLotadoNaLinhaAscendente", $unidadeId);
        } else {
            $linhaAscendente = $this->unidadeService->linhaAscendente($unidadeId);
            foreach ($linhaAscendente as $unidadeId) {
                if ($this->isIntegrante('LOTADO', $unidadeId))
                    $result = true;
            }
            $this->setBuffer("isLotadoNaLinhaAscendente", $unidadeId, $result);
        }
        return $result;
    }

    public function proxyQuery($query, &$data)
    {
        $usuario = parent::loggedUser();
        $where = [];
        $subordinadas = true;
        $programa = $this->extractWhere($data, "programa_id");
        $lotacao = [];
        foreach ($data["where"] as $condition) {
            if (is_array($condition) && $condition[0] == "lotacao") {
                $lotacao = $condition;
                $query->whereHas('areasTrabalho', function (Builder $query) use ($condition) {
                    $query->where('unidade_id', $condition[2]);
                });
            } else if (is_array($condition) && $condition[0] == "habilitado") {
                if ($condition[2] == true) {
                    $query->whereHas('participacoesProgramas', function (Builder $query) {
                        $query->where('habilitado', 1);
                    });
                } else {
                    if ($condition[2] != null) {
                        $query->whereHas('participacoesProgramas', function (Builder $query) {
                            $query->where('habilitado', 0);
                        });
                    }

                }
            } else if (is_array($condition) && $condition[0] == "subordinadas") {
                $subordinadas = $condition[2];
            } else if (is_array($condition) && $condition[0] == "atribuicoes") {
                $query->whereHas('unidadesIntegranteAtribuicoes', function (Builder $query) use ($condition) {
                    $query->whereIn('atribuicao', $condition[2]);
                });
            }
            else {
                array_push($where, $condition);
            }
        }
        if (!$usuario->hasPermissionTo("MOD_USER_TUDO")) {
            $areasTrabalhoWhere = $this->unidadeRepository->getAreasTrabalhoWhereClause($usuario->id, $subordinadas, "where_unidades");
            array_push($where, RawWhere::raw("EXISTS(SELECT where_lotacoes.id FROM lotacoes where_lotacoes LEFT JOIN unidades where_unidades ON (where_unidades.id = where_lotacoes.unidade_id) WHERE where_lotacoes.usuario_id = usuarios.id AND ($areasTrabalhoWhere))", []));
        }
        $data["where"] = $where;
        return $data;
    }

    public function proxySearch($query, &$data, &$text)
    {
        $data["where"][] = ["subordinadas", "==", true];
        return $this->proxyQuery($query, $data);
    }

    public function proxyStore(&$data, $unidade, $action)
    {
        $data["with"] = [];
        $data['cpf'] = UtilService::onlyNumbers($data['cpf']);
        $this->applyDefaultTipoModalidadeId($data);

        unset($data['pedagio']);

        if (!empty($data['telefone']))
            $data['telefone'] = UtilService::onlyNumbers($data['telefone']);

        $this->buffer = ["integrantes" => UtilService::getNested($data, "integrantes")];
        $this->validarPerfil($data);
        $this->validarColaborador($data);
        return $data;
    }

    public function proxyUpdate($data, $unidade)
    {
        $data["with"] = [];
        $this->applyDefaultTipoModalidadeId($data);
        unset($data['pedagio']);
        $this->buffer = ["integrantes" => UtilService::getNested($data, "integrantes")];
        $this->validarPerfil($data);
        $this->validarColaborador($data);
        return $data;
    }

    public function extraUpdate($entity, $unidade)
    {
        $this->extraStore($entity, $unidade, ServiceBase::ACTION_EDIT);
    }

    public function proxyRows(&$rows)
    {
        foreach ($rows as $row) {
            $row["regramentos"] = $this->proxyRegramentos($row);
        }
        return $rows;
    }

    public function proxyRegramentos($row){
        return $row["lotacao"]
            ? array_map(fn($p) => $p["nome"], $this->unidadeService->regramentosAscendentes($row["lotacao"]->unidade_id))
            : [];
    }

    public function validateStore(&$data, $unidade, $action)
    {
        if($action == ServiceBase::ACTION_EDIT){
            if(!empty($data['matricula']) && strlen($data['matricula']) > 50)
                throw new ValidateException("O campo de matrícula deve ter no máximo 50 caracteres", 422);
            if (empty($data["integrantes"][0]))
                throw new ValidateException("Selecione uma unidade!", 422);

            if (!isset($data['tipo_modalidade_id'])) {
                $user = $this->usuarioRepository->findById($data["id"]);
                $data['tipo_modalidade_id'] = $user?->tipo_modalidade_id;
            }
        }
        if ($action == ServiceBase::ACTION_INSERT) {
            if (empty($data["email"]))
                throw new ValidateException("O campo de e-mail é obrigatório", 422);
            if (empty($data["cpf"]))
                throw new ValidateException("O campo de CPF é obrigatório", 422);
            if (empty($data["integrantes"][0]))
                throw new ValidateException("Selecione uma unidade!", 422);

            $alreadyHas = $this->usuarioRepository->findByCpfOrEmail($data['cpf'], $data['email'], $data['id'] ?? null, true);

            if (!empty($alreadyHas)) {
                if ($alreadyHas->deleted_at) {
                    $this->removerVinculosUsuario($alreadyHas);
                    $data["id"] = $alreadyHas->id;
                    $data["cpf"] = $alreadyHas->cpf;
                    $data["email"] = $alreadyHas->email;

                    if (is_null($data['matricula'] ?? null)) {
                        $data['matricula'] = $alreadyHas->matricula;
                    }

                    $data["nome"] = $alreadyHas->nome;
                    $data["apelido"] = $alreadyHas->apelido;
                    $data["data_nascimento"] = $alreadyHas->data_nascimento;

                    if (isset($this->integracaoService)) {
                        $this->integracaoService->verificaSeOEmailJaEstaVinculadoEAlteraParaEmailFake($data['email'], $data['matricula'], $alreadyHas->id);
                    }

                    $alreadyHas->deleted_at = null;
                    return $alreadyHas;
                } else {
                    throw new ValidateException("Já existe um usuário com mesmo e-mail ou CPF no sistema", 422);
                }
            }
            $this->validarPerfil($data);
            $this->validarColaborador($data);
        }
    }

    public function removerVinculosUsuario(&$usuario)
    {
        if (!empty($usuario)) {
            $this->usuarioRepository->removerVinculos($usuario->id);
            $usuario = $usuario->fresh();
        }
    }

    protected function findPerfil($id)
    {
        return $this->perfilRepository->find($id);
    }

    public function validarPerfil($data) : void
    {
        $perfilAutenticado = $this::loggedUser()->perfil;
        if(!isset($data['perfil_id'])){
            return;
        }
        $perfilNovo = $this->findPerfil($data['perfil_id']);

        $perfilAtual = !empty($data['id']) ? $this->getById($data)->perfil_id : null;

        $developer = $this->nivelAcessoService->getPerfilDesenvolvedor();
        if (empty($developer))
            throw new ServerException("ValidateUsuario", "Perfil de Desenvolvedor não encontrado no banco de dados");

        $developerId = $developer->id;
        if ($data['perfil_id'] != $perfilAtual) {
            if (($perfilNovo->nivel < $perfilAutenticado->nivel) && $perfilAutenticado->nivel != 6)
                throw new ServerException("ValidateUsuario", "Não é possível atribuir perfil superior ao do usuário logado.");
            if ($data["perfil_id"] == $developerId && !$this->isLoggedUserADeveloper())
                throw new ServerException("ValidateUsuario", "Tentativa de alterar o perfil de/para um Desenvolvedor");
            if ($perfilAtual == $developerId && !$this->isLoggedUserADeveloper())
                throw new ServerException("ValidateUsuario", "Tentativa de alterar o perfil de um Desenvolvedor");
        }
    }

    public function validarColaborador($data) : void
    {
        $usuarioExterno = $data['usuario_externo'] ?? null;
        if ($usuarioExterno === null) {
            return;
        }

        if (!isset($data['perfil_id'])) {
            throw new ServerException("ValidateUsuario", "ID do perfil não foi informado.");
        }

        $perfil = $this->findPerfil($data['perfil_id']);
        if (!$perfil) {
            throw new ServerException("ValidateUsuario", "Perfil não encontrado.");
        }

        if ($perfil->nivel < 6 && $usuarioExterno == 1) {
            throw new ServerException("ValidateUsuario", "Usuário externo não pode ter o nível de acesso: " . $perfil->nome);
        } elseif ($perfil->nivel == 6 && $usuarioExterno == 0) {
            throw new ServerException("ValidateUsuario", "Usuário não pode ter o nível de acesso: " . $perfil->nome);
        }
    }

    public function searchText($data)
    {
        $data = is_array($data) ? $data : [];
        $data['query'] = $data['query'] ?? '';
        $data['fields'] = $data['fields'] ?? [];
        $data['where'] = $data['where'] ?? [];
        $data['orderBy'] = $data['orderBy'] ?? [];

        if (!in_array('usuario_externo', $data['fields'])) {
            $data['fields'][] = 'usuario_externo';
        }

        $subordinadas = true;
        $where = [];
        foreach ($data['where'] as $condition) {
            if (is_array($condition) && ($condition[0] ?? null) === 'subordinadas') {
                $subordinadas = (bool) ($condition[2] ?? true);
                continue;
            }
            $where[] = $condition;
        }
        $data['where'] = $where;

        $condicaoDeletados = array_filter($data['where'], fn ($w) => is_array($w) && ($w[0] ?? null) === 'deleted_at');
        if (empty($condicaoDeletados)) {
            $data['where'][] = ['deleted_at', '==', null];
        }

        $usuario = parent::loggedUser();
        if ($usuario && !$usuario->hasPermissionTo("MOD_USER_TUDO")) {
            $areasTrabalhoWhere = $this->unidadeRepository->getAreasTrabalhoWhereClause($usuario->id, $subordinadas, "where_unidades");
            $data['where'][] = RawWhere::raw("EXISTS(SELECT where_lotacoes.id FROM lotacoes where_lotacoes LEFT JOIN unidades where_unidades ON (where_unidades.id = where_lotacoes.unidade_id) WHERE where_lotacoes.usuario_id = usuarios.id AND ($areasTrabalhoWhere))");
        }

        $rows = $this->usuarioRepository->search($data);

        $fieldsForOutput = array_values(array_filter($data['fields'], fn ($field) => $field !== 'usuario_externo'));

        $getFieldValue = static fn ($row, string $field) => data_get($row, $field);

        $values = [];
        foreach ($rows as $row) {
            $orderValues = array_map(
                fn ($order) => is_array($order) ? $getFieldValue($row, (string) ($order[0] ?? '')) : null,
                $data['orderBy']
            );

            $values[] = [
                (string) $getFieldValue($row, 'id'),
                array_map(fn ($field) => $getFieldValue($row, $field), $fieldsForOutput),
                $orderValues
            ];
        }

        return $values;
    }

    public function getById($data)
    {
        $id = is_array($data) ? $data['id'] : $data;
        $entity = $this->usuarioRepository->findById($id);

        if ($entity) {
            $rows = [$entity];
            $rows = method_exists($this, 'proxyRows') ? $this->proxyRows($rows) : $rows;
            if ($rows[0] instanceof Usuario) {
                $this->anexarUnidadesVinculadasPorCpf($rows[0]);
            }
            return $rows[0];
        } else {
            throw new NotFoundException("Id não encontrado");
        }
    }

    public function anexarUnidadesVinculadasPorCpf(Usuario $usuario): void
    {
        $cpf = strval($usuario->getAttribute('cpf') ?? '');

        if (empty($cpf)) {
            $usuario->setAttribute('unidades_vinculadas', []);
            return;
        }

        $usuarios = $this->usuarioRepository->findActivesByCpf($cpf);
        if ($usuarios->isEmpty()) {
            $usuario->setAttribute('unidades_vinculadas', []);
            return;
        }

        $usuarios->loadMissing(['unidades:id,sigla']);

        $unidadesVinculadasPayloadByKey = [];

        foreach ($usuarios as $usuarioPorCpf) {
            $matricula = $usuarioPorCpf->getAttribute('matricula') ?? null;
            $situacaoFuncional = $usuarioPorCpf->getAttribute('situacao_funcional') ?? null;

            foreach ($usuarioPorCpf->unidades ?? [] as $unidade) {
                $key = strval($unidade->id) . '|' . strval($matricula ?? '');

                if (isset($unidadesVinculadasPayloadByKey[$key])) {
                    continue;
                }

                $unidadesVinculadasPayloadByKey[$key] = [
                    'id' => $unidade->id,
                    'sigla' => $unidade->sigla,
                    'situacao_funcional' => $situacaoFuncional,
                    'matricula' => $matricula,
                    'emProcessoDeInativacao' => (bool) $this->siapeBlackListServidorRepository->findByCpfAndOptionalMatricula(
                        $cpf,
                        $matricula
                    ),
                ];
            }
        }

        $unidadesVinculadasPayload = array_values($unidadesVinculadasPayloadByKey);

        usort($unidadesVinculadasPayload, function (array $a, array $b): int {
            $siglaComparison = strval($a['sigla'] ?? '') <=> strval($b['sigla'] ?? '');
            if ($siglaComparison !== 0) {
                return $siglaComparison;
            }
            return strval($a['matricula'] ?? '') <=> strval($b['matricula'] ?? '');
        });

        $usuario->setAttribute('unidades_vinculadas', $unidadesVinculadasPayload);
    }

    public function consultaCpfSiapeXml($cpf)
    {
        return $this->buscaServidor($cpf);
    }

    public function consultaCPFSiape(string $cpf): array
    {
        [$dadosFuncionaisArray, $dadosPessoaisArray] = $this->buscaServidor($cpf);

        $dadosFuncionaisArray = array_map(function($item) {
            $unidade = $this->unidadeRepository->findByCodigo($item['codUorgExercicio']);
            $item['unidadeSigla'] = $unidade?->sigla;
            return $item;
        }, $dadosFuncionaisArray);

        return [
            'pessoais'    => $dadosPessoaisArray,
            'funcionais'  => $dadosFuncionaisArray,
        ];
    }

    public function atualizaPedagio($data)
    {
        $usuario = $this->usuarioRepository->findById($data['usuario_id']);
        if (empty($usuario)) {
            throw new ValidateException("Usuário não encontrado", 422);
        }

        $this->usuarioRepository->update($usuario->id, [
            'data_inicial_pedagio' => Carbon::parse($data['data_inicial_pedagio']),
            'data_final_pedagio' => Carbon::parse($data['data_final_pedagio']),
            'tipo_pedagio' => $data['tipo_pedagio']
        ]);

        return $this->usuarioRepository->findById($data['usuario_id']);
    }

    public function removePedagio($data)
    {
        $usuario = $this->usuarioRepository->findById($data['usuario_id']);
        if (empty($usuario)) {
            throw new ValidateException("Usuário não encontrado", 422);
        }

        $this->usuarioRepository->update($usuario->id, [
            'data_inicial_pedagio' => null,
            'data_final_pedagio' => null,
            'tipo_pedagio' => null
        ]);

        return $this->usuarioRepository->findById($data['usuario_id']);
    }

    public function ativarTemporariamente($data)
    {
        $usuario = $this->usuarioRepository->findById($data['usuario_id']);
        $participanteId = $this->nivelAcessoService->getPerfilParticipante()->id;

        if (empty($usuario)) {
            throw new ValidateException("Usuário não encontrado", 422);
        }

        $this->usuarioRepository->update($usuario->id, [
            'situacao_siape' => UsuarioSituacaoSiape::ATIVO_TEMPORARIO->value,
            'justicativa_ativacao_temporaria' => $data['justificativa'],
            'data_ativacao_temporaria' => Carbon::now(),
            'perfil_id' => $participanteId
        ]);

        return $this->usuarioRepository->findById($data['usuario_id']);
    }

    public function matriculas($cpf) : Collection
    {
        $cpf = strval($cpf ?? '');
        $usuarios = $this->usuarioRepository->findAllByCpf($cpf);

        if ($usuarios->isEmpty()) {
            throw new ValidateException("Nenhum usuário encontrado com o CPF informado.", 404);
        }

        foreach ($usuarios as $usuario) {
            if (!$usuario instanceof Usuario) {
                continue;
            }

            $matricula = $usuario->getAttribute('matricula') ?? null;

            $usuario->setAttribute(
                'emProcessoDeInativacao',
                (bool) $this->siapeBlackListServidorRepository->findByCpfAndOptionalMatricula($cpf, $matricula)
            );
        }

        return $usuarios;
    }

    public function unidadesVinculadas($cpf) : Collection
    {
        $unidades = $this->usuarioRepository->getUnidadesVinculadas($cpf);

        if ($unidades->isEmpty()) {
            throw new ValidateException("Nenhum usuário encontrado com o CPF informado.", 404);
        }

        return $unidades;
    }

    public function pendenciasChefe(?string $usuarioId = null, ?string $unidadeId = null)
    {
        $usuario_id = $usuarioId ?? $this->loggedUser()?->id;
        if (!$usuario_id) {
            return [
                'registrosExecucao' => new Collection(),
                'planosTrabalhoAssinatura' => new Collection(),
                'planosEntregaAvaliacao' => new Collection(),
                'planosEntregaHomologacao' => new Collection(),
                'entregasPlanoEntregaHomologacao' => new Collection()
            ];
        }

        $diasAvaliacaoRegistroExecucao = config('petrvs.dias-avaliacao-registro-execucao', 21);
        $unidades = $this->unidadeRepository->getUnidadesGerenciadas($usuario_id);

        $unidades_ids = $unidades->pluck('id')->toArray();
        if ($unidadeId && in_array($unidadeId, $unidades_ids, true)) {
            $unidades_ids = [$unidadeId];
        }

        $unidadesFilhas = $this->unidadeRepository->getSubordinadas($unidades_ids);
        $unidadesFilhasIds = $unidadesFilhas->pluck('id')->toArray();

        // 1. Registros de execução aguardando avaliação
        $dataCorte = Carbon::now()->subDays($diasAvaliacaoRegistroExecucao);
        $registrosExecucao = $this->planoTrabalhoConsolidacaoRepository->getPendentesAvaliacao($unidades_ids, $usuario_id, $dataCorte);

        // 2. Planos de trabalho aguardando assinatura
        $planosTrabalhoAssinatura = $this->planoTrabalhoRepository->getPlanosTrabalhoAssinatura($unidades_ids, $usuario_id);

        // 3. Planos de entrega aguardando avaliação
        $planosEntregaAvaliacao = $this->planoEntregaRepository->getPlanosEntregaAvaliacao($unidadesFilhasIds);

        // 4. Planos de entrega aguardando homologação
        $planosEntregaHomologacao = $this->planoEntregaRepository->getPlanosEntregaHomologacao($unidadesFilhasIds);

        // 5. Entregas de planos de entrega que precisam ter progresso
        $entregasPlanoEntregaExecucao = $this->planoEntregaRepository->getEntregasPlanoEntregaExecucao($unidadesFilhasIds);

        return [
            'registrosExecucao' => $registrosExecucao,
            'planosTrabalhoAssinatura' => $planosTrabalhoAssinatura,
            'planosEntregaAvaliacao' => $planosEntregaAvaliacao,
            'planosEntregaHomologacao' => $planosEntregaHomologacao,
            'entregasPlanoEntregaExecucao' => $entregasPlanoEntregaExecucao
        ];
    }
}

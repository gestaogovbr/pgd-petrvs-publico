<?php

namespace App\Services;

use Throwable;
use App\Models\Perfil;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Models\PlanoEntrega;
use App\Models\PlanoEntregaEntrega;
use App\Models\Programa;
use App\Services\RawWhere;
use App\Services\ServiceBase;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Log;
use App\Facades\SiapeLog;
use App\Exceptions\ValidateException;
use App\Models\PlanoTrabalhoConsolidacao;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Builder;
use App\Services\Siape\DadosExternosSiape;
use App\Models\UnidadeIntegranteAtribuicao;
use App\Enums\StatusEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use App\Enums\UsuarioSituacaoSiape;
use App\Exceptions\NotFoundException;
use App\Models\IntegracaoServidor;
use App\Services\UnidadeService;
use App\Services\IntegracaoService;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;
use App\Repository\UsuarioRepository;

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

    public function __construct() {
        parent::__construct();
        $this->usuarioRepository = app(UsuarioRepository::class);
    }

    public function atualizarFotoPerfil($tipo, &$usuario, $url)
    {
        $mudou = ($tipo == UsuarioService::LOGIN_GOOGLE ? $usuario->foto_google != $url : 
                 ($tipo == UsuarioService::LOGIN_MICROSOFT ? $usuario->foto_microsoft != $url : 
                 ($tipo == UsuarioService::LOGIN_FIREBASE ? $usuario->foto_firebase != $url : false)));
                 
        if (!empty($url) && !empty($usuario) && $mudou) {
            $downloaded = $this->downloadImgProfile($url, "usuarios/" . $usuario->id);
            if (!empty($downloaded)) {
                $this->usuarioRepository->updateFotoPerfil($usuario->id, $tipo, $url);
                
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
                // If it's edit, call update. 
                // Note: ServiceBase store() handles EDIT if entity exists.
                // We'll separate concern here or handle both.
                // For simplicity, if ID exists, we treat as update.
                $result = $this->update($data, $unidade, $transaction);
                if ($transaction) DB::commit();
                return $result;
            }

            $restoredEntity = $this->validateStore($data, $unidade, $action);

            if ($restoredEntity) {
                // User was restored (and validateStore might have returned the model)
                // We need to update it with new data
                $updated = $this->usuarioRepository->update($restoredEntity->id, $data);
                $this->extraStore($updated, $unidade, $action);
                if ($transaction) DB::commit();
                return $updated;
            }

            $data = $this->proxyStore($data, $unidade, $action);
            $entity = $this->usuarioRepository->create($data);
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

            // proxyDestroy logic? ServiceBase calls it.
            // Assuming proxyDestroy checks permissions or constraints.
            // UsuarioService does not implement proxyDestroy currently (checked previous content).
            
            // remove vinculos handled by repository delete logic if implemented?
            // ServiceBase calls deleteCascade if exists.
            // Repository delete() should handle it or we call it here.
            // UsuarioRepository::delete calls writeRepository->delete.
            // WriteRepository::delete calls $model->delete().
            // If we want cascade delete logic, we should use removerVinculos or ensure repository handles it.
            // UsuarioService::removerVinculosUsuario calls removerVinculos.
            
            // For destroy, we should probably clean up first.
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
        foreach ($this->buffer["integrantes"] as &$integrante) {
            $integrante["usuario_id"] = $entity->id;
        }
        $this->UnidadeIntegranteService->salvarIntegrantes($this->buffer["integrantes"]);
        if ($action != ServiceBase::ACTION_INSERT)
            $this->unidadeIntegranteAtribuicaoService->checkLotacoes($entity->id);
    }

    public function hasLotacao($id, $usuario = null, $subordinadas = true)
    {
        $usuarioId = $usuario ? $usuario->id : parent::loggedUser()->id;
        return $this->usuarioRepository->hasLotacao($usuarioId, $id, $subordinadas);
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
            $result = $this->setBuffer("atribuicoesGestor", $key, [
                "gestor" => $this->isIntegrante('GESTOR', $unidadeId, $usuarioId),
                "gestorSubstituto" => $this->isIntegrante('GESTOR_SUBSTITUTO', $unidadeId, $usuarioId),
                "gestorDelegado" => $this->isIntegrante('GESTOR_DELEGADO', $unidadeId, $usuarioId)
            ]);
        }
        return $result;
    }

    public function isGestorUnidade(string $unidadeId, $incluiDelegado = true): bool
    {
        if ($this->hasBuffer("isGestorUnidade", $unidadeId)) {
            return $this->getBuffer("isGestorUnidade", $unidadeId);
        } else {
            return $this->setBuffer("isGestorUnidade", $unidadeId, $this->isIntegrante('GESTOR', $unidadeId) || $this->isIntegrante('GESTOR_SUBSTITUTO', $unidadeId) || ($incluiDelegado && $this->isIntegrante('GESTOR_DELEGADO', $unidadeId)));
        }
    }

    public function isGestorUnidadeRecursivo(string $unidadeId, ?string $usuarioId = null): bool
    {
        $usuarioId = $usuarioId ?? $this->loggedUser()->id;
        return $this->usuarioRepository->isGestorUnidadeRecursivo($usuarioId, $unidadeId);
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

    public function isLotacao(string|null $usuario_id = null, string $unidade_id): bool
    {
        $usuarioId = isset($usuario_id) ? $usuario_id : parent::loggedUser()->id;
        return $this->usuarioRepository->isLotacao($usuarioId, $unidade_id);
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

    public function areasTrabalhoWhere($subordinadas, $usuario = null, $prefix = "")
    {
        $where = [];
        $prefix = empty($prefix) ? "" : $prefix . ".";
        $usuario = $usuario ?? parent::loggedUser();
        foreach ($usuario->areasTrabalho as $lotacao) {
            $where[] = $prefix . "id = '" . $lotacao->unidade_id . "'";
            if ($subordinadas)
                $where[] = $prefix . "path like '%" . $lotacao->unidade_id . "%'";
        }
        $result = implode(" OR ", $where);
        return empty($result) ? "false" : "(" . $result . ")";
    }

    public function proxyStore(&$data, $unidade, $action)
    {
        $data["with"] = [];
        $data['cpf'] = UtilService::onlyNumbers($data['cpf']);

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
        return Perfil::find($id);
    }

    public function validarPerfil($data) : void
    {
        $perfilAutenticado = $this::loggedUser()->perfil;
        if(!isset($data['perfil_id'])){
            return;
        }
        $perfilNovo = $this->findPerfil($data['perfil_id']);
        // Note: keeping getById here as it's ServiceBase method.
        // But getById calls getModel() which calls App($collection).
        // Since we override store/update/destroy/searchText, getById might still use old logic.
        // We should preferably override getById too or ensure it works.
        // ServiceBase getById uses Eloquent query.
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
        if (!in_array('usuario_externo', $data['fields'])) {
            $data['fields'][] = 'usuario_externo';
        }

        $data["where"][] = ["subordinadas", "==", true];

        $usuario = parent::loggedUser();
        if (!$usuario->hasPermissionTo("MOD_USER_TUDO")) {
            $subordinadas = true;
            foreach($data['where'] as $w) {
                 if(is_array($w) && $w[0] == "subordinadas") $subordinadas = $w[2];
            }

            $areasTrabalhoWhere = $this->areasTrabalhoWhere($subordinadas, null, "where_unidades");
            $data['where'][] = RawWhere::raw("EXISTS(SELECT where_lotacoes.id FROM lotacoes where_lotacoes LEFT JOIN unidades where_unidades ON (where_unidades.id = where_lotacoes.unidade_id) WHERE where_lotacoes.usuario_id = usuarios.id AND ($areasTrabalhoWhere))", []);
        }

        return $this->usuarioRepository->search($data);
    }

    public function getById($data)
    {
        // Override getById to use Repository
        // ServiceBase getById logic: with, id, deleted check.
        $id = is_array($data) ? $data['id'] : $data;
        $entity = $this->usuarioRepository->findById($id);
        
        if ($entity) {
            $rows = [$entity];
            $rows = method_exists($this, 'proxyRows') ? $this->proxyRows($rows) : $rows;
            return $rows[0];
        } else {
            throw new NotFoundException("Id não encontrado");
        }
    }
}

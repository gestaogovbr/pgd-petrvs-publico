<?php

namespace App\Services;

use App\Enums\PerfilEnum;
use App\Exceptions\NotFoundException;
use App\Exceptions\ServerException;
use App\Models\Usuario;
use App\Repository\OcorrenciaRepository;
use App\Repository\PlanoTrabalhoRepository;

class OcorrenciaService extends ServiceBase {

    protected OcorrenciaRepository $ocorrenciaRepository;

    protected PlanoTrabalhoRepository $planoTrabalhoRepository;

    public function __construct()
    {
        parent::__construct();
        $this->ocorrenciaRepository = app(OcorrenciaRepository::class);
        $this->planoTrabalhoRepository = app(PlanoTrabalhoRepository::class);
    }

    private function ocorrenciasRestritasAoProprioUsuario(): bool
    {
        $usuario = self::loggedUser();
        if (!$usuario || !$usuario->relationLoaded('perfil')) {
            $usuario = $usuario ? Usuario::with('perfil')->find($usuario->id) : null;
        }
        $nivel = $usuario?->perfil?->nivel;
        return $nivel !== null && (int) $nivel === PerfilEnum::PARTICIPANTE->value;
    }

    private function aplicarFiltroUsuarioLogado(array &$data): void
    {
        if (!$this->ocorrenciasRestritasAoProprioUsuario()) {
            return;
        }
        $uid = self::loggedUser()?->id;
        if ($uid) {
            $data['where'][] = ['usuario_id', '==', $uid];
        }
    }

    public function proxyQuery($query, &$data)
    {
        $this->aplicarFiltroUsuarioLogado($data);
    }

    public function proxySearch($query, &$data, &$text)
    {
        $this->aplicarFiltroUsuarioLogado($data);
    }

    public function getById($data)
    {
        $entity = parent::getById($data);
        if ($this->ocorrenciasRestritasAoProprioUsuario() && $entity->usuario_id !== self::loggedUser()?->id) {
            throw new NotFoundException("Id não encontrado");
        }
        return $entity;
    }

    public function searchKey($data)
    {
        $result = parent::searchKey($data);
        if (!$result || !$this->ocorrenciasRestritasAoProprioUsuario()) {
            return $result;
        }
        $entity = $result['entity'] ?? null;
        if ($entity && $entity->usuario_id !== self::loggedUser()?->id) {
            return null;
        }
        return $result;
    }

    public function proxyStore($dataOrEntity, $unidade, $action)
    {
        if ($this->ocorrenciasRestritasAoProprioUsuario() && $action === ServiceBase::ACTION_INSERT) {
            $dataOrEntity['usuario_id'] = self::loggedUser()->id;
        }
        return $dataOrEntity;
    }

    public function validateStore($data, $unidade, $action)
    {
        if ($this->ocorrenciasRestritasAoProprioUsuario()) {
            if ($action === ServiceBase::ACTION_EDIT) {
                $existente = $this->ocorrenciaRepository->findById((string) ($data['id'] ?? ''));
                if ($existente && $existente->usuario_id !== self::loggedUser()?->id) {
                    throw new ServerException("ValidateOcorrencia", "Edição não permitida para esta ocorrência");
                }
                if (($data['usuario_id'] ?? null) !== self::loggedUser()?->id) {
                    throw new ServerException("ValidateOcorrencia", "Ocorrência deve ser registrada para o próprio usuário");
                }
            }
        }

        if (!empty($data["plano_trabalho_id"])) {
            $planoTrabalho = $this->planoTrabalhoRepository->findById((string) $data["plano_trabalho_id"]);
            if (empty($planoTrabalho)) {
                throw new ServerException("ValidateOcorrencia", "Plano de trabalho da ocorrência não encontrado");
            }
            $between = UtilService::asTimestamp($planoTrabalho->data_inicio) <= UtilService::asTimestamp($data["data_fim"]) && UtilService::asTimestamp($planoTrabalho->data_fim) >= UtilService::asTimestamp($data["data_inicio"]);
            /* RN_OCOR_1 */
            if ($planoTrabalho->usuario_id != $data["usuario_id"]) {
                throw new ServerException("ValidateOcorrencia", "Usuário do Plano de Trabalho deve obrigatoriamente ser o mesmo da ocorrência. [RN_OCOR_1]");
            }
            /* RN_OCOR_2 */
            if (!$between) {
                throw new ServerException("ValidateOcorrencia", "Ocorrência vinculada a plano de trabalho deverá ter algum perído coincidente com o do plano. (de " . UtilService::getDateFormatted($planoTrabalho->data_inicio) . " à " . UtilService::getDateFormatted($planoTrabalho->data_fim) . ") [RN_OCOR_2]");
            }
        }
    }

}

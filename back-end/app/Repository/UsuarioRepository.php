<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Usuario;
use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;
use App\Repository\Usuario\Contracts\UsuarioWriteRepositoryContract;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class UsuarioRepository
{
    public function __construct(
        private readonly UsuarioReadRepositoryContract $readRepository,
        private readonly UsuarioWriteRepositoryContract $writeRepository,
    ) {
    }

    public function findById(string $id): ?Usuario
    {
        return $this->readRepository->findById($id);
    }

    public function findByCpfOrEmail(string $cpf, string $email, ?string $exceptId = null, bool $withTrashed = false): ?Usuario
    {
        return $this->readRepository->findByCpfOrEmail($cpf, $email, $exceptId, $withTrashed);
    }

    public function isParticipanteHabilitado(string $usuarioId, string $programaId): bool
    {
        return $this->readRepository->isParticipanteHabilitado($usuarioId, $programaId);
    }

    public function isIntegrante(string $usuarioId, string $unidadeId, string $atribuicao): bool
    {
        return $this->readRepository->isIntegrante($usuarioId, $unidadeId, $atribuicao);
    }

    public function isLotacao(string $usuarioId, string $unidadeId): bool
    {
        return $this->readRepository->isLotacao($usuarioId, $unidadeId);
    }

    public function search(array $params, int $limit = 0)
    {
        return $this->readRepository->search($params, $limit);
    }

    public function create(array $attributes): Usuario
    {
        return $this->writeRepository->create($attributes);
    }

    public function update(string $id, array $attributes): ?Usuario
    {
        return $this->writeRepository->update($id, $attributes);
    }

    public function delete(string $id): bool
    {
        return $this->writeRepository->delete($id);
    }

    public function updateFotoPerfil(string $usuarioId, string $tipo, string $url, string $downloadedUrl): bool
    {
        return $this->writeRepository->updateFotoPerfil($usuarioId, $tipo, $url, $downloadedUrl);
    }

    public function removerVinculos(string $usuarioId): void
    {
        $this->writeRepository->removerVinculos($usuarioId);
    }
}

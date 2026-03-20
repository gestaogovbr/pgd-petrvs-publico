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

    public function findById(string $id, $deleteTrashed = false): ?Usuario
    {
        return $this->readRepository->findById($id, $deleteTrashed);
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

    public function getAtribuicoes(string $usuarioId, string $unidadeId): array
    {
        return $this->readRepository->getAtribuicoes($usuarioId, $unidadeId);
    }

    public function isLotacao(string $usuarioId, string $unidadeId): bool
    {
        return $this->readRepository->isLotacao($usuarioId, $unidadeId);
    }

    public function findAllSemMatricula(): Collection
    {
        return $this->readRepository->findAllSemMatricula();
    }

    public function findByCpfAndLotacao(string $cpf, string $unidadeId, string $lotacaoAtribuicao = 'LOTADO'): ?Usuario
    {
        return $this->readRepository->findByCpfAndLotacao($cpf, $unidadeId, $lotacaoAtribuicao);
    }

    public function findAllByCpf(string $cpf): Collection
    {
        return $this->readRepository->findAllByCpf($cpf);
    }

    public function getUnidadesVinculadas(string $cpf): Collection
    {
        return $this->readRepository->getUnidadesVinculadas($cpf);
    }

    public function search(array $params, int $limit = 0)
    {
        return $this->readRepository->search($params, $limit);
    }

    public function create(array $attributes): Usuario
    {
        return $this->writeRepository->create($attributes);
    }

    public function newUsuario(array $attributes = []): Usuario
    {
        return $this->writeRepository->newUsuario($attributes);
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

    public function findByMatricula(string $matricula): ?Usuario
    {
        return $this->readRepository->findByMatricula($matricula);
    }

    public function findByEmail(string $email): ?Usuario
    {
        return $this->readRepository->findByEmail($email);
    }

    public function findActivesByCpf(string $cpf): Collection
    {
        return $this->readRepository->findActivesByCpf($cpf);
    }

    public function loadUserWithRelations(string $userId, string $entidadeId): ?Usuario
    {
        return $this->readRepository->loadUserWithRelations($userId, $entidadeId);
    }

    public function findWithAreaTrabalho(string $userId, string $unidadeId): ?Usuario
    {
        return $this->readRepository->findWithAreaTrabalho($userId, $unidadeId);
    }

    public function findByCpf(string $cpf): ?Usuario
    {
        return $this->readRepository->findByCpf($cpf);
    }

    public function findByCpfWithLotacao(string $cpf): Collection
    {
        return $this->readRepository->findByCpfWithLotacao($cpf);
    }

    public function findAllByCpfUnfiltered(string $cpf): Collection
    {
        return $this->readRepository->findAllByCpfUnfiltered($cpf);
    }

    public function restore(string $id): bool
    {
        return $this->writeRepository->restore($id);
    }
}

<?php

declare(strict_types=1);

namespace App\Repository\Usuario\Contracts;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Collection;

interface UsuarioReadRepositoryContract
{
    public function findById(string|int $id): ?Usuario;
    public function findByCpfOrEmail(string $cpf, string $email, ?string $exceptId = null, bool $withTrashed = false): ?Usuario;
    public function isParticipanteHabilitado(string $usuarioId, string $programaId): bool;
    public function isIntegrante(string $usuarioId, string $unidadeId, string $atribuicao): bool;
    public function getAtribuicoes(string $usuarioId, string $unidadeId): array;
    public function isLotacao(string $usuarioId, string $unidadeId): bool;
    public function findAllSemMatricula(): Collection;
    public function findByCpfAndLotacao(string $cpf, string $unidadeId, string $lotacaoAtribuicao = 'LOTADO'): ?Usuario;
    public function findAllByCpf(string $cpf): Collection;
    public function getUnidadesVinculadas(string $cpf): Collection;
    public function search(array $params, int $limit = 0);
    public function findByMatricula(string $matricula): ?Usuario;
    public function findByEmail(string $email): ?Usuario;
    public function findActiveByCpf(string $cpf): ?Usuario;
    public function loadUserWithRelations(string $userId, string $entidadeId): ?Usuario;
    public function findWithAreaTrabalho(string $userId, string $unidadeId): ?Usuario;
    public function findByCpf(string $cpf): ?Usuario;
}

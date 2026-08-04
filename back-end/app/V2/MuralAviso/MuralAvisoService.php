<?php

declare(strict_types=1);

namespace App\V2\MuralAviso;

use App\Enums\MuralAvisoDestinatario;
use App\Models\MuralAviso;
use App\Repository\MuralAviso\MuralAvisoRepository;
use App\Repository\MuralAvisoLeitura\MuralAvisoLeituraRepository;
use App\Repository\TenantRepository;
use App\V2\MuralAviso\DTOs\MuralAvisoPendenteDTO;
use App\V2\MuralAviso\DTOs\MuralAvisoStoreDTO;
use App\V2\MuralAviso\Validators\MuralAvisoAuthorizationValidator;
use App\V2\MuralAviso\Validators\MuralAvisoStoreValidator;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MuralAvisoService
{
    private const NIVEL_ORGAO_CENTRAL = 1;

    public function __construct(
        private readonly MuralAvisoRepository $repository,
        private readonly MuralAvisoLeituraRepository $leituraRepository,
        private readonly TenantRepository $tenantRepository,
        private readonly MuralAvisoStoreValidator $storeValidator,
        private readonly MuralAvisoAuthorizationValidator $authorizationValidator,
    ) {}

    /**
     * @param list<string> $tenantIds
     */
    public function query(array $tenantIds, int $nivelUsuario, int $perPage): LengthAwarePaginator
    {
        $filterTenantIds = $nivelUsuario === self::NIVEL_ORGAO_CENTRAL ? [] : $tenantIds;

        return $this->repository->paginateForPainel($filterTenantIds, $perPage);
    }

    public function show(string $id): MuralAviso
    {
        $aviso = $this->repository->findById($id);

        if ($aviso === null) {
            throw new \App\Exceptions\NotFoundException('Aviso não encontrado.');
        }

        return $aviso;
    }

    /**
     * @param list<string> $tenantIdsDoUsuario
     */
    public function store(
        MuralAvisoStoreDTO $dto,
        string $usuarioId,
        int $nivelUsuario,
        array $tenantIdsDoUsuario,
    ): MuralAviso {
        $this->storeValidator->validar(
            $dto->destinatario,
            $dto->tenantId,
            $nivelUsuario,
            $tenantIdsDoUsuario,
        );

        $remetenteTipo = $nivelUsuario === self::NIVEL_ORGAO_CENTRAL ? 'ORGAO_CENTRAL' : 'TENANT';
        $remetenteTenantId = $nivelUsuario !== self::NIVEL_ORGAO_CENTRAL ? $dto->tenantId : null;

        return $this->repository->create([
            'titulo' => $dto->titulo,
            'conteudo' => $dto->conteudo,
            'destinatario' => $dto->destinatario,
            'tenant_id' => $dto->destinatario === MuralAvisoDestinatario::TODOS->value ? null : $dto->tenantId,
            'remetente_tipo' => $remetenteTipo,
            'remetente_tenant_id' => $remetenteTenantId,
            'publicado_por_id' => $usuarioId,
            'data_publicacao' => now(),
        ]);
    }

    /**
     * @param list<string> $tenantIdsDoUsuario
     */
    public function update(
        string $id,
        MuralAvisoStoreDTO $dto,
        int $nivelUsuario,
        array $tenantIdsDoUsuario,
    ): MuralAviso {
        $this->authorizationValidator->validar($id, $nivelUsuario, $tenantIdsDoUsuario);

        $this->storeValidator->validar(
            $dto->destinatario,
            $dto->tenantId,
            $nivelUsuario,
            $tenantIdsDoUsuario,
        );

        $remetenteTipo = $nivelUsuario === self::NIVEL_ORGAO_CENTRAL ? 'ORGAO_CENTRAL' : 'TENANT';
        $remetenteTenantId = $nivelUsuario !== self::NIVEL_ORGAO_CENTRAL ? $dto->tenantId : null;

        /** @var MuralAviso */
        return $this->repository->update($id, [
            'titulo' => $dto->titulo,
            'conteudo' => $dto->conteudo,
            'destinatario' => $dto->destinatario,
            'tenant_id' => $dto->destinatario === MuralAvisoDestinatario::TODOS->value ? null : $dto->tenantId,
            'remetente_tipo' => $remetenteTipo,
            'remetente_tenant_id' => $remetenteTenantId,
            'data_publicacao' => now(),
        ]);
    }

    /**
     * @param list<string> $tenantIdsDoUsuario
     */
    public function destroy(string $id, int $nivelUsuario, array $tenantIdsDoUsuario): void
    {
        $this->authorizationValidator->validar($id, $nivelUsuario, $tenantIdsDoUsuario);

        $this->repository->delete($id);
    }

    /**
     * @return list<MuralAvisoPendenteDTO>
     */
    public function pendentes(string $usuarioId, string $tenantId): array
    {
        $leitura = $this->leituraRepository->findByUsuarioId($usuarioId);
        $dataConfirmacao = $leitura?->data_confirmacao;

        $avisos = $this->repository->findPendentes($tenantId, $dataConfirmacao);

        return array_map(
            fn (array $aviso) => MuralAvisoPendenteDTO::fromArray([
                'id' => $aviso['id'],
                'titulo' => $aviso['titulo'],
                'conteudo' => $aviso['conteudo'],
                'remetente' => $this->resolveRemetente($aviso),
                'data_publicacao' => $aviso['data_publicacao'],
            ]),
            $avisos,
        );
    }

    public function confirmarLeitura(string $usuarioId): void
    {
        $this->leituraRepository->upsert($usuarioId, now());
    }

    /**
     * @param array<string, mixed> $aviso
     */
    private function resolveRemetente(array $aviso): string
    {
        if ($aviso['remetente_tipo'] === 'ORGAO_CENTRAL') {
            return 'Órgão Central';
        }

        if (!empty($aviso['remetente_tenant_id'])) {
            $tenant = $this->tenantRepository->findById($aviso['remetente_tenant_id']);
            return $tenant?->id ?? 'Tenant';
        }

        return 'Sistema';
    }
}

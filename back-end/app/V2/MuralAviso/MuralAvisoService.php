<?php

declare(strict_types=1);

namespace App\V2\MuralAviso;

use App\Enums\MuralAvisoDestinatario;
use App\Enums\MuralAvisoRemetenteTipo;
use App\Exceptions\NotFoundException;
use App\Models\MuralAviso;
use App\Repository\MuralAviso\MuralAvisoRepository;
use App\Repository\MuralAvisoLeitura\MuralAvisoLeituraRepository;
use App\Repository\TenantRepository;
use App\V2\MuralAviso\DTOs\MuralAvisoDestroyDTO;
use App\V2\MuralAviso\DTOs\MuralAvisoPendenteDTO;
use App\V2\MuralAviso\DTOs\MuralAvisoQueryDTO;
use App\V2\MuralAviso\DTOs\MuralAvisoStoreDTO;
use App\V2\MuralAviso\Validators\MuralAvisoAuthorizationValidator;
use App\V2\MuralAviso\Validators\MuralAvisoStoreValidator;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class MuralAvisoService
{
    public function __construct(
        private readonly MuralAvisoRepository $repository,
        private readonly MuralAvisoLeituraRepository $leituraRepository,
        private readonly TenantRepository $tenantRepository,
        private readonly MuralAvisoStoreValidator $storeValidator,
        private readonly MuralAvisoAuthorizationValidator $authorizationValidator,
    ) {}

    public function index(MuralAvisoQueryDTO $dto): LengthAwarePaginator
    {
        return $this->repository->paginateForPainel($dto->getFilterTenantIds(), $dto->perPage);
    }

    public function show(string $id): MuralAviso
    {
        $aviso = $this->repository->findById($id);

        if ($aviso === null) {
            throw new NotFoundException('Aviso não encontrado.');
        }

        return $aviso;
    }

    public function store(MuralAvisoStoreDTO $dto): MuralAviso
    {
        $this->storeValidator->validar($dto);

        $remetenteTipo = $dto->isOrgaoCentral() ? MuralAvisoRemetenteTipo::ORGAO_CENTRAL : MuralAvisoRemetenteTipo::TENANT;
        $remetenteTenantId = $dto->isOrgaoCentral() ? null : $dto->tenantId;

        return $this->repository->create([
            'titulo' => $dto->titulo,
            'conteudo' => $dto->conteudo,
            'destinatario' => $dto->destinatario,
            'tenant_id' => $dto->destinatario === MuralAvisoDestinatario::TODOS->value ? null : $dto->tenantId,
            'remetente_tipo' => $remetenteTipo->value,
            'remetente_tenant_id' => $remetenteTenantId,
            'publicado_por_user_panel_id' => $dto->usuarioId,
            'data_publicacao' => $dto->dataPublicacao,
            'data_expiracao' => $dto->dataExpiracao,
        ]);
    }

    public function update(string $id, MuralAvisoStoreDTO $dto): MuralAviso
    {
        $this->authorizationValidator->validar($id, $dto->nivelUsuario, $dto->tenantIds);

        $this->storeValidator->validar($dto);

        $remetenteTipo = $dto->isOrgaoCentral() ? MuralAvisoRemetenteTipo::ORGAO_CENTRAL : MuralAvisoRemetenteTipo::TENANT;
        $remetenteTenantId = $dto->isOrgaoCentral() ? null : $dto->tenantId;

        /** @var MuralAviso */
        return $this->repository->update($id, [
            'titulo' => $dto->titulo,
            'conteudo' => $dto->conteudo,
            'destinatario' => $dto->destinatario,
            'tenant_id' => $dto->destinatario === MuralAvisoDestinatario::TODOS->value ? null : $dto->tenantId,
            'remetente_tipo' => $remetenteTipo->value,
            'remetente_tenant_id' => $remetenteTenantId,
            'data_publicacao' => $dto->dataPublicacao,
            'data_expiracao' => $dto->dataExpiracao,
        ]);
    }

    public function destroy(MuralAvisoDestroyDTO $dto): void
    {
        $this->authorizationValidator->validar($dto->id, $dto->nivelUsuario, $dto->tenantIds);

        $this->repository->delete($dto->id);
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
        if ($aviso['remetente_tipo'] === MuralAvisoRemetenteTipo::ORGAO_CENTRAL->value) {
            return 'Órgão Central';
        }

        if (!empty($aviso['remetente_tenant_id'])) {
            $tenant = $this->tenantRepository->findById($aviso['remetente_tenant_id']);
            return $tenant?->id ?? 'Tenant';
        }

        return 'Sistema';
    }
}

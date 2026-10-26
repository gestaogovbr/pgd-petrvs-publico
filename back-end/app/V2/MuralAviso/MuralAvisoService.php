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

        $aviso->load(['tenant', 'publicadoPor']);

        return $aviso;
    }

    public function store(MuralAvisoStoreDTO $dto): MuralAviso
    {
        $this->storeValidator->validar($dto);

        return $this->repository->create([
            'titulo' => $dto->titulo,
            'conteudo' => $dto->conteudo,
            'destinatario' => $dto->destinatario,
            'tenant_id' => $dto->destinatario === MuralAvisoDestinatario::TODOS->value ? null : $dto->tenantId,
            'remetente_tipo' => $dto->remetenteTipo()->value,
            'remetente_tenant_id' => $dto->remetenteTenantId(),
            'publicado_por_user_panel_id' => $dto->usuarioId,
            'data_publicacao' => $dto->dataPublicacao,
            'data_expiracao' => $dto->dataExpiracao,
        ]);
    }

    public function update(string $id, MuralAvisoStoreDTO $dto): MuralAviso
    {
        $this->authorizationValidator->validar($id, $dto->nivelUsuario, $dto->tenantIds);

        $this->storeValidator->validar($dto, $id);

        /** @var MuralAviso */
        return $this->repository->update($id, [
            'titulo' => $dto->titulo,
            'conteudo' => $dto->conteudo,
            'destinatario' => $dto->destinatario,
            'tenant_id' => $dto->destinatario === MuralAvisoDestinatario::TODOS->value ? null : $dto->tenantId,
            'remetente_tipo' => $dto->remetenteTipo()->value,
            'remetente_tenant_id' => $dto->remetenteTenantId(),
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
     * Retorna os avisos vigentes do usuário. Cada aviso recebe a flag `lido`
     * calculada por `data_publicacao <= data_confirmacao`. Quando
     * `$incluirLidos` for falso, os avisos já lidos são omitidos.
     *
     * @return list<MuralAvisoPendenteDTO>
     */
    public function vigentes(string $usuarioId, string $tenantId, bool $incluirLidos): array
    {
        $leitura = $this->leituraRepository->findByUsuarioId($usuarioId);
        $dataConfirmacao = $leitura?->data_confirmacao;

        $avisos = $this->repository->findVigentes($tenantId);

        $dtos = [];

        foreach ($avisos as $aviso) {
            $lido = $this->isLido($aviso['data_publicacao'], $dataConfirmacao);

            if (!$incluirLidos && $lido) {
                continue;
            }

            $dtos[] = MuralAvisoPendenteDTO::fromArray([
                'id' => $aviso['id'],
                'titulo' => $aviso['titulo'],
                'conteudo' => $aviso['conteudo'],
                'remetente' => $this->resolveRemetente($aviso),
                'data_publicacao' => $aviso['data_publicacao'],
                'lido' => $lido,
            ]);
        }

        // Mantém a ordem por origem/data vinda do repositório e empurra os lidos
        // para o final (ordenação estável a partir do PHP 8.0).
        usort($dtos, fn (MuralAvisoPendenteDTO $a, MuralAvisoPendenteDTO $b) => $a->lido <=> $b->lido);

        return $dtos;
    }

    private function isLido(string $dataPublicacao, ?\DateTimeInterface $dataConfirmacao): bool
    {
        if ($dataConfirmacao === null) {
            return false;
        }

        return new \DateTimeImmutable($dataPublicacao) <= $dataConfirmacao;
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

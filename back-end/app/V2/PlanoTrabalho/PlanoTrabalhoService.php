<?php

namespace App\V2\PlanoTrabalho;

use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoReadRepositoryContract;
use App\Repository\PlanoTrabalho\Contracts\PlanoTrabalhoWriteRepositoryContract;
use App\Repository\UnidadeRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoIndexValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoStoreValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoCancelarValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoDestroyValidator;
use App\V2\StatusService;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoUpdateValidator;
use App\Enums\StatusEnum;
use App\Exceptions\NotFoundException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class PlanoTrabalhoService
{
    public function __construct(
        private readonly PlanoTrabalhoReadRepositoryContract $readRepository,
        private readonly PlanoTrabalhoWriteRepositoryContract $writeRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly PlanoTrabalhoStoreValidator $storeValidacao,
        private readonly PlanoTrabalhoUpdateValidator $updateValidator,
        private readonly PlanoTrabalhoDestroyValidator $destroyValidator,
        private readonly PlanoTrabalhoCancelarValidator $cancelarValidator,
        private readonly PlanoTrabalhoIndexValidator $indexValidator,
        private readonly StatusService $statusService,
    ) {}


    public function index(array $data): LengthAwarePaginator
    {
        $filtro = PlanoTrabalhoIndexDTO::fromRequest($data, Auth::id());
        $filtro = $this->indexValidator->validar($filtro);

        if ($filtro->subordinadas && $filtro->unidadesId) {
            $idsBase = $filtro->unidadesId;
            $subordinadasIds = $this->unidadeRepository->getSubordinadasRecursivas($idsBase)->pluck('id')->toArray();
            $filtro = $filtro->withUnidadesId(array_merge($idsBase, $subordinadasIds));
        }

        return $this->readRepository->buscarPlanosListagem($filtro);
    }

    public function store(array $data): PlanoTrabalho
    {
        $dto = PlanoTrabalhoStoreDTO::fromArray($data, Auth::id());
        $this->storeValidacao->validarAutorizacao($dto);
        $this->storeValidacao->validar($dto);

        return $this->writeRepository->create($dto->toArray());
    }

    public function update(string $id, array $data): PlanoTrabalho
    {
        $plano = $this->readRepository->findById($id);

        if ($plano === null) {
            throw new NotFoundException( 'Plano de Trabalho não encontrado.');
        }

        $dto = PlanoTrabalhoStoreDTO::fromArray($data, Auth::id());
        $this->updateValidator->validar($dto);

        $updated = $this->writeRepository->update($id, $dto->toArray());

        if ($updated === null) {
            throw new NotFoundException( 'Não foi possível atualizar o Plano de Trabalho.');
        }

        return $updated;
    }

    public function show(string $id): PlanoTrabalho
    {
        $plano = $this->readRepository->findByIdComRelacoes($id);

        if ($plano === null) {
            throw new NotFoundException( 'Plano de Trabalho não encontrado.');
        }

        return $plano;
    }

    public function destroy(string $id): bool
    {
        $this->destroyValidator->validar($id, Auth::id());

        return $this->writeRepository->delete($id);
    }

    public function statuses(): array
    {
        return $this->readRepository->getStatuses();
    }

    public function cancelar(string $id, string $justificativa): PlanoTrabalho
    {
        $plano = $this->cancelarValidator->validar($id, Auth::id());

        $this->statusService->atualizaStatus(
            $plano,
            StatusEnum::CANCELADO->value,
            'Plano cancelado. Justificativa: ' . $justificativa,
        );

        return $plano;
    }
}

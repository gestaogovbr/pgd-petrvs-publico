<?php

namespace App\V2\PlanoTrabalho;

use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\V2\CalculadoraPeriodosAvaliativos;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoIndexValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoStoreValidator;
use App\V2\PlanoTrabalho\Validators\PlanoTrabalhoDestroyValidator;
use App\Exceptions\ServerException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class PlanoTrabalhoService
{
    protected PlanoTrabalhoRepository $planoTrabalhoRepository;
    protected UnidadeRepository $unidadeRepository;
    protected CalculadoraPeriodosAvaliativos $calculadora;
    protected PlanoTrabalhoStoreValidator $storeValidacao;
    protected PlanoTrabalhoDestroyValidator $destroyValidator;
    protected PlanoTrabalhoIndexValidator $indexValidator;

    public function __construct(
        PlanoTrabalhoRepository $planoTrabalhoRepository,
        UnidadeRepository $unidadeRepository,
        CalculadoraPeriodosAvaliativos $calculadora,
        PlanoTrabalhoStoreValidator $storeValidacao,
        PlanoTrabalhoDestroyValidator $destroyValidator,
        PlanoTrabalhoIndexValidator $indexValidator,

    ) {
        $this->planoTrabalhoRepository = $planoTrabalhoRepository;
        $this->unidadeRepository = $unidadeRepository;
        $this->calculadora = $calculadora;
        $this->storeValidacao = $storeValidacao;
        $this->destroyValidator = $destroyValidator;
        $this->indexValidator = $indexValidator;
    }

    public function index(array $data): LengthAwarePaginator
    {
        $filtro = PlanoTrabalhoIndexDTO::fromRequest($data, Auth::id());
        $this->indexValidator->validar($filtro);

        if ($filtro->subordinadas && $filtro->unidadesId) {
            $idsBase = $filtro->unidadesId;
            $subordinadasIds = $this->unidadeRepository->getSubordinadasRecursivas($idsBase)->pluck('id')->toArray();
            $filtro = $filtro->withUnidadesId(array_merge($idsBase, $subordinadasIds));
        }

        return $this->planoTrabalhoRepository->buscarPlanosListagem($filtro);
    }

    public function store(array $data): PlanoTrabalho
    {
        $dto = PlanoTrabalhoStoreDTO::fromArray($data, Auth::id());
        $this->storeValidacao->validarAutorizacao($dto);
        $this->storeValidacao->validar($dto);

        return $this->planoTrabalhoRepository->create($dto->toArray());
    }

    public function show(string $id): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findByIdComRelacoes($id);

        if ($plano === null) {
            throw new ServerException('PlanoTrabalhoNaoEncontrado', 'Plano de Trabalho não encontrado.');
        }

        return $plano;
    }

    public function destroy(string $id): bool
    {
        $this->destroyValidator->validar($id, Auth::id());

        return $this->planoTrabalhoRepository->delete($id);
    }

    public function statuses(): array
    {
        return $this->planoTrabalhoRepository->getStatuses();
    }
}

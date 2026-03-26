<?php

namespace App\V2\PlanoTrabalho;

use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\V2\CalculadoraPeriodosAvaliativos;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoListagemFiltro;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use App\V2\PlanoTrabalho\Validacoes\PlanoTrabalhoStoreValidacao;
use App\Exceptions\ServerException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class PlanoTrabalhoService
{
    protected PlanoTrabalhoRepository $planoTrabalhoRepository;
    protected UnidadeRepository $unidadeRepository;
    protected CalculadoraPeriodosAvaliativos $calculadora;
    protected PlanoTrabalhoStoreValidacao $storeValidacao;

    public function __construct(
        PlanoTrabalhoRepository $planoTrabalhoRepository,
        UnidadeRepository $unidadeRepository,
        CalculadoraPeriodosAvaliativos $calculadora,
        PlanoTrabalhoStoreValidacao $storeValidacao
    ) {
        $this->planoTrabalhoRepository = $planoTrabalhoRepository;
        $this->unidadeRepository = $unidadeRepository;
        $this->calculadora = $calculadora;
        $this->storeValidacao = $storeValidacao;
    }

    public function index(array $filters): LengthAwarePaginator
    {
        $filtro = PlanoTrabalhoListagemFiltro::fromArray($filters);

        if (($filters['subordinadas'] ?? null) && $filtro->unidadesId) {
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
        throw new ServerException("CapacidadeDestroy", "Um Plano de Trabalho não pode ser excluído.\n[ver RN_PTR_AB]");
    }
}

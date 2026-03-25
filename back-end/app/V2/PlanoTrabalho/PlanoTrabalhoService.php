<?php

namespace App\V2\PlanoTrabalho;

use App\Models\PlanoTrabalho;
use App\Models\Unidade;
use App\Models\Programa;
use App\Services\PlanoTrabalhoService as PlanoTrabalhoServiceV1;
use App\Repository\PlanoTrabalhoRepository;
use App\V2\CalculadoraPeriodosAvaliativos;
use App\Exceptions\ServerException;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Carbon\Carbon;

class PlanoTrabalhoService
{
    protected PlanoTrabalhoServiceV1 $v1;
    protected PlanoTrabalhoRepository $planoTrabalhoRepository;
    protected CalculadoraPeriodosAvaliativos $calculadora;

    public function __construct(PlanoTrabalhoServiceV1 $v1, PlanoTrabalhoRepository $planoTrabalhoRepository, CalculadoraPeriodosAvaliativos $calculadora)
    {
        $this->v1 = $v1;
        $this->planoTrabalhoRepository = $planoTrabalhoRepository;
        $this->calculadora = $calculadora;
    }

    public function index(array $filters): LengthAwarePaginator
    {
        $dataInicio = $filters['data_inicio'] ?? null;
        $dataFim = $filters['data_fim'] ?? null;
        $vigentes = $filters['vigentes'] ?? false;
        $arquivados = $filters['arquivados'] ?? false;
        $usuarioId = $filters['usuario_id'] ?? null;

        if (($dataInicio === null) !== ($dataFim === null)) {
            throw new ServerException("ValidateFiltros", "As datas de início e fim devem ser preenchidas juntas.");
        }

        if ($dataInicio === null && !$vigentes && !$arquivados && $usuarioId === null) {
            throw new ServerException("ValidateFiltros", "Informe ao menos um filtro para a busca.");
        }

        return $this->planoTrabalhoRepository->buscarPlanosListagem(
            $dataInicio,
            $dataFim,
            $vigentes,
            $arquivados,
            $usuarioId,
            (int) ($filters['page'] ?? 1),
            (int) ($filters['size'] ?? 15),
        );
    }

    public function store(array $entity, $unidade): PlanoTrabalho
    {
        $this->validarRegrasNegocio($entity, 'INSERT');
        return $this->v1->store($entity, $unidade);
    }

    public function update(array $entity, $unidade): PlanoTrabalho
    {
        $this->validarRegrasNegocio($entity, 'EDIT');
        return $this->v1->store($entity, $unidade);
    }

    public function getById(array $data)
    {
        return $this->v1->getById($data);
    }

    public function query(array $data): array
    {
        return $this->v1->query($data);
    }

    public function destroy(string $id): bool
    {
        throw new ServerException("CapacidadeDestroy", "Um Plano de Trabalho não pode ser excluído.\n[ver RN_PTR_AB]");
    }

    protected function validarRegrasNegocio(array $entity, string $action): void
    {
        $unidade = Unidade::find($entity['unidade_id']);
        if (!is_null($unidade?->data_inativacao)) {
            throw new ServerException("ValidatePlanoTrabalho", "A unidade está inativa.");
        }

        $programa = Programa::find($entity['programa_id']);
        $inicioPlano = Carbon::parse($entity['data_inicio']);
        $fimPlano = Carbon::parse($entity['data_fim']);

        if ($inicioPlano < $programa->data_inicio || $fimPlano > $programa->data_fim) {
            throw new ServerException("ValidatePlanoTrabalho", "As datas do plano de trabalho estão fora do período de vigência do regramento.");
        }

        $conflito = PlanoTrabalho::where('usuario_id', $entity['usuario_id'])
            ->where('data_inicio', '<=', $entity['data_fim'])
            ->where('data_fim', '>=', $entity['data_inicio'])
            ->where('status', '!=', 'CANCELADO')
            ->where('id', '!=', $entity['id'] ?? null)
            ->exists();

        if ($conflito) {
            throw new ServerException("ValidatePlanoTrabalho", "Este participante já possui plano de trabalho cadastrado para o período.");
        }

        if ($action === 'EDIT') {
            $plano = PlanoTrabalho::findOrFail($entity['id']);
            if ($entity['unidade_id'] !== $plano->unidade_id) {
                throw new ServerException("ValidatePlanoTrabalho", "Depois de criado, não é possível alterar a Unidade.\n[ver RN_PTR_AD]");
            }
            if ($entity['programa_id'] !== $plano->programa_id) {
                throw new ServerException("ValidatePlanoTrabalho", "Depois de criado, não é possível alterar o Programa.\n[ver RN_PTR_AD]");
            }
            if ($entity['usuario_id'] !== $plano->usuario_id) {
                throw new ServerException("ValidatePlanoTrabalho", "Depois de criado, não é possível alterar o Usuário.\n[ver RN_PTR_AE]");
            }
        }
    }
}

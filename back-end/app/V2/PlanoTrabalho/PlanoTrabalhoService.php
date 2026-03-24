<?php

namespace App\V2\PlanoTrabalho;

use App\Models\PlanoTrabalho;
use App\Models\Unidade;
use App\Models\Programa;
use App\Services\PlanoTrabalhoService as PlanoTrabalhoServiceV1;
use App\V2\CalculadoraPeriodosAvaliativos;
use App\Exceptions\ServerException;
use Carbon\Carbon;

class PlanoTrabalhoService
{
    protected PlanoTrabalhoServiceV1 $v1;
    protected CalculadoraPeriodosAvaliativos $calculadora;

    public function __construct(PlanoTrabalhoServiceV1 $v1, CalculadoraPeriodosAvaliativos $calculadora)
    {
        $this->v1 = $v1;
        $this->calculadora = $calculadora;
    }

    public function index(array $filters): array
    {
        return $this->v1->query(array_merge($filters, [
            'page' => 1,
            'limit' => 999,
        ]));
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

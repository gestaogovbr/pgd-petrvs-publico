<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Exceptions\ServerException;
use App\Repository\ProgramaRepository;
use App\Repository\UnidadeRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use Carbon\Carbon;

class PlanoTrabalhoUpdateValidator
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly ProgramaRepository $programaRepository,
    ) {}

    public function validar(PlanoTrabalhoStoreDTO $dto): void
    {
        $this->validarUnidadeAtiva($dto->unidadeId);
        $this->validarPeriodoDentroDoRegramento($dto);
    }

    private function validarUnidadeAtiva(string $unidadeId): void
    {
        $unidade = $this->unidadeRepository->findById($unidadeId);
        if (!is_null($unidade?->data_inativacao)) {
            throw new ServerException('ValidatePlanoTrabalho', 'A unidade está inativa.');
        }
    }

    private function validarPeriodoDentroDoRegramento(PlanoTrabalhoStoreDTO $dto): void
    {
        $programa = $this->programaRepository->findById($dto->programaId);
        $inicioPlano = Carbon::parse($dto->dataInicio);
        $fimPlano = Carbon::parse($dto->dataFim);

        if ($inicioPlano < $programa->data_inicio || $fimPlano > $programa->data_fim) {
            throw new ServerException('ValidatePlanoTrabalho', 'As datas do plano de trabalho estão fora do período de vigência do regramento.');
        }
    }
}
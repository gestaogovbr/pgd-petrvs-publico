<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Exceptions\ValidateException;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\ProgramaRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use Carbon\Carbon;

class PlanoTrabalhoUpdateValidator
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly ProgramaRepository $programaRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    public function validar(PlanoTrabalhoStoreDTO $dto, string $planoId): void
    {
        $this->validarUnidadeAtiva($dto->unidadeId);
        $this->validarParticipanteHabilitado($dto);
        $this->validarPeriodoDentroDoRegramento($dto);
        $this->validarConflitoPeriodo($dto, $planoId);
        $this->validarModalidadeDivergente($dto);
    }

    private function validarParticipanteHabilitado(PlanoTrabalhoStoreDTO $dto): void
    {
        if (!$this->usuarioRepository->isParticipanteHabilitado($dto->usuarioId, $dto->programaId)) {
            throw new ValidateException('O participante não está habilitado no PGD/SIAPE para o regramento selecionado.');
        }
    }

    private function validarUnidadeAtiva(string $unidadeId): void
    {
        $unidade = $this->unidadeRepository->findById($unidadeId);
        if (!is_null($unidade?->data_inativacao)) {
            throw new ValidateException('A unidade está inativa.');
        }
    }

    private function validarPeriodoDentroDoRegramento(PlanoTrabalhoStoreDTO $dto): void
    {
        $programa = $this->programaRepository->findById($dto->programaId);
        $inicioPlano = Carbon::parse($dto->dataInicio);
        $fimPlano = Carbon::parse($dto->dataFim);

        if ($inicioPlano < $programa->data_inicio || $fimPlano > $programa->data_fim) {
            throw new ValidateException('As datas do plano de trabalho estão fora do período de vigência do regramento.');
        }
    }

    private function validarConflitoPeriodo(PlanoTrabalhoStoreDTO $dto, string $planoId): void
    {
        if ($this->planoTrabalhoRepository->existeConflitoPeriodoExcluindo($dto->usuarioId, $dto->dataInicio, $dto->dataFim, $planoId)) {
            throw new ValidateException('Este participante já possui plano de trabalho cadastrado para o período.');
        }
    }

    private function validarModalidadeDivergente(PlanoTrabalhoStoreDTO $dto): void
    {
        $agente = $this->usuarioRepository->findById($dto->usuarioId);

        if ($agente->tipo_modalidade_id === $dto->tipoModalidadeId) {
            return;
        }

        if (empty($dto->justificativaModalidade)) {
            throw new ValidateException('Modalidade distinta daquela registrada no SIAPE. A justificativa é obrigatória.');
        }
    }
}

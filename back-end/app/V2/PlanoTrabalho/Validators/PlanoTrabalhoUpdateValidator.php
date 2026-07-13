<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Exceptions\ValidateException;
use App\Support\ModalidadePgd;
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
        $this->validarRegramentoVigente($dto);
        $this->validarPeriodoDentroDoRegramento($dto);
        $this->validarConflitoPeriodo($dto, $planoId);
        $this->validarModalidadeDivergente($dto);
    }

    private function validarRegramentoVigente(PlanoTrabalhoStoreDTO $dto): void
    {
        $programa = $this->programaRepository->findById($dto->programaId);

        if (!$programa) {
            throw new ValidateException('O Regramento informado não foi encontrado.');
        }

        $dataInicio = Carbon::parse($programa->data_inicio)->format('d/m/Y');
        $dataFim = Carbon::parse($programa->data_fim)->format('d/m/Y');

        if (!$this->programaRepository->isVigenteParaUnidade($dto->programaId, $dto->unidadeId, $dto->dataInicio, $dto->dataFim)) {
            throw new ValidateException("O período do plano de trabalho deve coincidir integralmente com o período do Regramento: {$dataInicio} a {$dataFim}");
        }
    }

    private function validarParticipanteHabilitado(PlanoTrabalhoStoreDTO $dto): void
    {
        $agente = $this->usuarioRepository->findById($dto->usuarioId);
        if ($agente->participa_pgd !== 'sim') {
            throw new ValidateException('O participante não está habilitado para participar do PGD.');
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
        $inicioPlano = Carbon::parse($dto->dataInicio);
        $fimPlano = Carbon::parse($dto->dataFim);

        if ($inicioPlano->diffInDays($fimPlano) > 365) {
            throw new ValidateException('O período do plano de trabalho não pode ser superior a 1 ano.');
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

        if (ModalidadePgd::normalize($agente->modalidade_pgd) === ModalidadePgd::normalize($dto->modalidadePgd)) {
            return;
        }

        if (empty($dto->justificativaModalidade)) {
            throw new ValidateException('Modalidade distinta daquela registrada no SIAPE. A justificativa é obrigatória.');
        }
    }
}

<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\ValidateException;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\ProgramaRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use Carbon\Carbon;

class PlanoTrabalhoStoreValidator
{
    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly ProgramaRepository $programaRepository,
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    public function validar(PlanoTrabalhoStoreDTO $dto): void
    {
        $this->validarUnidadeAtiva($dto->unidadeId);
        $this->validarParticipanteHabilitado($dto);
        $this->validarRegramentoVigente($dto);
        $this->validarPeriodoDentroDoRegramento($dto);
        $this->validarConflitoPeriodo($dto);
        $this->validarModalidadeDivergente($dto);
    }

    public function validarAutorizacao(PlanoTrabalhoStoreDTO $dto): void
    {
        $criador = $this->usuarioRepository->findById($dto->criacaoUsuarioId);
        $nivelCriador = $criador->perfil->nivel;

        if ($nivelCriador >= PerfilEnum::COLABORADOR->value) {
            throw new ForbiddenException('Usuário com este perfil não pode cadastrar plano de trabalho.');
        }

        if ($nivelCriador === PerfilEnum::PARTICIPANTE->value && !$dto->isPlanoCriadoParaSi()) {
            throw new ForbiddenException('Participante só pode cadastrar plano para si mesmo.');
        }

        $agente = $dto->isPlanoCriadoParaSi()
            ? $criador
            : $this->usuarioRepository->findById($dto->usuarioId);

        if ($agente->perfil->nivel >= PerfilEnum::COLABORADOR->value) {
            throw new ValidateException('Este usuário não pode ser agente público de um plano de trabalho.');
        }

        if (!$dto->isPlanoCriadoParaSi()) {
            $this->validarAgenteLotadoNasUnidadesDoCriador($dto);
        }
    }

    private function validarAgenteLotadoNasUnidadesDoCriador(PlanoTrabalhoStoreDTO $dto): void
    {
        if (!$this->unidadeRepository->hasUsuarioLotacao($dto->unidadeId, $dto->criacaoUsuarioId, true)) {
            throw new ForbiddenException('A unidade do plano não está no escopo de atuação do usuário logado.');
        }

        if (!$this->usuarioRepository->agenteEstaLotadoOuVinculadoNaUnidade($dto->usuarioId, $dto->unidadeId)) {
            throw new ForbiddenException('O agente público não está lotado ou vinculado na unidade do plano.');
        }
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

    private function validarConflitoPeriodo(PlanoTrabalhoStoreDTO $dto): void
    {
        if ($this->planoTrabalhoRepository->existeConflitoPeriodo($dto->usuarioId, $dto->dataInicio, $dto->dataFim)) {
            throw new ValidateException('Este participante já possui plano de trabalho cadastrado para o período.');
        }
    }

    private function validarModalidadeDivergente(PlanoTrabalhoStoreDTO $dto): void
    {
        $agente = $this->usuarioRepository->findById($dto->usuarioId);

        if ($agente->modalidade_pgd === $dto->modalidadePgd) {
            return;
        }

        if (empty($dto->justificativaModalidade)) {
            throw new ValidateException('Modalidade distinta daquela registrada no SIAPE. A justificativa é obrigatória.');
        }
    }

    private function validarParticipanteHabilitado(PlanoTrabalhoStoreDTO $dto): void
    {
        $agente = $this->usuarioRepository->findById($dto->usuarioId);
        if ($agente->participa_pgd !== 'sim') {
            throw new ValidateException('O participante não está habilitado para participar do PGD.');
        }
    }
}

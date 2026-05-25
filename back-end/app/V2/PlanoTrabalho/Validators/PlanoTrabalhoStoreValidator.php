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
        if (!$this->programaRepository->isVigenteParaUnidade($dto->programaId, $dto->unidadeId)) {
            throw new ValidateException('O regramento selecionado não está vigente para a unidade informada.');
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

        if ($inicioPlano->diffInDays($fimPlano) > 365) {
            throw new ValidateException('O período do plano de trabalho não pode ser superior a 1 ano.');
        }

        if ($inicioPlano < $programa->data_inicio || $fimPlano > $programa->data_fim) {
            throw new ValidateException('As datas do plano de trabalho estão fora do período de vigência do regramento.');
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
}

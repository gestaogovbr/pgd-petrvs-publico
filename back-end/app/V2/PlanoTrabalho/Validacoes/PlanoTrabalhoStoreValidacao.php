<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validacoes;

use App\Enums\PerfilEnum;
use App\Exceptions\ServerException;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\ProgramaRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoStoreDTO;
use Carbon\Carbon;

class PlanoTrabalhoStoreValidacao
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
        $this->validarPeriodoDentroDoRegramento($dto);
        $this->validarConflitoPeriodo($dto);
    }

    public function validarAutorizacao(PlanoTrabalhoStoreDTO $dto, string $criadorId): void
    {
        $criador = $this->usuarioRepository->findById($criadorId);
        $nivelCriador = $criador->perfil->nivel;

        if ($nivelCriador >= PerfilEnum::COLABORADOR->value) {
            throw new ServerException("ValidatePlanoTrabalho", "Usuário com este perfil não pode cadastrar plano de trabalho.");
        }

        if ($nivelCriador === PerfilEnum::PARTICIPANTE->value) {
            $this->validarParticipanteCadastraParaSi($dto, $criadorId);
            return;
        }

        $this->validarAgenteNaoEhColaborador($dto->usuarioId);
        $this->validarAgenteLotadoNasUnidadesDoCriador($dto);
    }

    private function validarParticipanteCadastraParaSi(PlanoTrabalhoStoreDTO $dto, string $criadorId): void
    {
        if ($dto->usuarioId !== $criadorId) {
            throw new ServerException("ValidatePlanoTrabalho", "Participante só pode cadastrar plano para si mesmo.");
        }
    }

    private function validarAgenteNaoEhColaborador(string $usuarioId): void
    {
        $agente = $this->usuarioRepository->findById($usuarioId);
        $nivelAgente = $agente->perfil->nivel;

        if ($nivelAgente >= PerfilEnum::COLABORADOR->value) {
            throw new ServerException("ValidatePlanoTrabalho", "Este usuário não pode ser agente público de um plano de trabalho.");
        }
    }

    private function validarAgenteLotadoNasUnidadesDoCriador(PlanoTrabalhoStoreDTO $dto): void
    {
        if (!$this->unidadeRepository->hasUsuarioLotacao($dto->unidadeId, $dto->usuarioId, true)) {
            throw new ServerException("ValidatePlanoTrabalho", "O agente público não está lotado ou vinculado nas unidades do usuário logado.");
        }
    }

    private function validarUnidadeAtiva(string $unidadeId): void
    {
        $unidade = $this->unidadeRepository->findById($unidadeId);
        if (!is_null($unidade?->data_inativacao)) {
            throw new ServerException("ValidatePlanoTrabalho", "A unidade está inativa.");
        }
    }

    private function validarPeriodoDentroDoRegramento(PlanoTrabalhoStoreDTO $dto): void
    {
        $programa = $this->programaRepository->findById($dto->programaId);
        $inicioPlano = Carbon::parse($dto->dataInicio);
        $fimPlano = Carbon::parse($dto->dataFim);

        if ($inicioPlano < $programa->data_inicio || $fimPlano > $programa->data_fim) {
            throw new ServerException("ValidatePlanoTrabalho", "As datas do plano de trabalho estão fora do período de vigência do regramento.");
        }
    }

    private function validarConflitoPeriodo(PlanoTrabalhoStoreDTO $dto): void
    {
        if ($this->planoTrabalhoRepository->existeConflitoPeriodo($dto->usuarioId, $dto->dataInicio, $dto->dataFim)) {
            throw new ServerException("ValidatePlanoTrabalho", "Este participante já possui plano de trabalho cadastrado para o período.");
        }
    }
}

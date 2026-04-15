<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Ocorrencia\Validators;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Afastamento;
use App\Models\PlanoTrabalho;
use App\Repository\PlanoTrabalhoRepository;
use App\Repository\UnidadeRepository;
use App\V2\PlanoTrabalho\Ocorrencia\DTOs\OcorrenciaStoreDTO;

class OcorrenciaStoreValidator
{
    public function __construct(
        private readonly PlanoTrabalhoRepository $planoTrabalhoRepository,
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function validarAutorizacao(string $planoTrabalhoId, string $usuarioLogadoId): PlanoTrabalho
    {
        $plano = $this->planoTrabalhoRepository->findById($planoTrabalhoId);

        if ($plano === null) {
            throw new NotFoundException('Plano de Trabalho não encontrado.');
        }

        if ($plano->usuario_id === $usuarioLogadoId) {
            return $plano;
        }

        if ($this->unidadeRepository->isUsuarioGestorRecursivo($plano->unidade_id, $usuarioLogadoId)) {
            return $plano;
        }

        throw new ForbiddenException('Usuário não tem permissão para registrar ocorrências neste Plano de Trabalho.');
    }

    public function validarStore(PlanoTrabalho $plano, OcorrenciaStoreDTO $dto): void
    {
        $semIntersecao = $dto->dataFim < $plano->data_inicio || $dto->dataInicio > $plano->data_fim;

        if ($semIntersecao) {
            throw new ValidateException('A ocorrência deve ter período coincidente com o do Plano de Trabalho.');
        }
    }

    public function validarExistencia(string $ocorrenciaId, PlanoTrabalho $plano): Afastamento
    {
        // TODO (#1984): mover para AfastamentoRepository::findByIdAndUsuario
        $afastamento = Afastamento::where('id', $ocorrenciaId)
            ->where('usuario_id', $plano->usuario_id)
            ->first();

        if ($afastamento === null) {
            throw new NotFoundException('Ocorrência não encontrada.');
        }

        return $afastamento;
    }
}

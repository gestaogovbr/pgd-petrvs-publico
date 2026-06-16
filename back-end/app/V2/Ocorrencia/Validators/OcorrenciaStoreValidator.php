<?php

declare(strict_types=1);

namespace App\V2\Ocorrencia\Validators;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Exceptions\ValidateException;
use App\Models\Afastamento;
use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\UnidadeRepository;
use App\V2\Ocorrencia\DTOs\OcorrenciaOperacaoDTO;
use App\V2\Ocorrencia\OcorrenciaImpactoPolicy;

class OcorrenciaStoreValidator
{
    public function __construct(
        private readonly AfastamentoRepository $afastamentoRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly OcorrenciaImpactoPolicy $impactoPolicy
    ) {}

    /**
     * Regras do card #2253
     * RN4: Consulta não pode CUD
     * RN5: Participante só para si mesmo
     * RN6: Demais perfis para si e terceiros da cadeia hierárquica
     */
    public function validarAutorizacao(string $usuarioAlvoId, string $usuarioLogadoId): void
    {
        if ($usuarioAlvoId === $usuarioLogadoId) {
            return;
        }

        $unidadesGerenciadas = $this->unidadeRepository->getUnidadesGerenciadas($usuarioLogadoId);

        if ($unidadesGerenciadas->isEmpty()) {
            throw new ForbiddenException('Usuário não tem permissão para registrar ocorrências para terceiros.');
        }

        $unidadeIds = $unidadesGerenciadas->pluck('id')->all();
        $unidadesSubordinadasIds = $this->unidadeRepository->getSubordinadasRecursivas($unidadeIds)->pluck('id')->all();

        $possuiVinculo = $this->afastamentoRepository->usuarioPossuiVinculoEmUnidades($usuarioAlvoId, $unidadesSubordinadasIds);

        if (!$possuiVinculo) {
            throw new ForbiddenException('Usuário não tem permissão para registrar ocorrências para este servidor.');
        }
    }

    public function validarExistencia(string $ocorrenciaId, string $usuarioAlvoId): Afastamento
    {
        $afastamento = $this->afastamentoRepository->findById($ocorrenciaId);

        if ($afastamento === null || $afastamento->usuario_id !== $usuarioAlvoId) {
            throw new NotFoundException('Ocorrência não encontrada.');
        }

        return $afastamento;
    }

    /**
     * Regras do card #2211
     * RN9: Avaliações fora do prazo de recurso não podem ser sobrescritas
     * RN10: Avaliações com recursos não podem ser sobrescritas
     */
    public function validarImpacto(OcorrenciaOperacaoDTO $dto): void
    {
        $impacto = $this->impactoPolicy->calcularImpacto($dto);

        if ($impacto->operacaoBloqueada) {
            throw new ValidateException("Não é possível {$dto->operacao} a ocorrência pois um dos períodos avaliativos abrangidos por ela tem avaliações que já não podem mais ser alteradas.");
        }
    }
}

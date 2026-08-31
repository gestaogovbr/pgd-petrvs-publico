<?php

declare(strict_types=1);

namespace App\V2\Ocorrencia\Validators;

use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\Afastamento;
use App\Repository\Afastamento\AfastamentoRepository;
use App\Repository\UnidadeRepository;

class OcorrenciaStoreValidator
{
    public function __construct(
        private readonly AfastamentoRepository $afastamentoRepository,
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    /**
     * RN5: Participante só para si mesmo
     * RN6: Demais perfis para si e terceiros da cadeia hierárquica
     */
    public function validarAutorizacao(string $usuarioAlvoId, string $usuarioLogadoId): void
    {
        if ($usuarioAlvoId === $usuarioLogadoId) {
            return;
        }

        $unidadeIds = $this->unidadeRepository->getGerenciadasComSubordinadasIds($usuarioLogadoId);

        if (empty($unidadeIds)) {
            throw new ForbiddenException('Usuário não tem permissão para registrar ocorrências para terceiros.');
        }

        $possuiVinculo = $this->afastamentoRepository->usuarioPossuiVinculoEmUnidades($usuarioAlvoId, $unidadeIds);

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
}

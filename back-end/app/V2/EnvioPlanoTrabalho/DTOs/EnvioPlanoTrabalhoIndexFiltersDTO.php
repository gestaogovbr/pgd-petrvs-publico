<?php

declare(strict_types=1);

namespace App\V2\EnvioPlanoTrabalho\DTOs;

/**
 * Filtros da listagem de envios de plano de trabalho (API v2).
 *
 * @see \App\Repository\EnvioPlanoTrabalho\Eloquent\EloquentEnvioPlanoTrabalhoReadRepository
 */
final class EnvioPlanoTrabalhoIndexFiltersDTO
{
    public function __construct(
        public readonly ?string $numero,
        public readonly ?string $unidadeId,
        public readonly ?string $status,
        public readonly ?string $alteracaoInicio,
        public readonly ?string $alteracaoFim,
        public readonly ?string $conclusaoInicio,
        public readonly ?string $conclusaoFim,
        public readonly ?string $envioInicio,
        public readonly ?string $envioFim,
    ) {}

    /**
     * @param array<string, mixed> $filters
     */
    public static function fromArray(array $filters): self
    {
        return new self(
            numero: self::trimmedStringOrNull($filters['numero'] ?? null),
            unidadeId: self::trimmedStringOrNull($filters['unidade_id'] ?? null),
            status: self::trimmedStringOrNull($filters['status'] ?? null),
            alteracaoInicio: self::dateStringOrNull($filters['alteracao_inicio'] ?? null),
            alteracaoFim: self::dateStringOrNull($filters['alteracao_fim'] ?? null),
            conclusaoInicio: self::dateStringOrNull($filters['conclusao_inicio'] ?? null),
            conclusaoFim: self::dateStringOrNull($filters['conclusao_fim'] ?? null),
            envioInicio: self::dateStringOrNull($filters['envio_inicio'] ?? null),
            envioFim: self::dateStringOrNull($filters['envio_fim'] ?? null),
        );
    }

    /**
     * Converte para o formato `where` esperado pelo repositório de envio de plano de trabalho.
     *
     * @return array<int, array{0: string, 1: mixed}>
     */
    public function toWhereArray(): array
    {
        $where = [];

        if ($this->numero !== null && $this->numero !== '') {
            $where[] = ['numero', $this->numero];
        }

        if ($this->unidadeId !== null && $this->unidadeId !== '') {
            $where[] = ['unidade_id', $this->unidadeId];
        }

        if ($this->status !== null && $this->status !== '' && $this->status !== 'Todos') {
            $this->appendStatusWhere($where, $this->status);
        }

        $pairs = [
            [$this->alteracaoInicio, 'updated_at_gte'],
            [$this->alteracaoFim, 'updated_at_lte'],
            [$this->conclusaoInicio, 'data_conclusao_envio_gte'],
            [$this->conclusaoFim, 'data_conclusao_envio_lte'],
            [$this->envioInicio, 'data_envio_api_pgd_gte'],
            [$this->envioFim, 'data_envio_api_pgd_lte'],
        ];
        foreach ($pairs as [$value, $whereKey]) {
            if ($value !== null && $value !== '') {
                $where[] = [$whereKey, $value];
            }
        }

        return $where;
    }

    /**
     * @param array<int, array{0: string, 1: mixed}> $where
     */
    private function appendStatusWhere(array &$where, string $status): void
    {
        $map = [
            'Não agendados' => 'isNaoAgendado',
            'Agendados' => 'isAgendado',
            'Enviados' => 'isEnviado',
            'Não enviados' => 'isNaoEnviado',
            'Pendentes' => 'isPendente',
            'Concluídos' => 'isConcluido',
            'Com falha' => 'isFalha',
        ];
        $field = $map[$status] ?? null;
        if ($field !== null) {
            $where[] = [$field, true];
        }
    }

    private static function trimmedStringOrNull(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }
        $s = trim((string) $value);

        return $s === '' ? null : $s;
    }

    private static function dateStringOrNull(mixed $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (string) $value;
    }
}

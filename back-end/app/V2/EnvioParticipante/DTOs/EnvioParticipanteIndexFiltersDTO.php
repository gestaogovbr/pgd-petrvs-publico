<?php

declare(strict_types=1);

namespace App\V2\EnvioParticipante\DTOs;

/**
 * Filtros da listagem de envios de participante (API v2).
 *
 * @see \App\Repository\EnvioUsuario\Eloquent\EloquentEnvioUsuarioReadRepository
 */
final class EnvioParticipanteIndexFiltersDTO
{
    public function __construct(
        public readonly ?string $cpf,
        public readonly ?string $nome,
        public readonly ?string $status,
        public readonly ?string $agendamentoInicio,
        public readonly ?string $agendamentoFim,
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
            cpf: self::trimmedStringOrNull($filters['cpf'] ?? null),
            nome: self::trimmedStringOrNull($filters['nome'] ?? null),
            status: self::trimmedStringOrNull($filters['status'] ?? null),
            agendamentoInicio: self::dateStringOrNull($filters['agendamento_inicio'] ?? null),
            agendamentoFim: self::dateStringOrNull($filters['agendamento_fim'] ?? null),
            conclusaoInicio: self::dateStringOrNull($filters['conclusao_inicio'] ?? null),
            conclusaoFim: self::dateStringOrNull($filters['conclusao_fim'] ?? null),
            envioInicio: self::dateStringOrNull($filters['envio_inicio'] ?? null),
            envioFim: self::dateStringOrNull($filters['envio_fim'] ?? null),
        );
    }

    /**
     * Converte para o formato `where` esperado pelo repositório de envio de usuário.
     *
     * @return array<int, array{0: string, 1: mixed}>
     */
    public function toWhereArray(): array
    {
        $where = [];

        if ($this->cpf !== null && $this->cpf !== '') {
            $where[] = ['cpf', $this->cpf];
        }

        if ($this->nome !== null && $this->nome !== '') {
            $where[] = ['nome', $this->nome];
        }

        if ($this->status !== null && $this->status !== '' && $this->status !== 'Todos') {
            $this->appendStatusWhere($where, $this->status);
        }

        $pairs = [
            [$this->agendamentoInicio, 'data_agendamento_envio_gte'],
            [$this->agendamentoFim, 'data_agendamento_envio_lte'],
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

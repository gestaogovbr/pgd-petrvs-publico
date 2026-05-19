<?php

declare(strict_types=1);

namespace App\V2\EnvioPlanoEntrega\DTOs;

use Illuminate\Support\Carbon;

/**
 * Filtros da listagem de envios de plano de entrega (API v2).
 *
 * @see \App\Repository\EnvioPlanoEntrega\Eloquent\EloquentEnvioPlanoEntregaReadRepository
 */
final class EnvioPlanoEntregaIndexFiltersDTO
{
    public function __construct(
        public readonly ?string $numero,
        public readonly ?string $nome,
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
            nome: self::trimmedStringOrNull($filters['nome'] ?? null),
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
     * Condições no formato triplo esperado pelo repositório (`[campo, operador, valor]`).
     *
     * @return array<int, array{0: string, 1: string, 2: mixed}>
     */
    public function toWhereArray(): array
    {
        $where = [];

        if ($this->numero !== null && $this->numero !== '') {
            $where[] = ['numero', 'like', '%'.str_replace(' ', '%', $this->numero).'%'];
        }

        if ($this->nome !== null && $this->nome !== '') {
            $where[] = ['nome', 'like', '%'.str_replace(' ', '%', $this->nome).'%'];
        }

        if ($this->unidadeId !== null && $this->unidadeId !== '') {
            $where[] = ['unidade_id', '==', $this->unidadeId];
        }

        if ($this->status !== null && $this->status !== '' && $this->status !== 'Todos') {
            $this->appendStatusWhere($where, $this->status);
        }

        if ($this->alteracaoInicio !== null && $this->alteracaoInicio !== '') {
            $where[] = ['updated_at', '>=', $this->alteracaoInicio];
        }

        if ($this->alteracaoFim !== null && $this->alteracaoFim !== '') {
            $fim = Carbon::parse($this->alteracaoFim)->addDay()->format('Y-m-d');
            $where[] = ['updated_at', '<', $fim];
        }

        if ($this->conclusaoInicio !== null && $this->conclusaoInicio !== '') {
            $where[] = ['data_conclusao_envio', '>=', $this->conclusaoInicio];
        }

        if ($this->conclusaoFim !== null && $this->conclusaoFim !== '') {
            $fim = Carbon::parse($this->conclusaoFim)->addDay()->format('Y-m-d');
            $where[] = ['data_conclusao_envio', '<', $fim];
        }

        if ($this->envioInicio !== null && $this->envioInicio !== '') {
            $where[] = ['data_envio_api_pgd', '>=', $this->envioInicio];
        }

        if ($this->envioFim !== null && $this->envioFim !== '') {
            $fim = Carbon::parse($this->envioFim)->addDay()->format('Y-m-d');
            $where[] = ['data_envio_api_pgd', '<', $fim];
        }

        return $where;
    }

    /**
     * @param array<int, array{0: string, 1: string, 2: mixed}> $where
     */
    private function appendStatusWhere(array &$where, string $status): void
    {
        $map = [
            'Não agendados' => ['data_agendamento_envio', '==', null],
            'Agendados' => ['data_agendamento_envio', '!=', null],
            'Enviados' => ['data_envio_api_pgd', '!=', null],
            'Não enviados' => ['data_envio_api_pgd', '==', null],
            'Pendentes' => ['envios_pendentes', '==', 1],
            'Com falha' => ['envio_com_falha', '==', 1],
            'Concluídos' => ['isConcluido', '==', true],
        ];
        $triplet = $map[$status] ?? null;
        if ($triplet !== null) {
            $where[] = $triplet;
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

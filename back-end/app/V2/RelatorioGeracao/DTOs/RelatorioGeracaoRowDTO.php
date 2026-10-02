<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao\DTOs;

use App\Enums\RelatorioGeracaoStatus;
use App\Enums\RelatorioGeracaoTipo;
use App\Models\RelatorioGeracao;
use DateTimeInterface;
use JsonSerializable;

final class RelatorioGeracaoRowDTO implements JsonSerializable
{
    public function __construct(
        public readonly string $id,
        public readonly string $tipo,
        public readonly string $nome,
        public readonly string $status,
        public readonly string $status_label,
        public readonly ?string $iniciado_em,
        public readonly ?string $finalizado_em,
        public readonly ?string $arquivo_nome,
        public readonly ?string $erro_mensagem,
        public readonly int $progresso_pagina,
        public readonly ?int $progresso_total,
        public readonly int $progresso_percentual,
    ) {
    }

    public static function fromModel(RelatorioGeracao $model): self
    {
        $status = $model->status instanceof RelatorioGeracaoStatus
            ? $model->status->value
            : (string) $model->status;

        $tipo = RelatorioGeracaoTipo::tryFrom((string) $model->tipo);

        return new self(
            id: (string) $model->id,
            tipo: (string) $model->tipo,
            nome: $tipo?->nomeExibicao() ?? (string) $model->nome,
            status: $status,
            status_label: $model->status_label,
            iniciado_em: self::dateToString($model->iniciado_em),
            finalizado_em: self::dateToString($model->finalizado_em),
            arquivo_nome: self::nullableString($model->arquivo_nome),
            erro_mensagem: self::nullableString($model->erro_mensagem),
            progresso_pagina: max(0, (int) ($model->progresso_pagina ?? 0)),
            progresso_total: self::nullablePositiveInt($model->progresso_total),
            progresso_percentual: self::percentual($model->progresso_pagina ?? 0, $model->progresso_total),
        );
    }

    /**
     * @return array<string, mixed>
     */
    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'tipo' => $this->tipo,
            'nome' => $this->nome,
            'status' => $this->status,
            'status_label' => $this->status_label,
            'iniciado_em' => $this->iniciado_em,
            'finalizado_em' => $this->finalizado_em,
            'arquivo_nome' => $this->arquivo_nome,
            'erro_mensagem' => $this->erro_mensagem,
            'progresso_pagina' => $this->progresso_pagina,
            'progresso_total' => $this->progresso_total,
            'progresso_percentual' => $this->progresso_percentual,
        ];
    }

    private static function dateToString(mixed $value): ?string
    {
        if ($value instanceof DateTimeInterface) {
            return $value->format(DateTimeInterface::ATOM);
        }

        $asString = self::nullableString($value);

        return $asString;
    }

    private static function nullableString(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $asString = trim((string) $value);

        return $asString === '' ? null : $asString;
    }

    private static function nullablePositiveInt(mixed $value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        $asInt = (int) $value;

        return $asInt > 0 ? $asInt : null;
    }

    private static function percentual(mixed $pagina, mixed $total): int
    {
        $paginaAtual = max(0, (int) $pagina);
        $totalPaginas = (int) ($total ?? 0);
        if ($totalPaginas <= 0) {
            return 0;
        }

        return min(100, (int) floor(($paginaAtual / $totalPaginas) * 100));
    }
}

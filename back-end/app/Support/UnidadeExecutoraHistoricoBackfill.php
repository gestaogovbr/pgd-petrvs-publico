<?php

declare(strict_types=1);

namespace App\Support;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Monta o histórico inicial de unidade executora a partir da data da regra
 * e do flag atual, sem consultar audits.
 */
final class UnidadeExecutoraHistoricoBackfill
{
    public const DATA_IMPLANTACAO_REGRA = '2025-10-29';

    public function popular(): void
    {
        $now = now()->toDateTimeString();

        DB::table('unidades')
            ->whereNull('deleted_at')
            ->orderBy('id')
            ->chunkById(200, function ($unidades) use ($now): void {
                $rows = [];

                foreach ($unidades as $unidade) {
                    $periodo = $this->montarPeriodo(
                        (bool) $unidade->executora,
                        $unidade->created_at !== null ? (string) $unidade->created_at : null,
                    );

                    $rows[] = [
                        'id' => (string) Str::uuid(),
                        'unidade_id' => $unidade->id,
                        'executora' => $periodo['executora'],
                        'data_inicio' => $periodo['data_inicio'],
                        'data_fim' => $periodo['data_fim'],
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                }

                if ($rows !== []) {
                    DB::table('unidades_executora_historico')->insert($rows);
                }
            }, 'id');
    }

    /**
     * @return array{executora: bool, data_inicio: string, data_fim: ?string}
     */
    public function montarPeriodo(bool $executoraAtual, ?string $unidadeCreatedAt): array
    {
        return [
            'executora' => $executoraAtual,
            'data_inicio' => $this->resolverPiso($unidadeCreatedAt),
            'data_fim' => null,
        ];
    }

    public function resolverPiso(?string $unidadeCreatedAt): string
    {
        if ($unidadeCreatedAt === null || $unidadeCreatedAt === '') {
            return self::DATA_IMPLANTACAO_REGRA;
        }

        $criacao = Carbon::parse($unidadeCreatedAt)->toDateString();

        return $criacao > self::DATA_IMPLANTACAO_REGRA
            ? $criacao
            : self::DATA_IMPLANTACAO_REGRA;
    }
}

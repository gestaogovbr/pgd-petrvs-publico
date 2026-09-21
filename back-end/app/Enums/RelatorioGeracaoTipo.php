<?php

namespace App\Enums;

enum RelatorioGeracaoTipo: string
{
    case PLANO_TRABALHO = 'plano_trabalho';
    case PLANO_TRABALHO_DETALHADO = 'plano_trabalho_detalhado';

    public function nome(): string
    {
        return match ($this) {
            self::PLANO_TRABALHO => 'Relatório de Planos de Trabalho',
            self::PLANO_TRABALHO_DETALHADO => 'Relatório de Planos de Trabalho (Períodos Avaliativos)',
        };
    }

    public function nomeExibicao(): string
    {
        return match ($this) {
            self::PLANO_TRABALHO, self::PLANO_TRABALHO_DETALHADO => 'Planos de Trabalho',
        };
    }

    public function grupo(): string
    {
        return match ($this) {
            self::PLANO_TRABALHO, self::PLANO_TRABALHO_DETALHADO => 'planos_trabalho',
        };
    }

    /**
     * @return list<string>
     */
    public static function grupos(): array
    {
        return array_values(array_unique(array_map(
            static fn (self $tipo): string => $tipo->grupo(),
            self::cases(),
        )));
    }

    /**
     * @return list<string>
     */
    public static function valuesByGrupo(string $grupo): array
    {
        return array_values(array_map(
            static fn (self $tipo): string => $tipo->value,
            array_filter(
                self::cases(),
                static fn (self $tipo): bool => $tipo->grupo() === $grupo,
            ),
        ));
    }

    public static function grupoDe(string $value): ?string
    {
        if (in_array($value, self::grupos(), true)) {
            return $value;
        }

        return self::tryFrom($value)?->grupo();
    }

    public function arquivoNome(): string
    {
        return match ($this) {
            self::PLANO_TRABALHO => 'relatorio-planos-trabalho.xlsx',
            self::PLANO_TRABALHO_DETALHADO => 'relatorio-planos-trabalho-detalhado.xlsx',
        };
    }

    public function capacidade(): string
    {
        return match ($this) {
            self::PLANO_TRABALHO, self::PLANO_TRABALHO_DETALHADO => 'MOD_RELATORIO_PT',
        };
    }
}

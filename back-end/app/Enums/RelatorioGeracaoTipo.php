<?php

namespace App\Enums;

enum RelatorioGeracaoTipo: string
{
    case PLANO_TRABALHO = 'plano_trabalho';
    case PLANO_TRABALHO_DETALHADO = 'plano_trabalho_detalhado';
    case PLANO_ENTREGA = 'plano_entrega';
    case AGENTE = 'agente';
    case UNIDADE = 'unidade';
    case ENTREGA = 'entrega';
    case LACUNA_PLANO_TRABALHO = 'lacuna_plano_trabalho';

    public function nome(): string
    {
        return match ($this) {
            self::PLANO_TRABALHO => 'Relatório de Planos de Trabalho',
            self::PLANO_TRABALHO_DETALHADO => 'Relatório de Planos de Trabalho (Períodos Avaliativos)',
            self::PLANO_ENTREGA => 'Relatório de Planos de Entrega',
            self::AGENTE => 'Relatório de Agentes Públicos',
            self::UNIDADE => 'Relatório de Unidades',
            self::ENTREGA => 'Relatório de Entregas',
            self::LACUNA_PLANO_TRABALHO => 'Relatório de Lacunas de Planos de Trabalho',
        };
    }

    public function nomeExibicao(): string
    {
        return match ($this) {
            self::PLANO_TRABALHO, self::PLANO_TRABALHO_DETALHADO => 'Planos de Trabalho',
            self::PLANO_ENTREGA => 'Planos de Entrega',
            self::AGENTE => 'Agentes Públicos',
            self::UNIDADE => 'Unidades',
            self::ENTREGA => 'Entregas',
            self::LACUNA_PLANO_TRABALHO => 'Lacunas de Planos de Trabalho',
        };
    }

    public function grupo(): string
    {
        return match ($this) {
            self::PLANO_TRABALHO, self::PLANO_TRABALHO_DETALHADO => 'planos_trabalho',
            self::PLANO_ENTREGA => 'planos_entrega',
            self::AGENTE => 'agentes',
            self::UNIDADE => 'unidades',
            self::ENTREGA => 'entregas',
            self::LACUNA_PLANO_TRABALHO => 'lacunas_plano_trabalho',
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
            self::PLANO_ENTREGA => 'relatorio-planos-entrega.xlsx',
            self::AGENTE => 'relatorio-agentes.xlsx',
            self::UNIDADE => 'relatorio-unidades.xlsx',
            self::ENTREGA => 'relatorio_entregas.xlsx',
            self::LACUNA_PLANO_TRABALHO => 'relatorio-lacunas-plano-trabalho.xlsx',
        };
    }
}

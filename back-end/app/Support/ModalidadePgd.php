<?php

namespace App\Support;

final class ModalidadePgd
{
    public const PRESENCIAL = 'presencial';
    public const PARCIAL = 'parcial';
    public const INTEGRAL = 'integral';
    public const NO_EXTERIOR_SUBSTITUICAO = 'no exterior substituicao';
    public const NO_EXTERIOR = 'no exterior';

    /** @var array<string, string> */
    private const LABELS = [
        self::PRESENCIAL => 'Presencial',
        self::PARCIAL => 'Teletrabalho (Parcial)',
        self::INTEGRAL => 'Teletrabalho (Integral)',
        self::NO_EXTERIOR_SUBSTITUICAO => 'Teletrabalho no exterior (substituição)',
        self::NO_EXTERIOR => 'Teletrabalho no exterior',
    ];

    /** @var array<string, int> */
    private const API_PGD_CODES = [
        self::PRESENCIAL => 1,
        self::PARCIAL => 2,
        self::INTEGRAL => 3,
        self::NO_EXTERIOR_SUBSTITUICAO => 4,
        self::NO_EXTERIOR => 5,
    ];

    /** @var array<int, string> */
    private const MODALIDADES_COM_PEDAGIO = [
        self::PARCIAL,
        self::INTEGRAL,
        self::NO_EXTERIOR_SUBSTITUICAO,
        self::NO_EXTERIOR,
    ];

    public static function normalize(mixed $value): ?string
    {
        if (!is_scalar($value)) {
            return null;
        }

        $original = trim((string) $value);
        if ($original === '') {
            return null;
        }

        $normalized = self::normalizeText($original);

        return match (true) {
            $normalized === self::PRESENCIAL,
            str_contains($normalized, 'presencial') => self::PRESENCIAL,

            $normalized === self::PARCIAL,
            str_contains($normalized, 'parcial') => self::PARCIAL,

            $normalized === self::INTEGRAL,
            str_contains($normalized, 'integral') => self::INTEGRAL,

            $normalized === self::NO_EXTERIOR_SUBSTITUICAO,
            str_contains($normalized, 'substituicao'),
            str_contains($normalized, 'inciso viii') => self::NO_EXTERIOR_SUBSTITUICAO,

            $normalized === self::NO_EXTERIOR,
            str_contains($normalized, 'exterior') => self::NO_EXTERIOR,

            default => mb_strtolower($original, 'UTF-8'),
        };
    }

    public static function label(mixed $value): string
    {
        $modalidade = self::normalize($value);

        if ($modalidade === null) {
            return 'Não definida';
        }

        return self::LABELS[$modalidade] ?? (string) $value;
    }

    public static function apiPgdCode(mixed $value): ?int
    {
        $modalidade = self::normalize($value);

        return $modalidade === null ? null : (self::API_PGD_CODES[$modalidade] ?? null);
    }

    public static function exigePedagio(mixed $value): bool
    {
        $modalidade = self::normalize($value);

        return in_array($modalidade, self::MODALIDADES_COM_PEDAGIO, true);
    }

    public static function atividadeEsforco(mixed $value): bool
    {
        return false;
    }

    public static function atividadeTempoDespendido(mixed $value): bool
    {
        return false;
    }

    public static function calculaHorasPlanoTrabalho(mixed $value): bool
    {
        return false;
    }

    public static function sqlLabelExpression(string $column): string
    {
        return "CASE " .
            "WHEN {$column} IS NULL OR {$column} = '' THEN 'Não definida' " .
            "WHEN LOWER({$column}) = 'presencial' THEN 'Presencial' " .
            "WHEN LOWER({$column}) = 'parcial' THEN 'Teletrabalho (Parcial)' " .
            "WHEN LOWER({$column}) = 'integral' THEN 'Teletrabalho (Integral)' " .
            "WHEN LOWER({$column}) = 'no exterior substituicao' THEN 'Teletrabalho no exterior (substituição)' " .
            "WHEN LOWER({$column}) = 'no exterior' THEN 'Teletrabalho no exterior' " .
            "ELSE {$column} END";
    }

    /** @return array<int, array{key: string, value: string}> */
    public static function options(): array
    {
        return array_map(
            fn (string $key, string $label): array => ['key' => $key, 'value' => $label],
            array_keys(self::LABELS),
            self::LABELS
        );
    }

    private static function normalizeText(string $value): string
    {
        $value = mb_strtolower($value, 'UTF-8');
        $from = ['á', 'à', 'â', 'ã', 'ä', 'é', 'ê', 'è', 'í', 'ì', 'î', 'ó', 'ô', 'õ', 'ò', 'ö', 'ú', 'ù', 'û', 'ü', 'ç'];
        $to = ['a', 'a', 'a', 'a', 'a', 'e', 'e', 'e', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'c'];

        return str_replace($from, $to, $value);
    }
}

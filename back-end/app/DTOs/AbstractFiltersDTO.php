<?php

declare(strict_types=1);

namespace App\DTOs;

/**
 * Helpers compartilhados de normalização de filtros de listagem/consulta.
 */
abstract class AbstractFiltersDTO
{
    protected static function toBool(mixed $value): bool
    {
        if (is_bool($value)) {
            return $value;
        }

        return in_array((string) $value, ['1', 'true', 'on', 'yes'], true);
    }

    protected static function trimmedStringOrNull(mixed $value): ?string
    {
        if ($value === null) {
            return null;
        }
        $s = trim((string) $value);

        return $s === '' ? null : $s;
    }

    protected static function likeValueOrNull(mixed $value): ?string
    {
        $s = static::trimmedStringOrNull($value);
        if ($s === null) {
            return null;
        }

        $stripped = trim($s, '%');

        return $stripped === '' ? null : $stripped;
    }

    protected static function dateStringOrNull(mixed $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        return substr((string) $value, 0, 10);
    }

    protected static function dateString(mixed $value): string
    {
        return static::dateStringOrNull($value) ?? '';
    }

    protected static function intOrNull(mixed $value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (int) $value;
    }

    /**
     * @param array<int, mixed> $where
     */
    protected static function valorWhere(array $where, string $campo): mixed
    {
        foreach ($where as $condition) {
            if (! is_array($condition) || ! isset($condition[0])) {
                continue;
            }

            if ((string) $condition[0] === $campo) {
                return $condition[2] ?? null;
            }
        }

        return null;
    }

    /**
     * @param array<int, mixed> $where
     */
    protected static function temWhere(array $where, string $campo): bool
    {
        foreach ($where as $condition) {
            if (! is_array($condition) || ! isset($condition[0])) {
                continue;
            }

            if ((string) $condition[0] === $campo) {
                return true;
            }
        }

        return false;
    }
}

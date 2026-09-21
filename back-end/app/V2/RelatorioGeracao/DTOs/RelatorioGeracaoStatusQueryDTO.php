<?php

declare(strict_types=1);

namespace App\V2\RelatorioGeracao\DTOs;

final class RelatorioGeracaoStatusQueryDTO
{
    /**
     * @param list<string> $ids
     */
    public function __construct(
        public readonly array $ids,
    ) {
    }

    /**
     * @param array<string, mixed> $validated
     */
    public static function fromValidatedRequest(array $validated): self
    {
        $ids = is_array($validated['ids'] ?? null) ? $validated['ids'] : [];
        $normalized = [];
        foreach ($ids as $id) {
            $value = trim((string) $id);
            if ($value === '') {
                continue;
            }
            $normalized[] = $value;
        }

        return new self(ids: array_values(array_unique($normalized)));
    }
}

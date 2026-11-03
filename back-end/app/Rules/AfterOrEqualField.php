<?php

declare(strict_types=1);

namespace App\Rules;

use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Arr;

/**
 * Valida que a data do atributo é igual ou posterior à data de outro campo.
 *
 * Substitui a regra nativa `after_or_equal:<campo>`, que força o Carbon a
 * tentar parsear o NOME do campo como data antes de resolver o valor,
 * emitindo o warning "DateTime::modify(): Failed to parse time string".
 * Aqui o nome do campo nunca chega ao parser: lemos diretamente o valor
 * do campo irmão a partir dos dados em validação.
 */
class AfterOrEqualField implements ValidationRule, DataAwareRule
{
    /** @var array<string, mixed> */
    private array $data = [];

    public function __construct(
        private readonly string $otherField,
        private readonly string $message = 'A data deve ser igual ou posterior à data de referência.',
    ) {
    }

    /** @param array<string, mixed> $data */
    public function setData(array $data): static
    {
        $this->data = $data;

        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $other = Arr::get($this->data, $this->otherField);

        if (blank($value) || blank($other)) {
            return;
        }

        $valueDate = $this->parse($value);
        $otherDate = $this->parse($other);

        if ($valueDate === null || $otherDate === null) {
            return;
        }

        if ($valueDate->lt($otherDate)) {
            $fail($this->message);
        }
    }

    private function parse(mixed $value): ?Carbon
    {
        if (! is_string($value) && ! is_numeric($value)) {
            return null;
        }

        try {
            return Carbon::parse($value);
        } catch (\Throwable) {
            return null;
        }
    }
}

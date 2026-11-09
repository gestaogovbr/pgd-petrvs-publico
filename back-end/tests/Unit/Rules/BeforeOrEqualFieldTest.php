<?php

use App\Rules\BeforeOrEqualField;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;

uses(TestCase::class);

/**
 * Executa o validator capturando qualquer warning/notice do PHP.
 *
 * @param  array<string, mixed>  $data
 * @return array{fails: bool, first: string|null, warnings: list<string>}
 */
function runBeforeOrEqualFieldValidation(array $data): array
{
    $warnings = [];
    set_error_handler(function (int $errno, string $errstr) use (&$warnings): bool {
        $warnings[] = $errstr;
        return true;
    });

    try {
        $validator = Validator::make($data, [
            'data_inicio' => ['nullable', 'date', new BeforeOrEqualField('data_fim', 'inicio <= fim')],
        ]);

        $fails = $validator->fails();
        $first = $validator->errors()->first('data_inicio') ?: null;
    } finally {
        restore_error_handler();
    }

    return ['fails' => $fails, 'first' => $first, 'warnings' => $warnings];
}

test('passa quando data_inicio é anterior a data_fim', function () {
    $result = runBeforeOrEqualFieldValidation([
        'data_inicio' => '2026-01-01',
        'data_fim' => '2026-02-01',
    ]);

    expect($result['fails'])->toBeFalse();
    expect($result['warnings'])->toBeEmpty();
});

test('passa quando data_inicio é igual a data_fim', function () {
    $result = runBeforeOrEqualFieldValidation([
        'data_inicio' => '2026-02-01',
        'data_fim' => '2026-02-01',
    ]);

    expect($result['fails'])->toBeFalse();
});

test('falha quando data_inicio é posterior a data_fim', function () {
    $result = runBeforeOrEqualFieldValidation([
        'data_inicio' => '2026-03-01',
        'data_fim' => '2026-02-01',
    ]);

    expect($result['fails'])->toBeTrue();
    expect($result['first'])->toBe('inicio <= fim');
});

test('não falha quando o campo de referência está ausente', function () {
    $result = runBeforeOrEqualFieldValidation([
        'data_inicio' => '2026-02-01',
    ]);

    expect($result['fails'])->toBeFalse();
});

test('não falha quando o valor avaliado está ausente', function () {
    $result = runBeforeOrEqualFieldValidation([
        'data_fim' => '2026-02-01',
    ]);

    expect($result['fails'])->toBeFalse();
});

test('não emite warning de DateTime::modify ao referenciar o nome do campo', function () {
    $result = runBeforeOrEqualFieldValidation([
        'data_inicio' => '2026-03-01',
        'data_fim' => '2026-02-01',
    ]);

    $temWarningDateTime = collect($result['warnings'])
        ->contains(fn (string $w) => str_contains($w, 'DateTime::modify'));

    expect($temWarningDateTime)->toBeFalse();
});

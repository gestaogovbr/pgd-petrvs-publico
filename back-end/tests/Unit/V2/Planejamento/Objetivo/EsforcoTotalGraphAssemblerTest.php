<?php

use App\V2\Planejamento\Objetivo\EsforcoTotalGraphAssembler;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->assembler = new EsforcoTotalGraphAssembler();
});

/**
 * @return stdClass{
 *     objetivo_id: string,
 *     objetivo_nome: string,
 *     objetivo_pai_id: ?string,
 *     objetivo_superior_id: ?string,
 *     planejamento_nome: string,
 *     total_entregas: int,
 *     esforco_proprio: float
 * }
 */
function linhaEsforcoObjetivo(
    string $id,
    string $nome,
    float $esforcoProprio = 0.0,
    ?string $paiId = null,
    ?string $superiorId = null,
    int $totalEntregas = 0,
): stdClass {
    return (object) [
        'objetivo_id' => $id,
        'objetivo_nome' => $nome,
        'objetivo_pai_id' => $paiId,
        'objetivo_superior_id' => $superiorId,
        'planejamento_nome' => 'Planejamento Teste',
        'total_entregas' => $totalEntregas,
        'esforco_proprio' => $esforcoProprio,
    ];
}

describe('EsforcoTotalGraphAssembler::assemble', function () {

    test('retorna array vazio quando não há linhas', function () {
        $result = $this->assembler->assemble([], fn () => []);

        expect($result)->toBe([]);
    });

    test('monta nó isolado com esforço próprio igual ao total', function () {
        $result = $this->assembler->assemble(
            [linhaEsforcoObjetivo('obj-1', 'Objetivo A', esforcoProprio: 56.0)],
            fn () => [],
        );

        expect($result)->toHaveKey('obj-1')
            ->and($result['obj-1']->esforco_proprio)->toEqual(56.0)
            ->and($result['obj-1']->esforco_total_horas)->toEqual(56.0)
            ->and($result['obj-1']->filhos)->toBeEmpty();
    });

    test('acumula esforço do filho no pai via objetivo_pai_id', function () {
        $result = $this->assembler->assemble(
            [
                linhaEsforcoObjetivo('pai', 'Pai', esforcoProprio: 56.0),
                linhaEsforcoObjetivo('filho', 'Filho', esforcoProprio: 28.0, paiId: 'pai'),
            ],
            fn (array $ids) => $ids === ['pai'] ? ['pai' => 'Pai'] : [],
        );

        expect($result['pai']->esforco_total_horas)->toEqual(84.0)
            ->and($result['pai']->filhos_pai)->toBe(['filho'])
            ->and($result['filho']->esforco_total_horas)->toEqual(28.0)
            ->and($result['filho']->objetivo_pai)->toBe(['id' => 'pai', 'nome' => 'Pai']);
    });

    test('conecta descendente via objetivo_superior_id em filhos_superior', function () {
        $result = $this->assembler->assemble(
            [
                linhaEsforcoObjetivo('raiz', 'Raiz', esforcoProprio: 56.0),
                linhaEsforcoObjetivo('sub', 'Sub', esforcoProprio: 56.0, superiorId: 'raiz'),
            ],
            fn (array $ids) => $ids === ['raiz'] ? ['raiz' => 'Raiz'] : [],
        );

        expect($result['raiz']->filhos_superior)->toBe(['sub'])
            ->and($result['raiz']->esforco_total_horas)->toEqual(112.0)
            ->and($result['sub']->objetivo_superior)->toBe(['id' => 'raiz', 'nome' => 'Raiz']);
    });

    test('mantém filhos_pai e filhos_superior separados quando o nó tem os dois vínculos', function () {
        $result = $this->assembler->assemble(
            [
                linhaEsforcoObjetivo('pai', 'Pai', esforcoProprio: 10.0),
                linhaEsforcoObjetivo('sup', 'Superior', esforcoProprio: 20.0),
                linhaEsforcoObjetivo('alvo', 'Alvo', esforcoProprio: 5.0, paiId: 'pai', superiorId: 'sup'),
            ],
            fn () => ['pai' => 'Pai', 'sup' => 'Superior'],
        );

        expect($result['pai']->filhos_pai)->toBe(['alvo'])
            ->and($result['pai']->filhos_superior)->toBeEmpty()
            ->and($result['sup']->filhos_superior)->toBe(['alvo'])
            ->and($result['sup']->filhos_pai)->toBeEmpty()
            ->and($result['alvo']->filhos)->toBeEmpty();
    });

    test('não entra em loop infinito quando há referência circular em objetivo_pai_id', function () {
        $result = $this->assembler->assemble(
            [
                linhaEsforcoObjetivo('a', 'A', esforcoProprio: 10.0, paiId: 'b'),
                linhaEsforcoObjetivo('b', 'B', esforcoProprio: 20.0, paiId: 'a'),
            ],
            fn () => [],
        );

        // Ciclo: A inclui B (10+20); ao acumular B, A na pilha contribui 0 — evita loop infinito.
        expect($result)->toHaveKeys(['a', 'b'])
            ->and($result['a']->esforco_total_horas)->toEqual(30.0)
            ->and($result['b']->esforco_total_horas)->toEqual(20.0);
    });
});

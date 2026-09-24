<?php

use App\V2\Planejamento\Objetivo\ObjetivoArvoreVisualizacaoAssembler;

function esforcoNode(
    string $id,
    string $nome,
    string $planejamento = 'PI Local',
    ?string $paiId = null,
    ?string $superiorId = null,
    array $filhosPai = [],
): array {
    return [
        'no_pai_id' => $paiId,
        'no_pai_secundario_id' => $superiorId,
        'no_nome' => $nome,
        'container_nome' => $planejamento,
        'tipo_nome' => 'Objetivo',
        'total_entregas' => 0,
        'esforco_disponivel_horas' => 20.0,
        'esforco_proprio' => 10.0,
        'esforco_total_horas' => 10.0,
        'planejado_percentual_disponivel' => 50.0,
        'filhos' => $filhosPai,
        'filhos_pai' => $filhosPai,
        'filhos_secundario' => [],
        'total_vinculos' => count($filhosPai),
    ];
}

describe('ObjetivoArvoreVisualizacaoAssembler', function () {

    test('monta cadeia superior com hierarquia interna agrupada', function () {
        $assembler = new ObjetivoArvoreVisualizacaoAssembler();

        $nos = [
            'raiz' => esforcoNode('raiz', 'Objetivo consultado', superiorId: 'sup-1'),
            'filho' => esforcoNode('filho', 'Filho', paiId: 'raiz', superiorId: 'sup-1', filhosPai: []),
            'sup-2' => esforcoNode('sup-2', 'Superior distante', 'PI Nacional', paiId: 'sup-2-raiz'),
            'sup-2-raiz' => esforcoNode('sup-2-raiz', 'Raiz nacional', 'PI Nacional'),
            'sup-1' => esforcoNode('sup-1', 'Superior imediato', 'PI Regional', paiId: 'sup-1-pai', superiorId: 'sup-2'),
            'sup-1-pai' => esforcoNode('sup-1-pai', 'Pai regional', 'PI Regional'),
        ];

        $cadeia = $assembler->montarCadeiaSuperior('raiz', $nos);

        expect($cadeia)->toHaveCount(2);

        expect($cadeia[0]->objetivo_id)->toBe('sup-1');
        expect($cadeia[0]->nivel_superior)->toBe(1);
        expect($cadeia[0]->hierarquia_linhas)->toBe(['Pai regional', 'Superior imediato']);

        expect($cadeia[1]->objetivo_id)->toBe('sup-2');
        expect($cadeia[1]->nivel_superior)->toBe(2);
        expect($cadeia[1]->hierarquia_linhas)->toBe(['Raiz nacional', 'Superior distante']);
    });

    test('retorna cadeia vazia quando não há superior no mapa', function () {
        $assembler = new ObjetivoArvoreVisualizacaoAssembler();
        $nos = [
            'raiz' => esforcoNode('raiz', 'Sem superior'),
        ];

        $cadeia = $assembler->montarCadeiaSuperior('raiz', $nos);

        expect($cadeia)->toBe([]);
    });

    test('retorna cadeia vazia quando nó de partida não existe no mapa', function () {
        $assembler = new ObjetivoArvoreVisualizacaoAssembler();

        $cadeia = $assembler->montarCadeiaSuperior('inexistente', []);

        expect($cadeia)->toBe([]);
    });
});

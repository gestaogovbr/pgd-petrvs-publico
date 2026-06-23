<?php

use App\V2\Planejamento\Objetivo\DTOs\EsforcoNodeDTO;
use App\V2\Planejamento\Objetivo\ObjetivoArvoreVisualizacaoAssembler;

function esforcoNode(
    string $id,
    string $nome,
    string $planejamento = 'PI Local',
    ?string $paiId = null,
    ?string $superiorId = null,
    array $filhosPai = [],
): EsforcoNodeDTO {
    return new EsforcoNodeDTO(
        objetivo_id: $id,
        objetivo_nome: $nome,
        objetivo_pai_id: $paiId,
        objetivo_superior_id: $superiorId,
        planejamento_nome: $planejamento,
        total_entregas: 0,
        esforco_proprio: 10.0,
        esforco_total_horas: 10.0,
        filhos: $filhosPai,
        filhos_pai: $filhosPai,
        filhos_superior: [],
    );
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

        $dto = $assembler->assemble('raiz', $nos);

        expect($dto->objetivo_raiz_id)->toBe('raiz');
        expect($dto->cadeia_superior)->toHaveCount(2);

        expect($dto->cadeia_superior[0]->objetivo_id)->toBe('sup-1');
        expect($dto->cadeia_superior[0]->nivel_superior)->toBe(1);
        expect($dto->cadeia_superior[0]->hierarquia_linhas)->toBe(['Pai regional', 'Superior imediato']);

        expect($dto->cadeia_superior[1]->objetivo_id)->toBe('sup-2');
        expect($dto->cadeia_superior[1]->nivel_superior)->toBe(2);
        expect($dto->cadeia_superior[1]->hierarquia_linhas)->toBe(['Raiz nacional', 'Superior distante']);
    });

    test('retorna cadeia vazia quando não há superior no mapa', function () {
        $assembler = new ObjetivoArvoreVisualizacaoAssembler();
        $nos = [
            'raiz' => esforcoNode('raiz', 'Sem superior'),
        ];

        $dto = $assembler->assemble('raiz', $nos);

        expect($dto->cadeia_superior)->toBe([]);
    });
});

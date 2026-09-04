<?php

use App\V2\Unidade\DTOs\UnidadeResumoDTO;

describe('UnidadeResumoDTO', function () {

    test('fromArray preenche id, sigla e nome', function () {
        $dto = UnidadeResumoDTO::fromArray([
            'id' => 'unidade-1',
            'sigla' => 'MGI',
            'nome' => 'Ministério da Gestão',
        ]);

        expect($dto->id)->toBe('unidade-1')
            ->and($dto->sigla)->toBe('MGI')
            ->and($dto->nome)->toBe('Ministério da Gestão');
    });

    test('toArray retorna os campos esperados', function () {
        $dto = new UnidadeResumoDTO('unidade-1', 'MGI', 'Ministério da Gestão');

        expect($dto->toArray())->toBe([
            'id' => 'unidade-1',
            'sigla' => 'MGI',
            'nome' => 'Ministério da Gestão',
        ]);
    });

    test('fromModel extrai campos de um objeto Unidade', function () {
        $unidade = (object) ['id' => 'u-9', 'sigla' => 'SEGES', 'nome' => 'Secretaria'];

        $dto = UnidadeResumoDTO::fromModel($unidade);

        expect($dto->id)->toBe('u-9')
            ->and($dto->sigla)->toBe('SEGES')
            ->and($dto->nome)->toBe('Secretaria');
    });
});

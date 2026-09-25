<?php

use App\Models\Atividade;
use Tests\TestCase;

uses(TestCase::class);

describe('Atividade::consolidacao', function () {

    test('usa a coluna plano_trabalho_consolidacao_id como chave estrangeira', function () {
        $atividade = new Atividade();

        expect($atividade->consolidacao()->getForeignKeyName())
            ->toBe('plano_trabalho_consolidacao_id');
    });
});

<?php

use App\V2\PlanoTrabalho\Documento\TCR\TCRDatasetProvider;
use App\Models\PlanoTrabalho;
use Tests\TestCase;

uses(TestCase::class);

beforeEach(function () {
    $this->provider = new TCRDatasetProvider();
});

describe('TCRDatasetProvider', function () {

    test('getFieldDefinitions retorna campos do plano de trabalho', function () {
        $fields = $this->provider->getFieldDefinitions();
        $fieldNames = array_column($fields, 'field');

        expect($fieldNames)->toContain('carga_horaria', 'status', 'usuario', 'unidade', 'entregas', 'programa');
    });

    test('getDataset retorna campos achatados', function () {
        $dataset = $this->provider->getDataset();

        expect($dataset)->toBeArray()->not->toBeEmpty();
        expect($dataset[0])->toHaveKeys(['field', 'label']);
    });

    test('getContext retorna o próprio plano', function () {
        /** @var PlanoTrabalho $plano */
        $plano = Mockery::mock(PlanoTrabalho::class)->makePartial();
        $plano->id = 'plano-1';

        expect($this->provider->getContext($plano))->toBe($plano);
    });

    test('campos aninhados possuem sub-fields', function () {
        $fields = $this->provider->getFieldDefinitions();
        $usuario = collect($fields)->firstWhere('field', 'usuario');

        expect($usuario['fields'])->toBeArray();
        expect(array_column($usuario['fields'], 'field'))->toContain('nome', 'cpf');
    });
});

<?php

use App\Services\TemplateDatasetService;
use Tests\TestCase;

uses(TestCase::class);

test('dataset USUARIO suporta email nulo e pode ser renderizado como vazio', function () {
    $service = new TemplateDatasetService();

    $dataset = $service->getDataset('USUARIO', false);
    $fields = $dataset['fields'] ?? [];

    expect($fields)->toBeArray();
    expect(array_column($fields, 'field'))->toContain('email');

    $usuario = (object) [
        'nome' => 'João',
        'email' => null,
        'cpf' => '12345678901',
        'matricula' => '0001',
        'apelido' => 'J',
        'telefone' => null,
        'sexo' => null,
        'situacao_funcional' => null,
    ];

    $context = $dataset['context']($usuario);
    $email = data_get($context, 'email');

    expect($email)->toBeNull();
    expect(strval($email))->toBe('');
});

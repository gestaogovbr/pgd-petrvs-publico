<?php

use App\Repository\IntegracaoServidorRepository;
use App\Services\Siape\Servidor\Integracao;
use Tests\TestCase;

uses(TestCase::class);

afterAll(function () {
    \Mockery::close();
});

test('montaEntidadeServidor não descarta servidor quando e-mail funcional está ausente', function () {
    $repository = \Mockery::mock(IntegracaoServidorRepository::class);

    $service = \Mockery::mock(Integracao::class, [$repository])->makePartial();
    $service->shouldReceive('getEmail')->andReturn(null);

    $servidor = [
        'pessoal' => [
            'cpf' => '12345678901',
            'cpf_ativo' => '1',
            'nome' => 'João',
            'sexo' => 'M',
            'municipio' => null,
            'uf' => 'DF',
            'telefone' => null,
            'data_nascimento' => '1990-01-01',
        ],
        'funcionais' => [
            [
                'matriculas' => [
                    'dados' => [
                        'matriculasiape' => '123456',
                        'ativo' => true,
                        'vinculo_ativo' => true,
                        'coduorgexercicio' => '1',
                        'coduorglotacao' => '1',
                        'codigo_servo_exercicio' => '1',
                        'codsitfuncional' => '1',
                        'ident_unica' => 'ident',
                        'participa_pgd' => 'sim',
                    ],
                ],
                'emailfuncional' => null,
            ],
        ],
    ];

    $reflection = new ReflectionMethod(Integracao::class, 'montaEntidadeServidor');
    $reflection->setAccessible(true);

    $entidades = $reflection->invoke($service, $servidor);

    expect($entidades)->toHaveCount(1);
    expect($entidades[0]->getAttribute('emailfuncional'))->toBeNull();
});

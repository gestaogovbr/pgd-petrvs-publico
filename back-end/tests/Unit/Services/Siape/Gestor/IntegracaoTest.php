<?php

use App\Services\Siape\Gestor\Integracao as GestorIntegracao;
use App\Services\UnidadeIntegranteService;
use App\Services\NivelAcessoService;
use App\Services\PerfilService;
use App\Models\Usuario;
use App\Enums\Atribuicao as EnumsAtribuicao;
use Tests\TestCase;

uses(TestCase::class);

describe('GestorIntegracao - preparaSubstituto', function () {
    it('retorna apenas GESTOR_SUBSTITUTO quando atribuições estão vazias', function () {
        $instancia = new GestorIntegracao(
            [],
            Mockery::mock(Usuario::class),
            Mockery::mock(UnidadeIntegranteService::class),
            Mockery::mock(NivelAcessoService::class),
            Mockery::mock(PerfilService::class),
            []
        );

        $reflection = new ReflectionClass(GestorIntegracao::class);
        $method = $reflection->getMethod('preparaSubstituto');
        $method->setAccessible(true);

        $resultado = $method->invoke($instancia, null, 'u1');
        expect($resultado)->toBe([EnumsAtribuicao::GESTOR_SUBSTITUTO->value]);
    });

    it('retorna apenas GESTOR_SUBSTITUTO quando unidade não existe na lista', function () {
        $instancia = new GestorIntegracao(
            [],
            Mockery::mock(Usuario::class),
            Mockery::mock(UnidadeIntegranteService::class),
            Mockery::mock(NivelAcessoService::class),
            Mockery::mock(PerfilService::class),
            []
        );

        $reflection = new ReflectionClass(GestorIntegracao::class);
        $method = $reflection->getMethod('preparaSubstituto');
        $method->setAccessible(true);

        $resultado = $method->invoke($instancia, ['u2' => [EnumsAtribuicao::GESTOR_SUBSTITUTO->value]], 'u1');
        expect($resultado)->toBe([EnumsAtribuicao::GESTOR_SUBSTITUTO->value]);
    });

    it('remove GESTOR e garante inclusão de GESTOR novamente', function () {
        $instancia = new GestorIntegracao(
            [],
            Mockery::mock(Usuario::class),
            Mockery::mock(UnidadeIntegranteService::class),
            Mockery::mock(NivelAcessoService::class),
            Mockery::mock(PerfilService::class),
            []
        );

        $reflection = new ReflectionClass(GestorIntegracao::class);
        $method = $reflection->getMethod('preparaSubstituto');
        $method->setAccessible(true);

        $entrada = [
            'u1' => [EnumsAtribuicao::GESTOR_SUBSTITUTO->value, EnumsAtribuicao::GESTOR->value, EnumsAtribuicao::LOTADO->value]
        ];
        $resultado = $method->invoke($instancia, $entrada, 'u1');

        expect($resultado)->toContain(EnumsAtribuicao::LOTADO->value);
        expect($resultado)->toContain(EnumsAtribuicao::GESTOR_SUBSTITUTO->value);
        expect($resultado)->toContain(EnumsAtribuicao::GESTOR->value);
    });

    it('adiciona GESTOR quando não presente', function () {
        $instancia = new GestorIntegracao(
            [],
            Mockery::mock(Usuario::class),
            Mockery::mock(UnidadeIntegranteService::class),
            Mockery::mock(NivelAcessoService::class),
            Mockery::mock(PerfilService::class),
            []
        );

        $reflection = new ReflectionClass(GestorIntegracao::class);
        $method = $reflection->getMethod('preparaSubstituto');
        $method->setAccessible(true);

        $entrada = [
            'u1' => [EnumsAtribuicao::LOTADO->value]
        ];
        $resultado = $method->invoke($instancia, $entrada, 'u1');

        expect($resultado)->toContain(EnumsAtribuicao::LOTADO->value);
        expect($resultado)->toContain(EnumsAtribuicao::GESTOR->value);
    });

    afterEach(function () {
        Mockery::close();
    });
});


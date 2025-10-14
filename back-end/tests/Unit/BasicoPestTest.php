<?php

describe('Teste básico com Pest e Mockery', function () {

    it('valida operações simples', function () {
        expect(true)->toBeTrue();
        expect(2 + 2)->toBe(4);
        expect('pest')->toBeString();
    });

    it('usa Mockery para mock simples', function () {
        $mock = Mockery::mock(stdClass::class);
        $mock->shouldReceive('metodo')->with('x')->andReturn('ok');

        expect($mock->metodo('x'))->toBe('ok');
    });

    afterEach(function () {
        // Fecha os mocks após cada teste
        Mockery::close();
    });
});
<?php

use App\Services\TenantService;

uses(Tests\TestCase::class);

describe('TenantService::devePropagarAutorizadora', function () {
    it('retorna true quando anterior está vazio e novo está preenchido', function (mixed $anterior) {
        $service = app(TenantService::class);

        expect($service->devePropagarAutorizadora($anterior, '32589478925114'))->toBeTrue();
    })->with([
        'null' => null,
        'string vazia' => '',
        'somente espaços' => '   ',
    ]);

    it('retorna false quando anterior já estava preenchido', function () {
        $service = app(TenantService::class);

        expect($service->devePropagarAutorizadora('111', '32589478925114'))->toBeFalse();
    });

    it('retorna false quando o novo valor continua vazio', function (mixed $novo) {
        $service = app(TenantService::class);

        expect($service->devePropagarAutorizadora(null, $novo))->toBeFalse();
    })->with([
        'null' => null,
        'string vazia' => '',
        'somente espaços' => '   ',
    ]);
});

describe('TenantService::devePropagarAutorizadoraAnterior', function () {
    it('retorna true quando anterior está preenchido e o valor muda', function () {
        $service = app(TenantService::class);

        expect($service->devePropagarAutorizadoraAnterior('111', '32589478925114'))->toBeTrue();
        expect($service->devePropagarAutorizadoraAnterior('111', null))->toBeTrue();
        expect($service->devePropagarAutorizadoraAnterior('111', ''))->toBeTrue();
    });

    it('retorna false quando anterior está vazio', function () {
        $service = app(TenantService::class);

        expect($service->devePropagarAutorizadoraAnterior(null, '32589478925114'))->toBeFalse();
        expect($service->devePropagarAutorizadoraAnterior('', '32589478925114'))->toBeFalse();
    });

    it('retorna false quando o valor não mudou', function () {
        $service = app(TenantService::class);

        expect($service->devePropagarAutorizadoraAnterior('111', '111'))->toBeFalse();
    });
});

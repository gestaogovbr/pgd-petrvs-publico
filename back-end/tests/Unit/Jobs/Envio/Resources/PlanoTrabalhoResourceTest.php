<?php

use App\Jobs\Envio\Resources\PlanoTrabalhoResource;
use Tests\TestCase;

uses(TestCase::class);

describe('PlanoTrabalhoResource::cargaHorariaDisponivelEmHorasInteiras', function () {
    it('arredonda produto fracionário para inteiro exigido pela API PGD', function () {
        expect(PlanoTrabalhoResource::cargaHorariaDisponivelEmHorasInteiras(21, 7.5))->toBe(158);
        expect(PlanoTrabalhoResource::cargaHorariaDisponivelEmHorasInteiras(22, 8.1))->toBe(178);
    });

    it('mantém valor inteiro quando a carga diária já é inteira', function () {
        expect(PlanoTrabalhoResource::cargaHorariaDisponivelEmHorasInteiras(22, 8))->toBe(176);
        expect(PlanoTrabalhoResource::cargaHorariaDisponivelEmHorasInteiras(22, 8.00))->toBe(176);
    });

    it('trata dias úteis ou carga ausentes como zero', function () {
        expect(PlanoTrabalhoResource::cargaHorariaDisponivelEmHorasInteiras(null, 8))->toBe(0);
        expect(PlanoTrabalhoResource::cargaHorariaDisponivelEmHorasInteiras(22, null))->toBe(0);
    });
});

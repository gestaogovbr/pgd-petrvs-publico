<?php

use App\Exceptions\ExportPgdException;
use App\Services\API_PGD\Resources\ModalidadeResource;
use App\Support\ModalidadePgd;

describe('ModalidadePgd', function () {
    it('normaliza e rotula modalidades conhecidas', function () {
        expect(ModalidadePgd::normalize('Teletrabalho (Integral)'))->toBe('integral')
            ->and(ModalidadePgd::normalize('Teletrabalho no exterior - inciso VIII'))->toBe('no exterior substituicao')
            ->and(ModalidadePgd::label(null))->toBe('Não definida')
            ->and(ModalidadePgd::label('modalidade customizada'))->toBe('modalidade customizada');
    });

    it('mapeia modalidade textual para codigo da API PGD e rejeita valor invalido', function () {
        expect((new ModalidadeResource('presencial'))->get())->toBe(1)
            ->and((new ModalidadeResource('parcial'))->get())->toBe(2)
            ->and((new ModalidadeResource('integral'))->get())->toBe(3)
            ->and((new ModalidadeResource('no exterior substituicao'))->get())->toBe(4)
            ->and((new ModalidadeResource('no exterior'))->get())->toBe(5);

        expect(fn () => (new ModalidadeResource('valor invalido'))->get())
            ->toThrow(ExportPgdException::class);
    });
});

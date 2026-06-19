<?php

use App\Exceptions\EnvioNaoAgendadoException;

describe('EnvioNaoAgendadoException', function () {
    it('identifica erro de dependência para plano de entrega', function () {
        $exception = new EnvioNaoAgendadoException('tenant-1', 'PlanoEntrega', 'pe-1', 'PE inválido');

        expect($exception->getTipo())->toBe('PlanoEntrega');
        expect($exception->getItemId())->toBe('pe-1');
        expect($exception->isErroDependencia())->toBeTrue();
    });

    it('identifica erro de dependência para participante', function () {
        $exception = new EnvioNaoAgendadoException('tenant-1', 'Participante', 'user-1', 'Participante inválido');

        expect($exception->isErroDependencia())->toBeTrue();
    });

    it('não identifica plano de trabalho como erro de dependência', function () {
        $exception = new EnvioNaoAgendadoException('tenant-1', 'PlanoTrabalho', 'pt-1', 'PT inválido');

        expect($exception->isErroDependencia())->toBeFalse();
    });
});

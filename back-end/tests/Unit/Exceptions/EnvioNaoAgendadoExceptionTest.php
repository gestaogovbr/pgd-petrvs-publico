<?php

use App\Exceptions\EnvioNaoAgendadoException;
use Illuminate\Support\Facades\Log;

describe('EnvioNaoAgendadoException', function () {
    it('identifica erro de dependência para plano de entrega', function () {
        $exception = new EnvioNaoAgendadoException('tenant-1', 'PlanoEntrega', 'pe-1', 'PE inválido', 10);

        expect($exception->getTipo())->toBe('PlanoEntrega');
        expect($exception->getItemId())->toBe('pe-1');
        expect($exception->getIdentificacao())->toBe('10');
        expect($exception->isErroDependencia())->toBeTrue();
    });

    it('identifica erro de dependência para participante', function () {
        $exception = new EnvioNaoAgendadoException('tenant-1', 'Participante', 'user-1', 'Participante inválido', '1234567');

        expect($exception->isErroDependencia())->toBeTrue();
        expect($exception->getIdentificacao())->toBe('1234567');
    });

    it('não identifica plano de trabalho como erro de dependência', function () {
        $exception = new EnvioNaoAgendadoException('tenant-1', 'PlanoTrabalho', 'pt-1', 'PT inválido', 20);

        expect($exception->isErroDependencia())->toBeFalse();
        expect($exception->getIdentificacao())->toBe('20');
    });

    it('loga com numero ou matricula em vez do id', function () {
        Log::spy();

        $pe = new EnvioNaoAgendadoException('tenant-1', 'PlanoEntrega', 'pe-uuid', 'PE inválido', 10);
        $pe->log();

        Log::shouldHaveReceived('info')
            ->withArgs(fn (string $message) => str_contains($message, 'PlanoEntrega #10')
                && ! str_contains($message, 'pe-uuid'))
            ->once();

        $usuario = new EnvioNaoAgendadoException('tenant-1', 'Usuario', 'user-uuid', 'Usuário inválido', '7654321');
        $usuario->log();

        Log::shouldHaveReceived('info')
            ->withArgs(fn (string $message) => str_contains($message, 'Usuario #7654321')
                && ! str_contains($message, 'user-uuid'))
            ->once();
    });
});

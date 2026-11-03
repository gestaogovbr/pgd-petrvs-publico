<?php

namespace Tests\Unit\Helpers;

use RuntimeException;

require_once __DIR__ . '/../../../app/Helpers/ExceptionHelper.php';

describe('throwableToArrayLog', function () {

    test('inclui a classe da exceção, mensagem, código, arquivo e linha', function () {
        $e = new RuntimeException('falha X', 123);

        $log = throwableToArrayLog($e);

        expect($log['exception'])->toBe(RuntimeException::class)
            ->and($log['message'])->toBe('falha X')
            ->and($log['code'])->toBe(123)
            ->and($log['file'])->toBe($e->getFile())
            ->and($log['line'])->toBe($e->getLine())
            ->and($log['trace'])->toBeString();
    });

    test('captura recursivamente a cadeia de exceções anteriores (ex.: QueryException -> PDO)', function () {
        $raiz = new RuntimeException('SQLSTATE[HY000]: Field X has no default');
        $wrapper = new RuntimeException('QueryException wrapper', 0, $raiz);

        $log = throwableToArrayLog($wrapper);

        expect($log['previous'])->not->toBeNull()
            ->and($log['previous']['exception'])->toBe(RuntimeException::class)
            ->and($log['previous']['message'])->toBe('SQLSTATE[HY000]: Field X has no default')
            ->and($log['previous']['previous'])->toBeNull();
    });

    test('previous é null quando não há exceção anterior', function () {
        $log = throwableToArrayLog(new RuntimeException('sem anterior'));

        expect($log['previous'])->toBeNull();
    });

    test('mantém as chaves esperadas pelos consumidores existentes (code)', function () {
        $log = throwableToArrayLog(new RuntimeException('erro', 500));

        expect($log)->toHaveKeys(['exception', 'message', 'code', 'file', 'line', 'previous', 'trace'])
            ->and($log['code'])->toBe(500);
    });
});

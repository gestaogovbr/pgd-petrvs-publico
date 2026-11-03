<?php

if (!function_exists('throwableToArray')) {
    function throwableToArray(Throwable $throwable): array {
        return [
            'message' => $throwable->getMessage(),
            'code' => $throwable->getCode(),
            'file' => $throwable->getFile(),
            'line' => $throwable->getLine(),
            'trace' => $throwable->getTrace(),
            'previous' => $throwable->getPrevious() ? throwableToArray($throwable->getPrevious()) : null,
        ];
    }
}

if (!function_exists('throwableToArrayLog')) {
    /**
     * Resumo estruturado de um Throwable para logging de erros inesperados.
     *
     * Inclui a classe da exceção, a cadeia de exceções anteriores (essencial
     * para QueryException, que encapsula o erro real do PDO) e o stack trace
     * como string, mantendo as chaves `message`/`code`/`file`/`line` usadas
     * pelos consumidores existentes.
     */
    function throwableToArrayLog(Throwable $throwable): array {
        $previous = $throwable->getPrevious();

        return [
            'exception' => get_class($throwable),
            'message' => $throwable->getMessage(),
            'code' => $throwable->getCode(),
            'file' => $throwable->getFile(),
            'line' => $throwable->getLine(),
            'previous' => $previous ? throwableToArrayLog($previous) : null,
            'trace' => $throwable->getTraceAsString(),
        ];
    }
}

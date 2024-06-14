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

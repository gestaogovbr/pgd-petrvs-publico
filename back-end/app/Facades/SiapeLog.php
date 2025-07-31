<?php

namespace App\Facades;


use Illuminate\Support\Facades\Log;

class SiapeLog
{

    private static bool $imprimirNoTerminal = false;

    public static function setImprimirNoTerminal(bool $imprimirNoTerminal)
    {
        self::$imprimirNoTerminal = $imprimirNoTerminal;
    }

    public static function info($message, array $context = [])
    {
        Log::channel('siape')->info($message, $context);
        if (self::$imprimirNoTerminal) {
            imprimeNoTerminal($message);
        }
    }

    public static function error($message, array $context = [])
    {
        Log::channel('siape')->error($message, $context);
        if (self::$imprimirNoTerminal) {
            imprimeNoTerminal($message);
        }
    }

    public static function warning($message, array $context = [])
    {
        Log::channel('siape')->warning($message, $context);
        if (self::$imprimirNoTerminal) {
            imprimeNoTerminal($message);
        }
    }
}

<?php

namespace App\Facades;


use Illuminate\Support\Facades\Log;

class SiapeLog
{

    private static bool $imprimirNoTerminal = false;
    private static ?string $lastTenantId = null;
    private static function ensureFilePermissions(): void
    {
        $tenantId = function_exists('tenant') ? (tenant('id') ?? 'central') : 'central';
        if (self::$lastTenantId === $tenantId) return;
        self::$lastTenantId = $tenantId;
        $filename = storage_path('logs/siape_' . $tenantId . '.log');
        if (!file_exists($filename)) {
            @touch($filename);
            @chmod($filename, 0777);
        }
    }

    public static function setImprimirNoTerminal(bool $imprimirNoTerminal)
    {
        self::$imprimirNoTerminal = $imprimirNoTerminal;
    }

    public static function info($message, array $context = [])
    {
        self::ensureFilePermissions();
        Log::channel('siape')->info($message, $context);
        if (self::$imprimirNoTerminal) {
            imprimeNoTerminal($message);
        }
    }

    public static function error($message, array $context = [])
    {
        self::ensureFilePermissions();
        Log::channel('siape')->error($message, $context);
        if (self::$imprimirNoTerminal) {
            imprimeNoTerminal($message);
        }
    }

    public static function warning($message, array $context = [])
    {
        self::ensureFilePermissions();
        Log::channel('siape')->warning($message, $context);
        if (self::$imprimirNoTerminal) {
            imprimeNoTerminal($message);
        }
    }
}

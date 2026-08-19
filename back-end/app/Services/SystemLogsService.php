<?php

declare(strict_types=1);

namespace App\Services;

use App\Enums\PerfilEnum;
use Illuminate\Support\Facades\File;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use App\Exceptions\ServerException;
use App\Models\Usuario;
use Illuminate\Support\Facades\Log;

class SystemLogsService
{
    private const DEFAULT_PER_PAGE = 10;
    private const DEFAULT_PAGE = 1;
    private const LOG_EXTENSION = 'log';

    private const MAX_DOWNLOAD_SIZE = 2 * 1024 * 1024; // 2MB

    public function index(array $data, ?string $tenantId = null, ?Usuario $usuario = null): array
    {
        $logPath = storage_path('logs');

        if (!File::exists($logPath)) {
             return [
                'success' => true,
                'data' => [],
                'meta' => ['total' => 0]
             ];
        }

        $files = File::files($logPath);
        $logs = [];

        foreach ($files as $file) {
            $filename = $file->getFilename();

            if ($file->getExtension() === self::LOG_EXTENSION && $this->usuarioPodeAcessarLog($filename, $tenantId, $usuario)) {
                $logs[] = [
                    'filename' => $filename,
                    'size' => $file->getSize(),
                    'last_modified' => date('Y-m-d H:i:s', $file->getMTime()),
                ];
            }
        }

        // Sort by modification date (newest first)
        usort($logs, fn($a, $b) => $b['last_modified'] <=> $a['last_modified']);

        $collection = new Collection($logs);
        
        $perPage = (int) ($data['limit'] ?? self::DEFAULT_PER_PAGE);
        $currentPage = (int) ($data['page'] ?? self::DEFAULT_PAGE);
        
        $results = $collection->slice(($currentPage - 1) * $perPage, $perPage)->values();
        
        $paginated = new LengthAwarePaginator(
            $results,
            $collection->count(),
            $perPage,
            $currentPage,
            ['path' => request()->url(), 'query' => request()->query()]
        );

        return [
            'success' => true,
            'data' => $paginated->items(),
            'meta' => [
                'total' => $paginated->total(),
                'per_page' => $paginated->perPage(),
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage()
            ]
        ];
    }

    public function downloadLog(string $filename, ?string $tenantId = null, ?Usuario $usuario = null): array
    {
        // Security Log
        Log::info("Security: Attempt to download log file: {$filename}", [
            'user_id' => auth()->id() ?? 'guest',
            'ip' => request()->ip()
        ]);

        // Validate filename to prevent directory traversal
        if (basename($filename) !== $filename || !preg_match('/^[a-zA-Z0-9._-]+$/', $filename)) {
            Log::warning("Security: Invalid filename format attempt: {$filename}");
            throw new ServerException("SystemLogs", "Nome de arquivo inválido.");
        }

        // Validate extension
        if (pathinfo($filename, PATHINFO_EXTENSION) !== self::LOG_EXTENSION) {
             Log::warning("Security: Invalid file extension attempt: {$filename}");
             throw new ServerException("SystemLogs", "Tipo de arquivo não permitido.");
        }

        if (!$this->usuarioPodeAcessarLog($filename, $tenantId, $usuario)) {
            Log::warning("Security: Unauthorized log file access attempt: {$filename}", [
                'tenant_id' => $tenantId,
                'user_id' => $usuario?->id ?? auth()->id() ?? 'guest',
            ]);
            throw new ServerException("SystemLogs", "Arquivo não encontrado.");
        }

        $path = storage_path('logs/' . $filename);

        if (!File::exists($path)) {
            throw new ServerException("SystemLogs", "Arquivo não encontrado.");
        }

        $size = File::size($path);

        if ($size > self::MAX_DOWNLOAD_SIZE) {
            $handle = fopen($path, 'rb');
            if ($handle === false) {
                 throw new ServerException("SystemLogs", "Erro ao ler o arquivo.");
            }
            
            fseek($handle, -self::MAX_DOWNLOAD_SIZE, SEEK_END);
            $content = fread($handle, self::MAX_DOWNLOAD_SIZE);
            fclose($handle);

            return [
                'type' => 'content',
                'data' => $content,
                'filename' => $filename
            ];
        }

        return [
            'type' => 'file',
            'data' => $path,
            'filename' => $filename
        ];
    }

    private function usuarioPodeAcessarLog(string $filename, ?string $tenantId, ?Usuario $usuario): bool
    {
        $classificacao = $this->classificarLog($filename, $tenantId);

        if ($classificacao === 'tenant-atual') {
            return true;
        }

        if ($classificacao === 'generico' && $this->usuarioEhDesenvolvedor($usuario)) {
            return true;
        }

        return false;
    }

    private function classificarLog(string $filename, ?string $tenantId): string
    {
        if ($filename === 'siape_central.log') {
            return 'generico';
        }

        if ($tenantId !== null && preg_match('/^' . preg_quote($tenantId, '/') . '-\d{2}-\d{2}-\d{4}-laravel\.log$/', $filename) === 1) {
            return 'tenant-atual';
        }

        if ($tenantId !== null && $filename === 'siape_' . $tenantId . '.log') {
            return 'tenant-atual';
        }

        if ($this->ehLogLaravelTenant($filename) || $this->ehLogSiapeTenant($filename)) {
            return 'outro-tenant';
        }

        return 'generico';
    }

    private function ehLogLaravelTenant(string $filename): bool
    {
        return preg_match('/^.+-\d{2}-\d{2}-\d{4}-laravel\.log$/', $filename) === 1;
    }

    private function ehLogSiapeTenant(string $filename): bool
    {
        return $filename !== 'siape_central.log' && preg_match('/^siape_.+\.log$/', $filename) === 1;
    }

    private function usuarioEhDesenvolvedor(?Usuario $usuario): bool
    {
        if ($usuario === null) {
            return false;
        }

        if (!$usuario->relationLoaded('perfil')) {
            $usuario->loadMissing('perfil');
        }

        return (int) $usuario->perfil?->nivel === PerfilEnum::DESENVOLVEDOR->value;
    }
}

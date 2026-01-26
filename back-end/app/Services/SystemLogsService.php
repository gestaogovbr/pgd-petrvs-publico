<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Log;

class SystemLogsService
{
    private const DEFAULT_PER_PAGE = 10;
    private const DEFAULT_PAGE = 1;
    private const LOG_EXTENSION = 'log';

    private const MAX_DOWNLOAD_SIZE = 2 * 1024 * 1024; // 2MB

    public function index(array $data): array
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
            if ($file->getExtension() === self::LOG_EXTENSION) {
                $logs[] = [
                    'filename' => $file->getFilename(),
                    'size' => $file->getSize(),
                    'last_modified' => date('Y-m-d H:i:s', $file->getMTime()),
                    'path' => $file->getPathname()
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

    public function downloadLog(string $filename): array
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
}

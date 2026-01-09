<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class SystemLogsService
{
    private const DEFAULT_PER_PAGE = 10;
    private const DEFAULT_PAGE = 1;
    private const LOG_EXTENSION = 'log';

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
}

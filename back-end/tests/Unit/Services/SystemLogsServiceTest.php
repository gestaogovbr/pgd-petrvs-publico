<?php

use App\Exceptions\ServerException;
use App\Services\SystemLogsService;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Finder\SplFileInfo;
use Tests\TestCase;

uses(TestCase::class);

afterEach(function () {
    Mockery::close();
});

/**
 * @return Mockery\MockInterface&SplFileInfo
 */
function systemLogsMockSplFile(
    string $extension,
    ?string $filename = null,
    int $size = 1024,
    ?int $mtime = null,
    ?string $pathname = null,
): Mockery\MockInterface {
    $file = Mockery::mock(SplFileInfo::class);
    $file->shouldReceive('getExtension')->andReturn($extension);

    if ($filename !== null) {
        $file->shouldReceive('getFilename')->andReturn($filename);
        $file->shouldReceive('getSize')->andReturn($size);
        $file->shouldReceive('getMTime')->andReturn($mtime ?? time());
        $file->shouldReceive('getPathname')->andReturn($pathname ?? '/path/to/' . $filename);
    }

    return $file;
}

describe('SystemLogsService::index', function () {
    it('returns paginated logs', function () {
        $logPath = storage_path('logs');

        File::shouldReceive('exists')
            ->with($logPath)
            ->andReturn(true);

        $file1 = systemLogsMockSplFile('log', 'test1.log', 1024, time(), '/path/to/test1.log');
        $file2 = systemLogsMockSplFile('txt');
        $file3 = systemLogsMockSplFile('log', 'test2.log', 2048, time() - 3600, '/path/to/test2.log');

        File::shouldReceive('files')
            ->with($logPath)
            ->andReturn([$file1, $file2, $file3]);

        $service = new SystemLogsService();

        $result = $service->index(['limit' => 10, 'page' => 1]);

        expect($result['success'])->toBeTrue();
        expect($result['data'])->toHaveCount(2);
        expect($result['data'][0]['filename'])->toBe('test1.log');
        expect($result['data'][1]['filename'])->toBe('test2.log');
        expect($result['meta']['total'])->toBe(2);
    });

    it('filters logs by filename', function () {
        $logPath = storage_path('logs');

        File::shouldReceive('exists')
            ->with($logPath)
            ->andReturn(true);

        $file1 = systemLogsMockSplFile(
            'log',
            'MGI-31-07-2026-laravel.log',
            1024,
            time(),
            '/path/to/MGI-31-07-2026-laravel.log'
        );
        $file2 = systemLogsMockSplFile(
            'log',
            'siape_central.log',
            2048,
            time() - 3600,
            '/path/to/siape_central.log'
        );

        File::shouldReceive('files')
            ->with($logPath)
            ->andReturn([$file1, $file2]);

        $service = new SystemLogsService();

        $result = $service->index(['limit' => 10, 'page' => 1, 'filters' => ['filename' => 'siape']]);

        expect($result['success'])->toBeTrue();
        expect($result['data'])->toHaveCount(1);
        expect($result['data'][0]['filename'])->toBe('siape_central.log');
        expect($result['meta']['total'])->toBe(1);
    });

    it('returns empty when log directory does not exist', function () {
        $logPath = storage_path('logs');

        File::shouldReceive('exists')
            ->with($logPath)
            ->andReturn(false);

        $service = new SystemLogsService();

        $result = $service->index([]);

        expect($result['success'])->toBeTrue();
        expect($result['data'])->toBeEmpty();
        expect($result['meta']['total'])->toBe(0);
    });
});

describe('SystemLogsService::downloadLog', function () {
    it('downloads small file', function () {
        $filename = 'test_small.log';
        $path = storage_path('logs/' . $filename);

        Log::shouldReceive('info')->once();

        File::shouldReceive('exists')->with($path)->andReturn(true);
        File::shouldReceive('size')->with($path)->andReturn(1024);

        $service = new SystemLogsService();
        $result = $service->downloadLog($filename);

        expect($result['type'])->toBe('file');
        expect($result['data'])->toBe($path);
        expect($result['filename'])->toBe($filename);
    });

    it('downloads large file truncated', function () {
        $filename = 'test_large.log';
        $path = storage_path('logs/' . $filename);

        $content = str_repeat('A', 2 * 1024 * 1024 + 100);
        file_put_contents($path, $content);

        try {
            Log::shouldReceive('info')->once();

            File::shouldReceive('exists')->with($path)->andReturn(true);
            File::shouldReceive('size')->with($path)->andReturn(strlen($content));

            $service = new SystemLogsService();
            $result = $service->downloadLog($filename);

            expect($result['type'])->toBe('content');
            expect(strlen($result['data']))->toBe(2 * 1024 * 1024);
            expect($result['filename'])->toBe($filename);
        } finally {
            if (file_exists($path)) {
                unlink($path);
            }
        }
    });

    it('throws exception for invalid filename', function () {
        Log::shouldReceive('info')->once();
        Log::shouldReceive('warning')->once();

        $service = new SystemLogsService();

        expect(fn () => $service->downloadLog('../../../etc/passwd'))
            ->toThrow(ServerException::class, 'Nome de arquivo inválido.');
    });

    it('throws exception for invalid extension', function () {
        Log::shouldReceive('info')->once();
        Log::shouldReceive('warning')->once();

        $service = new SystemLogsService();

        expect(fn () => $service->downloadLog('test.txt'))
            ->toThrow(ServerException::class, 'Tipo de arquivo não permitido.');
    });

    it('throws exception if file not found', function () {
        $filename = 'not_found.log';
        $path = storage_path('logs/' . $filename);

        Log::shouldReceive('info')->once();

        File::shouldReceive('exists')->with($path)->andReturn(false);

        $service = new SystemLogsService();

        expect(fn () => $service->downloadLog($filename))
            ->toThrow(ServerException::class, 'Arquivo não encontrado.');
    });
});

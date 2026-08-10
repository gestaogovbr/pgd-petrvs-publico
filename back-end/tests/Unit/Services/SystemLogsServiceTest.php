<?php

use App\Enums\PerfilEnum;
use App\Exceptions\ServerException;
use App\Models\Perfil;
use App\Models\Usuario;
use App\Services\SystemLogsService;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Mockery\MockInterface;
use Symfony\Component\Finder\SplFileInfo;
use Tests\TestCase;

uses(TestCase::class);

afterEach(fn () => Mockery::close());

function usuarioComPerfilSystemLogs(int $nivel): Usuario
{
    $usuario = new Usuario(['id' => 'usuario-test']);
    $usuario->setRelation('perfil', new Perfil(['nivel' => $nivel]));

    return $usuario;
}

function mockLogFileSystemLogs(string $filename, int $mtime, string $extension = 'log'): SplFileInfo|MockInterface
{
    $file = Mockery::mock(SplFileInfo::class);
    $file->shouldReceive('getExtension')->andReturn($extension);
    $file->shouldReceive('getFilename')->andReturn($filename);

    if ($extension === 'log') {
        $file->shouldReceive('getSize')->andReturn(1024);
        $file->shouldReceive('getMTime')->andReturn($mtime);
    }

    return $file;
}

it('returns only current tenant logs for non developer', function () {
    $logPath = storage_path('logs');

    File::shouldReceive('exists')
        ->with($logPath)
        ->andReturn(true);

    File::shouldReceive('files')
        ->with($logPath)
        ->andReturn([
            mockLogFileSystemLogs('MGI-04-08-2026-laravel.log', time()),
            mockLogFileSystemLogs('siape_MGI.log', time() - 60),
            mockLogFileSystemLogs('CEFET-MG-04-08-2026-laravel.log', time() - 120),
            mockLogFileSystemLogs('siape_CEFET-MG.log', time() - 180),
            mockLogFileSystemLogs('laravel.log', time() - 240),
            mockLogFileSystemLogs('04-08-2026-mysql-slow.log', time() - 300),
            mockLogFileSystemLogs('siape_central.log', time() - 330),
            mockLogFileSystemLogs('ignored.txt', time() - 360, 'txt'),
        ]);

    $result = (new SystemLogsService())->index(
        ['limit' => 10, 'page' => 1],
        'MGI',
        usuarioComPerfilSystemLogs(PerfilEnum::PARTICIPANTE->value)
    );

    expect($result['success'])->toBeTrue()
        ->and($result['data'])->toHaveCount(2)
        ->and($result['data'][0]['filename'])->toBe('MGI-04-08-2026-laravel.log')
        ->and($result['data'][1]['filename'])->toBe('siape_MGI.log')
        ->and($result['meta']['total'])->toBe(2)
        ->and($result['data'][0])->not->toHaveKey('path');
});

it('returns current tenant and generic logs for developer', function () {
    $logPath = storage_path('logs');

    File::shouldReceive('exists')
        ->with($logPath)
        ->andReturn(true);

    File::shouldReceive('files')
        ->with($logPath)
        ->andReturn([
            mockLogFileSystemLogs('MGI-04-08-2026-laravel.log', time()),
            mockLogFileSystemLogs('siape_MGI.log', time() - 60),
            mockLogFileSystemLogs('CEFET-MG-04-08-2026-laravel.log', time() - 120),
            mockLogFileSystemLogs('siape_CEFET-MG.log', time() - 180),
            mockLogFileSystemLogs('laravel.log', time() - 240),
            mockLogFileSystemLogs('04-08-2026-mysql-slow.log', time() - 300),
            mockLogFileSystemLogs('horizon.log', time() - 360),
            mockLogFileSystemLogs('siape_central.log', time() - 420),
        ]);

    $result = (new SystemLogsService())->index(
        ['limit' => 10, 'page' => 1],
        'MGI',
        usuarioComPerfilSystemLogs(PerfilEnum::DESENVOLVEDOR->value)
    );

    expect($result['success'])->toBeTrue()
        ->and($result['meta']['total'])->toBe(6)
        ->and(array_column($result['data'], 'filename'))->toBe([
            'MGI-04-08-2026-laravel.log',
            'siape_MGI.log',
            'laravel.log',
            '04-08-2026-mysql-slow.log',
            'horizon.log',
            'siape_central.log',
        ]);
});

it('paginates after filtering authorized logs', function () {
    $logPath = storage_path('logs');

    File::shouldReceive('exists')
        ->with($logPath)
        ->andReturn(true);

    File::shouldReceive('files')
        ->with($logPath)
        ->andReturn([
            mockLogFileSystemLogs('MGI-04-08-2026-laravel.log', time()),
            mockLogFileSystemLogs('siape_MGI.log', time() - 60),
            mockLogFileSystemLogs('MGI-03-08-2026-laravel.log', time() - 120),
            mockLogFileSystemLogs('CEFET-MG-04-08-2026-laravel.log', time() - 180),
        ]);

    $result = (new SystemLogsService())->index(
        ['limit' => 2, 'page' => 2],
        'MGI',
        usuarioComPerfilSystemLogs(PerfilEnum::PARTICIPANTE->value)
    );

    expect($result['data'])->toHaveCount(1)
        ->and($result['data'][0]['filename'])->toBe('MGI-03-08-2026-laravel.log')
        ->and($result['meta']['total'])->toBe(3)
        ->and($result['meta']['current_page'])->toBe(2);
});

it('returns empty when log directory does not exist', function () {
    $logPath = storage_path('logs');

    File::shouldReceive('exists')
        ->with($logPath)
        ->andReturn(false);

    $result = (new SystemLogsService())->index([]);

    expect($result['success'])->toBeTrue()
        ->and($result['data'])->toBeEmpty()
        ->and($result['meta']['total'])->toBe(0);
});

it('downloads small file', function () {
    $filename = 'MGI-04-08-2026-laravel.log';
    $path = storage_path('logs/' . $filename);

    Log::shouldReceive('info')->once();

    File::shouldReceive('exists')->with($path)->andReturn(true);
    File::shouldReceive('size')->with($path)->andReturn(1024);

    $result = (new SystemLogsService())->downloadLog(
        $filename,
        'MGI',
        usuarioComPerfilSystemLogs(PerfilEnum::PARTICIPANTE->value)
    );

    expect($result['type'])->toBe('file')
        ->and($result['data'])->toBe($path)
        ->and($result['filename'])->toBe($filename);
});

it('downloads large file truncated', function () {
    $filename = 'MGI-04-08-2026-laravel.log';
    $path = storage_path('logs/' . $filename);
    $content = str_repeat('A', 2 * 1024 * 1024 + 100);

    file_put_contents($path, $content);

    try {
        Log::shouldReceive('info')->once();

        File::shouldReceive('exists')->with($path)->andReturn(true);
        File::shouldReceive('size')->with($path)->andReturn(strlen($content));

        $result = (new SystemLogsService())->downloadLog(
            $filename,
            'MGI',
            usuarioComPerfilSystemLogs(PerfilEnum::PARTICIPANTE->value)
        );

        expect($result['type'])->toBe('content')
            ->and(strlen($result['data']))->toBe(2 * 1024 * 1024)
            ->and($result['filename'])->toBe($filename);
    } finally {
        if (file_exists($path)) {
            unlink($path);
        }
    }
});

it('throws exception for invalid filename', function () {
    Log::shouldReceive('info')->once();
    Log::shouldReceive('warning')->once();

    expect(fn () => (new SystemLogsService())->downloadLog(
        '../../../etc/passwd',
        'MGI',
        usuarioComPerfilSystemLogs(PerfilEnum::PARTICIPANTE->value)
    ))->toThrow(ServerException::class, 'Nome de arquivo inválido.');
});

it('throws exception for invalid extension', function () {
    Log::shouldReceive('info')->once();
    Log::shouldReceive('warning')->once();

    expect(fn () => (new SystemLogsService())->downloadLog(
        'test.txt',
        'MGI',
        usuarioComPerfilSystemLogs(PerfilEnum::PARTICIPANTE->value)
    ))->toThrow(ServerException::class, 'Tipo de arquivo não permitido.');
});

it('throws exception if file not found', function () {
    $filename = 'MGI-04-08-2026-laravel.log';
    $path = storage_path('logs/' . $filename);

    Log::shouldReceive('info')->once();

    File::shouldReceive('exists')->with($path)->andReturn(false);

    expect(fn () => (new SystemLogsService())->downloadLog(
        $filename,
        'MGI',
        usuarioComPerfilSystemLogs(PerfilEnum::PARTICIPANTE->value)
    ))->toThrow(ServerException::class, 'Arquivo não encontrado.');
});

it('blocks other tenant log download', function () {
    Log::shouldReceive('info')->once();
    Log::shouldReceive('warning')->once();

    expect(fn () => (new SystemLogsService())->downloadLog(
        'CEFET-MG-04-08-2026-laravel.log',
        'MGI',
        usuarioComPerfilSystemLogs(PerfilEnum::DESENVOLVEDOR->value)
    ))->toThrow(ServerException::class, 'Arquivo não encontrado.');
});

it('blocks generic log download for non developer', function () {
    Log::shouldReceive('info')->once();
    Log::shouldReceive('warning')->once();

    expect(fn () => (new SystemLogsService())->downloadLog(
        'laravel.log',
        'MGI',
        usuarioComPerfilSystemLogs(PerfilEnum::PARTICIPANTE->value)
    ))->toThrow(ServerException::class, 'Arquivo não encontrado.');
});

it('allows generic log download for developer', function () {
    $filename = '04-08-2026-mysql-slow.log';
    $path = storage_path('logs/' . $filename);

    Log::shouldReceive('info')->once();

    File::shouldReceive('exists')->with($path)->andReturn(true);
    File::shouldReceive('size')->with($path)->andReturn(1024);

    $result = (new SystemLogsService())->downloadLog(
        $filename,
        'MGI',
        usuarioComPerfilSystemLogs(PerfilEnum::DESENVOLVEDOR->value)
    );

    expect($result['type'])->toBe('file')
        ->and($result['data'])->toBe($path)
        ->and($result['filename'])->toBe($filename);
});

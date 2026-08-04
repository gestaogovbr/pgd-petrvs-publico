<?php

namespace Tests\Unit;

use App\Enums\PerfilEnum;
use App\Models\Perfil;
use App\Models\Usuario;
use App\Services\SystemLogsService;
use Illuminate\Support\Facades\File;
use Tests\TestCase;
use Mockery;
use Symfony\Component\Finder\SplFileInfo;
use App\Exceptions\ServerException;
use Illuminate\Support\Facades\Log;

class SystemLogsServiceTest extends TestCase
{
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_it_returns_only_current_tenant_logs_for_non_developer()
    {
        $logPath = storage_path('logs');

        File::shouldReceive('exists')
            ->with($logPath)
            ->andReturn(true);

        File::shouldReceive('files')
            ->with($logPath)
            ->andReturn([
                $this->mockLogFile('MGI-04-08-2026-laravel.log', time()),
                $this->mockLogFile('siape_MGI.log', time() - 60),
                $this->mockLogFile('CEFET-MG-04-08-2026-laravel.log', time() - 120),
                $this->mockLogFile('siape_CEFET-MG.log', time() - 180),
                $this->mockLogFile('laravel.log', time() - 240),
                $this->mockLogFile('04-08-2026-mysql-slow.log', time() - 300),
                $this->mockLogFile('siape_central.log', time() - 330),
                $this->mockLogFile('ignored.txt', time() - 360, 'txt'),
            ]);

        $service = new SystemLogsService();

        $result = $service->index(
            ['limit' => 10, 'page' => 1],
            'MGI',
            $this->usuarioComPerfil(PerfilEnum::PARTICIPANTE->value)
        );

        $this->assertTrue($result['success']);
        $this->assertCount(2, $result['data']);
        $this->assertEquals('MGI-04-08-2026-laravel.log', $result['data'][0]['filename']);
        $this->assertEquals('siape_MGI.log', $result['data'][1]['filename']);
        $this->assertEquals(2, $result['meta']['total']);
        $this->assertArrayNotHasKey('path', $result['data'][0]);
    }

    public function test_it_returns_current_tenant_and_generic_logs_for_developer()
    {
        $logPath = storage_path('logs');

        File::shouldReceive('exists')
            ->with($logPath)
            ->andReturn(true);

        File::shouldReceive('files')
            ->with($logPath)
            ->andReturn([
                $this->mockLogFile('MGI-04-08-2026-laravel.log', time()),
                $this->mockLogFile('siape_MGI.log', time() - 60),
                $this->mockLogFile('CEFET-MG-04-08-2026-laravel.log', time() - 120),
                $this->mockLogFile('siape_CEFET-MG.log', time() - 180),
                $this->mockLogFile('laravel.log', time() - 240),
                $this->mockLogFile('04-08-2026-mysql-slow.log', time() - 300),
                $this->mockLogFile('horizon.log', time() - 360),
                $this->mockLogFile('siape_central.log', time() - 420),
            ]);

        $service = new SystemLogsService();

        $result = $service->index(
            ['limit' => 10, 'page' => 1],
            'MGI',
            $this->usuarioComPerfil(PerfilEnum::DESENVOLVEDOR->value)
        );

        $this->assertTrue($result['success']);
        $this->assertEquals(6, $result['meta']['total']);
        $this->assertSame([
            'MGI-04-08-2026-laravel.log',
            'siape_MGI.log',
            'laravel.log',
            '04-08-2026-mysql-slow.log',
            'horizon.log',
            'siape_central.log',
        ], array_column($result['data'], 'filename'));
    }

    public function test_it_paginates_after_filtering_authorized_logs()
    {
        $logPath = storage_path('logs');

        File::shouldReceive('exists')
            ->with($logPath)
            ->andReturn(true);

        File::shouldReceive('files')
            ->with($logPath)
            ->andReturn([
                $this->mockLogFile('MGI-04-08-2026-laravel.log', time()),
                $this->mockLogFile('siape_MGI.log', time() - 60),
                $this->mockLogFile('MGI-03-08-2026-laravel.log', time() - 120),
                $this->mockLogFile('CEFET-MG-04-08-2026-laravel.log', time() - 180),
            ]);

        $service = new SystemLogsService();

        $result = $service->index(
            ['limit' => 2, 'page' => 2],
            'MGI',
            $this->usuarioComPerfil(PerfilEnum::PARTICIPANTE->value)
        );

        $this->assertCount(1, $result['data']);
        $this->assertEquals('MGI-03-08-2026-laravel.log', $result['data'][0]['filename']);
        $this->assertEquals(3, $result['meta']['total']);
        $this->assertEquals(2, $result['meta']['current_page']);
    }

    public function test_it_returns_empty_when_log_directory_does_not_exist()
    {
        // Arrange
        $logPath = storage_path('logs');
        
        File::shouldReceive('exists')
            ->with($logPath)
            ->andReturn(false);

        $service = new SystemLogsService();

        // Act
        $result = $service->index([]);

        // Assert
        $this->assertTrue($result['success']);
        $this->assertEmpty($result['data']);
        $this->assertEquals(0, $result['meta']['total']);
    }

    public function test_it_downloads_small_file()
    {
        $filename = 'MGI-04-08-2026-laravel.log';
        $path = storage_path('logs/' . $filename);
        
        Log::shouldReceive('info')->once();
        
        File::shouldReceive('exists')->with($path)->andReturn(true);
        File::shouldReceive('size')->with($path)->andReturn(1024); // 1KB
        
        $service = new SystemLogsService();
        $result = $service->downloadLog($filename, 'MGI', $this->usuarioComPerfil(PerfilEnum::PARTICIPANTE->value));
        
        $this->assertEquals('file', $result['type']);
        $this->assertEquals($path, $result['data']);
        $this->assertEquals($filename, $result['filename']);
    }

    public function test_it_downloads_large_file_truncated()
    {
        $filename = 'MGI-04-08-2026-laravel.log';
        $path = storage_path('logs/' . $filename);
        
        // Create real file for fopen/fread
        $content = str_repeat('A', 2 * 1024 * 1024 + 100); // 2MB + 100 bytes
        file_put_contents($path, $content);
        
        try {
            // Mock Security Log
            Log::shouldReceive('info')->once();
            
            // Mock File facade
            File::shouldReceive('exists')->with($path)->andReturn(true);
            File::shouldReceive('size')->with($path)->andReturn(strlen($content));
            
            $service = new SystemLogsService();
            $result = $service->downloadLog($filename, 'MGI', $this->usuarioComPerfil(PerfilEnum::PARTICIPANTE->value));
            
            $this->assertEquals('content', $result['type']);
            $this->assertEquals(2 * 1024 * 1024, strlen($result['data']));
            $this->assertEquals($filename, $result['filename']);
        } finally {
            if (file_exists($path)) unlink($path);
        }
    }

    public function test_it_throws_exception_for_invalid_filename()
    {
        Log::shouldReceive('info')->once();
        Log::shouldReceive('warning')->once();
        
        $service = new SystemLogsService();
        
        $this->expectException(ServerException::class);
        $this->expectExceptionMessage("Nome de arquivo inválido.");
        
        $service->downloadLog('../../../etc/passwd', 'MGI', $this->usuarioComPerfil(PerfilEnum::PARTICIPANTE->value));
    }

    public function test_it_throws_exception_for_invalid_extension()
    {
        Log::shouldReceive('info')->once();
        Log::shouldReceive('warning')->once();
        
        $service = new SystemLogsService();
        
        $this->expectException(ServerException::class);
        $this->expectExceptionMessage("Tipo de arquivo não permitido.");
        
        $service->downloadLog('test.txt', 'MGI', $this->usuarioComPerfil(PerfilEnum::PARTICIPANTE->value));
    }

    public function test_it_throws_exception_if_file_not_found()
    {
        $filename = 'MGI-04-08-2026-laravel.log';
        $path = storage_path('logs/' . $filename);
        
        Log::shouldReceive('info')->once();
        
        File::shouldReceive('exists')->with($path)->andReturn(false);
        
        $service = new SystemLogsService();
        
        $this->expectException(ServerException::class);
        $this->expectExceptionMessage("Arquivo não encontrado.");
        
        $service->downloadLog($filename, 'MGI', $this->usuarioComPerfil(PerfilEnum::PARTICIPANTE->value));
    }

    public function test_it_blocks_other_tenant_log_download()
    {
        Log::shouldReceive('info')->once();
        Log::shouldReceive('warning')->once();

        $service = new SystemLogsService();

        $this->expectException(ServerException::class);
        $this->expectExceptionMessage("Arquivo não encontrado.");

        $service->downloadLog(
            'CEFET-MG-04-08-2026-laravel.log',
            'MGI',
            $this->usuarioComPerfil(PerfilEnum::DESENVOLVEDOR->value)
        );
    }

    public function test_it_blocks_generic_log_download_for_non_developer()
    {
        Log::shouldReceive('info')->once();
        Log::shouldReceive('warning')->once();

        $service = new SystemLogsService();

        $this->expectException(ServerException::class);
        $this->expectExceptionMessage("Arquivo não encontrado.");

        $service->downloadLog(
            'laravel.log',
            'MGI',
            $this->usuarioComPerfil(PerfilEnum::PARTICIPANTE->value)
        );
    }

    public function test_it_allows_generic_log_download_for_developer()
    {
        $filename = '04-08-2026-mysql-slow.log';
        $path = storage_path('logs/' . $filename);

        Log::shouldReceive('info')->once();

        File::shouldReceive('exists')->with($path)->andReturn(true);
        File::shouldReceive('size')->with($path)->andReturn(1024);

        $service = new SystemLogsService();
        $result = $service->downloadLog($filename, 'MGI', $this->usuarioComPerfil(PerfilEnum::DESENVOLVEDOR->value));

        $this->assertEquals('file', $result['type']);
        $this->assertEquals($path, $result['data']);
        $this->assertEquals($filename, $result['filename']);
    }

    private function usuarioComPerfil(int $nivel): Usuario
    {
        $usuario = new Usuario(['id' => 'usuario-test']);
        $usuario->setRelation('perfil', new Perfil(['nivel' => $nivel]));

        return $usuario;
    }

    private function mockLogFile(string $filename, int $mtime, string $extension = 'log'): SplFileInfo
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
}

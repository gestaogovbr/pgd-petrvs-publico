<?php

namespace Tests\Unit;

use App\Services\SystemLogsService;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
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

    public function test_it_returns_paginated_logs()
    {
        // Arrange
        $logPath = storage_path('logs');
        
        // Mock File facade
        File::shouldReceive('exists')
            ->with($logPath)
            ->andReturn(true);

        // Create mock files
        $file1 = Mockery::mock(SplFileInfo::class);
        $file1->shouldReceive('getExtension')->andReturn('log');
        $file1->shouldReceive('getFilename')->andReturn('test1.log');
        $file1->shouldReceive('getSize')->andReturn(1024);
        $file1->shouldReceive('getMTime')->andReturn(time());
        $file1->shouldReceive('getPathname')->andReturn('/path/to/test1.log');

        $file2 = Mockery::mock(SplFileInfo::class);
        $file2->shouldReceive('getExtension')->andReturn('txt'); // Should be ignored

        $file3 = Mockery::mock(SplFileInfo::class);
        $file3->shouldReceive('getExtension')->andReturn('log');
        $file3->shouldReceive('getFilename')->andReturn('test2.log');
        $file3->shouldReceive('getSize')->andReturn(2048);
        $file3->shouldReceive('getMTime')->andReturn(time() - 3600); // Older
        $file3->shouldReceive('getPathname')->andReturn('/path/to/test2.log');

        File::shouldReceive('files')
            ->with($logPath)
            ->andReturn([$file1, $file2, $file3]);

        $service = new SystemLogsService();

        // Act
        $result = $service->index(['limit' => 10, 'page' => 1]);

        // Assert
        $this->assertTrue($result['success']);
        $this->assertCount(2, $result['data']);
        $this->assertEquals('test1.log', $result['data'][0]['filename']); // Newest first
        $this->assertEquals('test2.log', $result['data'][1]['filename']);
        $this->assertEquals(2, $result['meta']['total']);
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
        $filename = 'test_small.log';
        $path = storage_path('logs/' . $filename);
        
        // Mock Security Log
        Log::shouldReceive('info')->once();
        
        // Mock File facade
        File::shouldReceive('exists')->with($path)->andReturn(true);
        File::shouldReceive('size')->with($path)->andReturn(1024); // 1KB
        
        $service = new SystemLogsService();
        $result = $service->downloadLog($filename);
        
        $this->assertEquals('file', $result['type']);
        $this->assertEquals($path, $result['data']);
        $this->assertEquals($filename, $result['filename']);
    }

    public function test_it_downloads_large_file_truncated()
    {
        $filename = 'test_large.log';
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
            $result = $service->downloadLog($filename);
            
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
        
        $service->downloadLog('../../../etc/passwd');
    }

    public function test_it_throws_exception_for_invalid_extension()
    {
        Log::shouldReceive('info')->once();
        Log::shouldReceive('warning')->once();
        
        $service = new SystemLogsService();
        
        $this->expectException(ServerException::class);
        $this->expectExceptionMessage("Tipo de arquivo não permitido.");
        
        $service->downloadLog('test.txt');
    }

    public function test_it_throws_exception_if_file_not_found()
    {
        $filename = 'not_found.log';
        $path = storage_path('logs/' . $filename);
        
        Log::shouldReceive('info')->once();
        
        File::shouldReceive('exists')->with($path)->andReturn(false);
        
        $service = new SystemLogsService();
        
        $this->expectException(ServerException::class);
        $this->expectExceptionMessage("Arquivo não encontrado.");
        
        $service->downloadLog($filename);
    }
}

<?php

namespace Tests\Unit;

use App\Services\SystemLogsService;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Mockery;
use Symfony\Component\Finder\SplFileInfo;

class SystemLogsServiceTest extends TestCase
{
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
}

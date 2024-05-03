<?php

namespace App\Logging;

use App\Models\Logs;
use App\Tenant;
use Illuminate\Support\Facades\Request;
use Monolog\Logger;
use Monolog\Handler\AbstractProcessingHandler;
use Monolog\LogRecord;


class DatabaseLogger
{
    public function __invoke(array $config)
    {
        $logger = new Logger('db');
        $handler = new class extends AbstractProcessingHandler {
            protected function write(LogRecord $record): void
            {
                $tenantId = Request::Header('X-ENTIDADE') ?? null;

                Logs::create([
                    'tenant_id' => $tenantId, // O tenant_id pode ser null
                    'level' => $record['level_name'],
                    'message' => $record['message'],
                    'context' => json_encode($record['context']),
                ]);
            }
        };

        $logger->pushHandler($handler);

        return $logger;
    }
}

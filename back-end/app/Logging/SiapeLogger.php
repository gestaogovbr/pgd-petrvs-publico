<?php

namespace App\Logging;

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\LineFormatter;

class SiapeLogger
{
    public function __invoke(array $config)
    {
        $logger = new Logger('siape');

        $tenantId = function_exists('tenant') ? (tenant('id') ?? 'central') : 'central';
        $filename = storage_path('logs/siape_' . $tenantId . '.log');

        if (!file_exists($filename)) {
            @touch($filename);
            @chmod($filename, 0777);
        }

        $handler = new StreamHandler($filename, Logger::DEBUG, true, 0777);
        $handler->setFormatter(new LineFormatter(null, null, true, true));
        $logger->pushHandler($handler);

        return $logger;
    }
}


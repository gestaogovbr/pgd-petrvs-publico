<?php
namespace App\Services;

use Illuminate\Support\Facades\Log;

trait LogTrait
{
    CONST LOG_CHANNEL_SIAPE = 'siape';

    /**
     * @deprecated use SiapeLog::info(), SiapeLog::error(), etc.
     */
    public function logSiape(string|\Stringable $message, array $context = [], Tipo $tipo = Tipo::INFO, bool $local = true): void
    {
        if(env('APP_ENV') != 'local') {
            return;
        } 
        $tipoLog = $tipo->value;
        Log::channel(self::LOG_CHANNEL_SIAPE)->$tipoLog($message, $context);
    }
}

enum Tipo: string {
    case INFO = 'info';
    case ERROR = 'error';
    case WARNING = 'warning';
    case NOTICE = 'notice';
    case DEBUG = 'debug';
}

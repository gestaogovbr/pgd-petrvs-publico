<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Support\Facades\Log;

class EnvioNaoAgendadoException extends Exception
{
    public function __construct(private string $tenantId, private string $tipo, private string $id, string $message = "", $code = 0, Exception $previous = null) {
        parent::__construct($message, $code, $previous);
    }

    public function log() {
        Log::info("[{$this->tenantId}] {$this->tipo} #{$this->id}: Envio não agendado: {$this->message}");
    }
}

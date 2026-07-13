<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Support\Facades\Log;

class EnvioNaoAgendadoException extends Exception
{
    private const TIPOS_DEPENDENCIA = ['PlanoEntrega', 'Usuario', 'Participante'];

    public function __construct(
        private string $tenantId,
        private string $tipo,
        private string $id,
        string $message = "",
        private string|int|null $identificacao = null,
        $code = 0,
        Exception $previous = null,
    ) {
        parent::__construct($message, $code, $previous);
    }

    public function getTipo(): string
    {
        return $this->tipo;
    }

    public function getItemId(): string
    {
        return $this->id;
    }

    public function getIdentificacao(): string
    {
        if ($this->identificacao !== null && $this->identificacao !== '') {
            return (string) $this->identificacao;
        }

        return $this->id;
    }

    public function isErroDependencia(): bool
    {
        return in_array($this->tipo, self::TIPOS_DEPENDENCIA, true);
    }

    public function log() {
        Log::info("[{$this->tenantId}] {$this->tipo} #{$this->getIdentificacao()}: Envio não agendado: {$this->message}");
    }
}

<?php

namespace App\Exceptions;

use Exception;

class SipecApiRetryableException extends Exception
{
    private int $httpCode;

    public function __construct(int $httpCode, string $message = '', ?Exception $previous = null)
    {
        $this->httpCode = $httpCode;
        parent::__construct($message, $httpCode, $previous);
    }

    public function getHttpCode(): int
    {
        return $this->httpCode;
    }

    public function is5xx(): bool
    {
        return $this->httpCode >= 500;
    }
}

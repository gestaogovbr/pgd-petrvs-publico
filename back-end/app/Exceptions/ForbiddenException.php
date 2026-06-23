<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Exceptions\Contracts\IBaseException;
use Exception;

class ForbiddenException extends Exception implements IBaseException
{
    public function __construct(string $message = '', int $code = 403, ?Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}

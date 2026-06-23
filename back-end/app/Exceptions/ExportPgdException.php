<?php

namespace App\Exceptions;

use Exception;

class ExportPgdException extends Exception
{
    public string|int|null $objectId;

    public function __construct(
        string $message,
        string|int|null $objectId = null,
        int $code = 0,
        ?Exception $previous = null
    ) {
        $this->objectId = $objectId;

        parent::__construct($message, $code, $previous);
    }
}

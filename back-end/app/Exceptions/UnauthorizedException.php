<?php
namespace App\Exceptions;

use App\Exceptions\Contracts\IBaseException;
use Exception;

class UnauthorizedException extends Exception implements IBaseException
{
    public function __construct($message = "", $code = 401, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
<?php
namespace App\Exceptions;

use App\Exceptions\Contracts\IBaseException;
use Exception;

class ValidateException extends Exception implements IBaseException
{
    public function __construct($message = "", $code = 422, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
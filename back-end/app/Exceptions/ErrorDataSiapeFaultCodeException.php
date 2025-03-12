<?php
namespace App\Exceptions;

use App\Exceptions\Contracts\IBaseException;
use Exception;

class ErrorDataSiapeFaultCodeException extends Exception implements IBaseException
{
    public function __construct($message = "", $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
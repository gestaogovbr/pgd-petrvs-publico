<?php
namespace App\Exceptions;

use App\Exceptions\Contracts\IBaseException;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class BadGatewayException extends Exception implements IBaseException
{
    public function __construct($message = "", $code = Response::HTTP_BAD_GATEWAY, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
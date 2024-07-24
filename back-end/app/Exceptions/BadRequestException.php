<?php
namespace App\Exceptions;

use App\Exceptions\Contracts\IBaseException;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class BadRequestException extends Exception implements IBaseException
{
    public function __construct($message = "", $code = Response::HTTP_BAD_REQUEST, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
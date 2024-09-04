<?php
namespace App\Exceptions;

use Exception;


class RequestConectaGovException extends Exception
{
    public function __construct($message = "Erro ao tentar se conectar com o ConectaGov", $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
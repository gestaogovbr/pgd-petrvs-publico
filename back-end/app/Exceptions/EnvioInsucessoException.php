<?php

namespace App\Exceptions;

use Exception;

/**
 * Indica que o envio falhou e já foi registrado como insucesso.
 * Usada para interromper a cadeia de jobs sem reprocessar o registro em failed().
 */
class EnvioInsucessoException extends Exception
{
}

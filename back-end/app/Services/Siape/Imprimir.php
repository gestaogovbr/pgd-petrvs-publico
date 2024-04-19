<?php
namespace App\Services\Siape;

trait Imprimir {

    public function imprimeNoTerminal($str)
    {
      passthru("echo " . $str);
      ob_flush();
    }
}
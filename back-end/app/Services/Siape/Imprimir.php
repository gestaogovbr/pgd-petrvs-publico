<?php
namespace App\Services\Siape;

use Illuminate\Support\Facades\Log;

trait Imprimir {

    public function imprimeNoTerminal($str)
    {
      //passthru("echo " . $str);
      //ob_flush();
      Log::info($str);
    }
}
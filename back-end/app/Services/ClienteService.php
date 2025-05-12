<?php

namespace App\Services;
use App\Services\ServiceBase;
use App\Exceptions\ServerException;

class ClienteService extends ServiceBase
{

   public function proxyDestroy($cliente)
   {
      if ($cliente->clienteProduto->count() == 0) {
         return true;
      }
      throw new ServerException(
       "ClienteDestroy",
        "possui produtos associados."
      );
   }

}
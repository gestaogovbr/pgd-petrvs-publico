<?php

namespace App\Services;
use App\Services\ServiceBase;
use App\Exceptions\ServerException;

class TipoClienteService extends ServiceBase
{
   public function proxyDestroy($tipoCliente)
   {
      if ($tipoCliente->clientes->count() == 0) {
         return true;
      }
      throw new ServerException(
       "TipoClienteExcluir",
        "possui clientes associados."
      );
   }
}
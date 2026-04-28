<?php

namespace App\V2\TipoModalidade;

use App\Support\ModalidadePgd;
use Illuminate\Support\Collection;

class TipoModalidadeService
{
    public function index(): Collection
    {
        return new Collection(ModalidadePgd::options());
    }
}

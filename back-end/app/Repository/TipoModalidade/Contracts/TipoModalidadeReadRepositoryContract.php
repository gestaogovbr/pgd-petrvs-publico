<?php

namespace App\Repository\TipoModalidade\Contracts;

interface TipoModalidadeReadRepositoryContract
{
    /**
     * @return string|null
     */
    public function getDefaultId(): ?string;
}

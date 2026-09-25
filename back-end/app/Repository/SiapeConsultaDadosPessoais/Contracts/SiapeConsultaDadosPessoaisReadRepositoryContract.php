<?php

declare(strict_types=1);

namespace App\Repository\SiapeConsultaDadosPessoais\Contracts;

use App\DTOs\Siape\SiapeServidorPendenteDTO;
use Illuminate\Support\Collection;

/**
 * @see \App\Repository\SiapeConsultaDadosPessoais\Eloquent\EloquentSiapeConsultaDadosPessoaisReadRepository
 */
interface SiapeConsultaDadosPessoaisReadRepositoryContract
{
    /** @return Collection<int, SiapeServidorPendenteDTO> */
    public function pendentesComDadosFuncionais(): Collection;
}

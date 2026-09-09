<?php

declare(strict_types=1);

namespace App\Repository\SiapeConsultaDadosPessoais\Eloquent;

use App\DTOs\Siape\SiapeServidorPendenteDTO;
use App\Models\SiapeConsultaDadosPessoais;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SiapeConsultaDadosPessoais\Contracts\SiapeConsultaDadosPessoaisReadRepositoryContract;
use Illuminate\Support\Facades\DB;

/**
 * @extends AbstractEloquentReadRepository<SiapeConsultaDadosPessoais>
 */
class EloquentSiapeConsultaDadosPessoaisReadRepository extends AbstractEloquentReadRepository implements SiapeConsultaDadosPessoaisReadRepositoryContract
{
    public function __construct(SiapeConsultaDadosPessoais $model)
    {
        $this->model = $model;
    }

    /** @return \Illuminate\Support\Collection<int, SiapeServidorPendenteDTO> */
    public function pendentesComDadosFuncionais(): \Illuminate\Support\Collection
    {
        return DB::table('siape_consultaDadosPessoais AS p')
            ->join('siape_consultaDadosFuncionais AS f', 'p.cpf', '=', 'f.cpf')
            ->select('p.cpf', 'p.response AS responseDadosPessoais', 'f.response AS responseDadosFuncionais', 'p.data_modificacao')
            ->where('p.processado', false)
            ->get()
            ->map(static fn (object $row): SiapeServidorPendenteDTO => SiapeServidorPendenteDTO::fromDatabaseRow($row));
    }
}

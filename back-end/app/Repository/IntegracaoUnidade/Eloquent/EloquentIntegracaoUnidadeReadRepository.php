<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoUnidade\Eloquent;

use App\Models\IntegracaoUnidade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\IntegracaoUnidade\Contracts\IntegracaoUnidadeReadRepositoryContract;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * @extends AbstractEloquentReadRepository<IntegracaoUnidade>
 */
class EloquentIntegracaoUnidadeReadRepository extends AbstractEloquentReadRepository implements IntegracaoUnidadeReadRepositoryContract
{
    public function __construct(IntegracaoUnidade $model)
    {
        $this->model = $model;
    }

    public function getUnidadesComChefias(): Collection
    {
        return DB::table('integracao_unidades as iu')
            ->join('unidades as u', 'iu.codigo_siape', '=', 'u.codigo')
            ->select([
                'u.id as id_unidade',
                'u.codigo as codigo_unidade',
                'iu.cpf_titular_autoridade_uorg as cpf_chefe'
            ])
            ->whereNull('u.deleted_at')
            ->get();
    }
}
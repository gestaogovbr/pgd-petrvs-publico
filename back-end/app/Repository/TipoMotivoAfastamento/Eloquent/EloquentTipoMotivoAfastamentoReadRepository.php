<?php

declare(strict_types=1);

namespace App\Repository\TipoMotivoAfastamento\Eloquent;

use App\Models\TipoMotivoAfastamento;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\TipoMotivoAfastamento\Contracts\TipoMotivoAfastamentoReadRepositoryContract;
use Illuminate\Support\Collection;

/**
 * @extends AbstractEloquentReadRepository<TipoMotivoAfastamento>
 */
class EloquentTipoMotivoAfastamentoReadRepository extends AbstractEloquentReadRepository implements TipoMotivoAfastamentoReadRepositoryContract
{
    private const TIPOS_OCULTOS_DROPDOWN = [
        'Comparecimento para fins de saúde (não se aplica para teletrabalho integral)',
        'Redução de jornada sem redução salarial',
    ];

    public function __construct(TipoMotivoAfastamento $model)
    {
        $this->model = $model;
    }

    public function getAllForDropdown(): Collection
    {
        return $this->query()
            ->select(['id', 'codigo', 'nome', 'horas'])
            ->whereNotIn('nome', self::TIPOS_OCULTOS_DROPDOWN)
            ->orderBy('nome')
            ->get();
    }
}

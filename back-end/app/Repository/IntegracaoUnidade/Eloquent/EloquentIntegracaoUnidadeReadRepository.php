<?php

declare(strict_types=1);

namespace App\Repository\IntegracaoUnidade\Eloquent;

use App\Models\IntegracaoUnidade;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\IntegracaoUnidade\Contracts\IntegracaoUnidadeReadRepositoryContract;
use App\Services\UtilService;
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

    public function getUnidadesComChefias(string $codigoOrgao): Collection
    {
        return DB::table('integracao_unidades as iu')
            ->join('unidades as u', function ($join): void {
                $join->on('iu.codigo_siape', '=', 'u.codigo')
                    ->on('iu.codigo_orgao', '=', 'u.codigo_orgao');
            })
            ->select([
                'u.id as id_unidade',
                'u.codigo as codigo_unidade',
                'u.codigo_orgao',
                'iu.cpf_titular_autoridade_uorg as cpf_chefe'
            ])
            ->where('iu.codigo_orgao', $codigoOrgao)
            ->whereNull('u.deleted_at')
            ->get();
    }

    public function findByCodigoOrgao(string $codigoOrgao, string $codigo): ?IntegracaoUnidade
    {
        $registro = $this->query()
            ->where('codigo_orgao', $codigoOrgao)
            ->where(function ($query) use ($codigo): void {
                $query->where('id_servo', $codigo)
                    ->orWhere('codigo_siape', $codigo);
            })
            ->first();

        return $registro instanceof IntegracaoUnidade ? $registro : null;
    }

    /**
     * @return Collection<int, non-falsy-string>
     */
    public function getCodigosByCpfTitular(string $cpf, string $codigoOrgao, ?string $codigoExcluido = null): Collection
    {
        $cpf = UtilService::onlyNumbers($cpf);

        if ($cpf === '') {
            return collect();
        }

        $cpfNormalizadoSql = "REPLACE(REPLACE(REPLACE(cpf_titular_autoridade_uorg, '.', ''), '-', ''), ' ', '')";

        return $this->query()
            ->where('codigo_orgao', $codigoOrgao)
            ->whereNull('deleted_at')
            ->whereRaw($cpfNormalizadoSql . ' = ?', [$cpf])
            ->when($codigoExcluido !== null && $codigoExcluido !== '', function ($query) use ($codigoExcluido): void {
                $query->where('id_servo', '<>', $codigoExcluido)
                    ->where('codigo_siape', '<>', $codigoExcluido);
            })
            ->get(['id_servo', 'codigo_siape'])
            ->map(fn (IntegracaoUnidade $unidade): ?string => $unidade->id_servo ?: $unidade->codigo_siape)
            ->filter()
            ->unique()
            ->values();
    }
}

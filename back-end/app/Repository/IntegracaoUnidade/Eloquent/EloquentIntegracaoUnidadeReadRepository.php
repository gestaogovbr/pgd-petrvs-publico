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

    /** @return array<int, object> */
    public function selecionarPendentesSincronizacao(string $codigoOrgao, string $paiNaoInformado, int $codigoRaiz): array
    {
        $sql = "SELECT iu.id_servo, u.codigo as codigo_antigo, " .
            "iu.nomeuorg, u.nome as nome_antigo, iu.siglauorg, " .
            "u.sigla as sigla_antiga, iu.pai_servo, " .
            "un_atual_pai.id as id_pai_antigo, u.id, u.path as path_antigo, " .
            "c.id AS cidade_id, u.cidade_id as cidade_antiga, " .
            "und.id AS unidade_pai_id, un_atual_pai.codigo AS codigo_pai_antigo, " .
            "und.path AS path_pai, " .
            "iu.data_modificacao as data_modificacao_siape, " .
            "u.data_modificacao as data_modificacao_und " .
            "FROM integracao_unidades iu " .
            "LEFT JOIN unidades u ON (iu.id_servo = u.codigo AND iu.codigo_orgao = u.codigo_orgao) " .
            "LEFT JOIN unidades un_atual_pai ON (un_atual_pai.id = u.unidade_pai_id) " .
            "LEFT JOIN unidades und ON (iu.pai_servo = und.codigo AND iu.codigo_orgao = und.codigo_orgao) " .
            "LEFT JOIN cidades c ON (iu.municipio_ibge = c.codigo_ibge) " .
            "LEFT JOIN cidades c2 ON u.cidade_id = c2.id " .
            "WHERE (u.id is null OR c2.id != c.id OR iu.nomeuorg != u.nome " .
            "OR iu.siglauorg != u.sigla " .
            "OR NOT (NULLIF(NULLIF(iu.pai_servo, ?), ?) <=> un_atual_pai.codigo)" .
            ") AND iu.ativa = 'true' AND iu.deleted_at is NULL AND iu.codigo_orgao = ?";

        return DB::select($sql, [$paiNaoInformado, $codigoRaiz, $codigoOrgao]);
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

    public function findByCodigo(string $codigo): ?IntegracaoUnidade
    {
        /** @var IntegracaoUnidade|null $registro */
        $registro = $this->model->withTrashed()
            ->where(function ($query) use ($codigo): void {
                $query->where('id_servo', $codigo)
                    ->orWhere('codigo_siape', $codigo);
            })
            ->first();

        return $registro;
    }

    public function findByCodigoOrgao(string $codigoOrgao, string $codigo): ?IntegracaoUnidade
    {
        /** @var IntegracaoUnidade|null $registro */
        $registro = $this->model->withTrashed()
            ->where('codigo_orgao', $codigoOrgao)
            ->where(function ($query) use ($codigo): void {
                $query->where('id_servo', $codigo)
                    ->orWhere('codigo_siape', $codigo);
            })
            ->first();

        return $registro;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, IntegracaoUnidade>
     */
    public function findAllAtivas(): \Illuminate\Database\Eloquent\Collection
    {
        /** @var \Illuminate\Database\Eloquent\Collection<int, IntegracaoUnidade> */
        return $this->query()
            ->whereNull('deleted_at')
            ->where('ativa', 'true')
            ->select(['id_servo', 'pai_servo', 'nomeuorg', 'siglauorg', 'municipio_ibge', 'data_modificacao'])
            ->get();
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

    public function getUnidadesComChefiasCompleto(): Collection
    {
        return DB::table('integracao_unidades as iu')
            ->join('unidades as u', 'iu.id_servo', '=', 'u.codigo')
            ->select([
                'u.id as id_unidade',
                'u.codigo as codigo_unidade',
                'iu.cpf_titular_autoridade_uorg as cpf_titular',
                'iu.cpf_substituto_autoridade_uorg as cpf_substituto',
            ])
            ->whereNull('u.deleted_at')
            ->whereNull('u.data_inativacao')
            ->whereNull('iu.deleted_at')
            ->get();
    }
}

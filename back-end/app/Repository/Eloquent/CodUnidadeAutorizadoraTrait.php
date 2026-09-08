<?php

declare(strict_types=1);

namespace App\Repository\Eloquent;

use App\Exceptions\ExportPgdException;
use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Repository\TenantRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * @property Model $model
 */
trait CodUnidadeAutorizadoraTrait
{
    /**
     * @param PlanoEntrega|PlanoTrabalho|Usuario $model
     */
    public function garantirCodUnidadeAutorizadora(Model $model, string $tenantId): void
    {
        if (filled($model->getAttribute('cod_unidade_autorizadora'))) {
            return;
        }

        $tenant = app(TenantRepository::class)->findById($tenantId);

        if ($tenant === null || !filled($tenant->api_cod_unidade_autorizadora)) {
            throw new ExportPgdException('Unidade Autorizadora não definida no Tenant');
        }

        $model->setAttribute('cod_unidade_autorizadora', $tenant->api_cod_unidade_autorizadora);
        $timestampsEnabled = $model->timestamps;
        $model->timestamps = false;
        try {
            $model->saveQuietly();
        } finally {
            $model->timestamps = $timestampsEnabled;
        }
    }

    public function atualizarCodUnidadeAutorizadora(string $codUnidadeAutorizadora, bool $somenteSemCodigo = false): int
    {
        $query = method_exists($this->model, 'withTrashed')
            ? $this->model->newQuery()->withTrashed()
            : $this->model->newQuery();

        if ($somenteSemCodigo) {
            $query->where(function ($builder): void {
                $builder->whereNull('cod_unidade_autorizadora')
                    ->orWhere('cod_unidade_autorizadora', '');
            });
        }

        return $query->update([
            'cod_unidade_autorizadora' => $codUnidadeAutorizadora,
        ]);
    }
}

<?php

declare(strict_types=1);

namespace App\Repository\Feriado\Eloquent;

use App\Models\Feriado;
use App\Repository\Feriado\Contracts\FeriadoReadRepositoryContract;

class EloquentFeriadoReadRepository implements FeriadoReadRepositoryContract
{
    public function __construct(
        private readonly Feriado $model,
    ) {}

    /**
     * @inheritDoc
     */
    public function buscarFeriadosPorUnidade(string $entidadeId, ?string $cidadeId, ?string $uf): array
    {
        $query = $this->model->newQuery()
            ->where(function ($q) use ($entidadeId) {
                $q->whereNull('entidade_id')
                    ->orWhere('entidade_id', $entidadeId);
            });

        $query->where(function ($q) use ($uf, $cidadeId) {
            $q->where('abrangencia', 'NACIONAL');

            if ($uf !== null) {
                $q->orWhere(function ($q2) use ($uf) {
                    $q2->where('abrangencia', 'ESTADUAL')
                        ->where('uf', $uf);
                });
            }

            if ($cidadeId !== null) {
                $q->orWhere(function ($q2) use ($cidadeId) {
                    $q2->where('abrangencia', 'MUNICIPAL')
                        ->where('cidade_id', $cidadeId);
                });
            }
        });

        $feriados = $query->get();

        $datas = [];
        $diasSemana = [];
        foreach ($feriados as $feriado) {
            if ($feriado->tipoDia === 'SEMANA') {
                $diasSemana[(int) $feriado->dia] = $feriado->nome;
                continue;
            }
            $data = ($feriado->recorrente ? "0000" : str_pad((string) ($feriado->ano ?? ''), 4, "0", STR_PAD_LEFT))
                . "-" . str_pad((string) ($feriado->mes ?? ''), 2, "0", STR_PAD_LEFT)
                . "-" . str_pad((string) ($feriado->dia ?? ''), 2, "0", STR_PAD_LEFT);
            $datas[$data] = $feriado->nome;
        }

        return ['datas' => $datas, 'diasSemana' => $diasSemana];
    }
}

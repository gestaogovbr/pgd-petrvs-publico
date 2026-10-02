<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecServidor\Eloquent;

use App\Models\SipecServidor;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Sipec\SipecServidor\Contracts\SipecServidorWriteRepositoryContract;
use Illuminate\Database\Eloquent\Model;

final class EloquentSipecServidorWriteRepository extends AbstractEloquentWriteRepository implements SipecServidorWriteRepositoryContract
{
    public function __construct(SipecServidor $model)
    {
        $this->model = $model;
    }

    public function updateOrCreateByCpfAndMatricula(string $cpf, ?string $matricula, string $response, bool $processado, ?string $dataModificacao): Model
    {
        /** @var SipecServidor */
        return $this->model->newQuery()->updateOrCreate(
            ['cpf' => $cpf, 'matricula' => $matricula],
            [
                'response' => $response,
                'processado' => $processado,
                'data_modificacao' => $dataModificacao,
            ]
        );
    }

    public function marcarComoProcessado(SipecServidor $registro): bool
    {
        return $registro->update(['processado' => true]);
    }
}

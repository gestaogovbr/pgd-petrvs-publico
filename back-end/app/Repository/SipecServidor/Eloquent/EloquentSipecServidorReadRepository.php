<?php

declare(strict_types=1);

namespace App\Repository\SipecServidor\Eloquent;

use App\Models\SipecServidor;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\SipecServidor\Contracts\SipecServidorReadRepositoryContract;
use Illuminate\Database\Eloquent\Model;

final class EloquentSipecServidorReadRepository extends AbstractEloquentReadRepository implements SipecServidorReadRepositoryContract
{
    public function __construct(SipecServidor $model)
    {
        $this->model = $model;
    }

    /**
     * @return SipecServidor|null
     */
    public function findByCpfAndMatricula(string $cpf, ?string $matricula): ?Model
    {
        return $this->query()
            ->where('cpf', $cpf)
            ->where('matricula', $matricula)
            ->first();
    }
}

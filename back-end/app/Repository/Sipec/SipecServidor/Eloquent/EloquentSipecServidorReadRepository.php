<?php

declare(strict_types=1);

namespace App\Repository\Sipec\SipecServidor\Eloquent;

use App\Models\SipecServidor;
use App\Repository\Eloquent\AbstractEloquentReadRepository;
use App\Repository\Sipec\SipecServidor\Contracts\SipecServidorReadRepositoryContract;
use Illuminate\Database\Eloquent\Model;

final class EloquentSipecServidorReadRepository extends AbstractEloquentReadRepository implements SipecServidorReadRepositoryContract
{
    public function __construct(SipecServidor $model)
    {
        $this->model = $model;
    }

    public function findByCpfAndMatricula(string $cpf, ?string $matricula): ?Model
    {
        /** @var SipecServidor|null */
        return $this->query()
            ->where('cpf', $cpf)
            ->where('matricula', $matricula)
            ->first();
    }

    public function chunkNaoProcessados(int $chunkSize, callable $callback): void
    {
        $this->query()
            ->where('processado', false)
            ->whereNull('deleted_at')
            ->chunkById($chunkSize, $callback);
    }
}

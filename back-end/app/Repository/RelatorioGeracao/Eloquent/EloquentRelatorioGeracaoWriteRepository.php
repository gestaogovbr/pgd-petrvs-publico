<?php

declare(strict_types=1);

namespace App\Repository\RelatorioGeracao\Eloquent;

use App\Enums\RelatorioGeracaoStatus;
use App\Models\RelatorioGeracao;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\RelatorioGeracao\Contracts\RelatorioGeracaoWriteRepositoryContract;

class EloquentRelatorioGeracaoWriteRepository extends AbstractEloquentWriteRepository implements RelatorioGeracaoWriteRepositoryContract
{
    public function __construct(RelatorioGeracao $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): RelatorioGeracao
    {
        /** @var RelatorioGeracao */
        return parent::create($attributes);
    }

    public function update(string|int $id, array $attributes): ?RelatorioGeracao
    {
        /** @var RelatorioGeracao|null */
        return parent::update($id, $attributes);
    }

    public function marcarErroSeProcessando(string $id, ?string $mensagem): bool
    {
        return $this->model->newQuery()
            ->where('id', $id)
            ->where('status', RelatorioGeracaoStatus::PROCESSANDO)
            ->update([
                'status' => RelatorioGeracaoStatus::ERRO,
                'finalizado_em' => now(),
                'erro_mensagem' => $mensagem,
            ]) > 0;
    }
}

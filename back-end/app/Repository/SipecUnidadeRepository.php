<?php

declare(strict_types=1);

namespace App\Repository;

use App\Repository\SipecUnidade\Contracts\SipecUnidadeReadRepositoryContract;
use App\Repository\SipecUnidade\Contracts\SipecUnidadeWriteRepositoryContract;
use Illuminate\Database\Eloquent\Model;

class SipecUnidadeRepository
{
    public function __construct(
        private readonly SipecUnidadeReadRepositoryContract $readRepository,
        private readonly SipecUnidadeWriteRepositoryContract $writeRepository,
    ) {
    }

    /**
     * @return Model|null
     */
    public function findByCodigo(string $codigo): ?Model
    {
        return $this->readRepository->findByCodigo($codigo);
    }

    /**
     * @return Model
     */
    public function updateOrCreateByCodigo(string $codigo, string $response, bool $processado, ?string $dataModificacao): Model
    {
        return $this->writeRepository->updateOrCreateByCodigo($codigo, $response, $processado, $dataModificacao);
    }

    public function chunkNaoProcessados(int $chunkSize, callable $callback): void
    {
        $this->readRepository->chunkNaoProcessados($chunkSize, $callback);
    }

    public function marcarComoProcessado(Model $registro): bool
    {
        return $this->writeRepository->marcarComoProcessado($registro);
    }

    /**
     * @return string[] Códigos de todas as unidades SIPEC coletadas
     */
    public function getAllCodigos(): array
    {
        return $this->readRepository->getAllCodigos();
    }
}

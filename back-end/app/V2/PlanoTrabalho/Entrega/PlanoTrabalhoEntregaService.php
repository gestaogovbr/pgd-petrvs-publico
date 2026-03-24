<?php

namespace App\V2\PlanoTrabalho\Entrega;

use App\Services\PlanoTrabalhoEntregaService as EntregaServiceV1;

class PlanoTrabalhoEntregaService
{
    protected EntregaServiceV1 $v1;

    public function __construct(EntregaServiceV1 $v1)
    {
        $this->v1 = $v1;
    }

    public function store(array $entity, $unidade)
    {
        return $this->v1->store($entity, $unidade);
    }

    public function update(array $entity, $unidade)
    {
        return $this->v1->store($entity, $unidade);
    }

    public function getById(array $data)
    {
        return $this->v1->getById($data);
    }

    public function query(array $data): array
    {
        return $this->v1->query($data);
    }

    public function destroy(string $id): bool
    {
        return $this->v1->destroy($id);
    }
}

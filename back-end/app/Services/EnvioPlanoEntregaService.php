<?php

namespace App\Services;

use App\Repository\EnvioPlanoEntregaRepository;
class EnvioPlanoEntregaService
{
    private EnvioPlanoEntregaRepository $envioPlanoEntregaRepository;

    public function __construct()
    {
        $this->envioPlanoEntregaRepository = app(EnvioPlanoEntregaRepository::class);
    }

    public function query($data): array
    {
        return $this->envioPlanoEntregaRepository->query($data);
    }
}

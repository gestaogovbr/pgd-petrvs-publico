<?php

namespace App\Services;

use App\Repository\EnvioPlanoEntregaRepository;
use App\Services\ServiceBase;

class EnvioPlanoEntregaService extends ServiceBase
{
    private EnvioPlanoEntregaRepository $envioPlanoEntregaRepository;

    public function __construct()
    {
        parent::__construct();
        $this->envioPlanoEntregaRepository = app(EnvioPlanoEntregaRepository::class);
    }

    public function query($data): array
    {
        return $this->envioPlanoEntregaRepository->query($data);
    }
}

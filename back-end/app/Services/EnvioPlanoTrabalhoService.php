<?php

namespace App\Services;

use App\Repository\EnvioPlanoTrabalhoRepository;
use App\Services\ServiceBase;

class EnvioPlanoTrabalhoService
{
    private EnvioPlanoTrabalhoRepository $envioPlanoTrabalhoRepository;

    public function __construct()
    {
        $this->envioPlanoTrabalhoRepository = app(EnvioPlanoTrabalhoRepository::class);
    }

    public function query($data): array
    {
        return $this->envioPlanoTrabalhoRepository->query($data);
    }
}

<?php

namespace App\Services;

use App\Services\Sipec\SipecIndividualServidorService;
use App\Services\Sipec\SipecIndividualUnidadeService;

class SipecIndividualService extends ServiceBase
{
    private SipecIndividualServidorService $sipecIndividualServidorService;
    private SipecIndividualUnidadeService  $sipecIndividualUnidadeService;

    public function __construct($collection = null)
    {
        parent::__construct($collection);
        $this->sipecIndividualServidorService = app(SipecIndividualServidorService::class);
        $this->sipecIndividualUnidadeService  = app(SipecIndividualUnidadeService::class);
    }

    public function processaServidor(string $cpf): ?array
    {
        return $this->sipecIndividualServidorService->fluxoSipec($cpf);
    }

    public function processaUnidade(string $codUorg): ?array
    {
        return $this->sipecIndividualUnidadeService->fluxoSipec($codUorg);
    }

    public function consultaUnidade(string $codUorg): array
    {
        return $this->sipecIndividualUnidadeService->consultarUnidade($codUorg);
    }

    public function getResumo(): ?array
    {
        return $this->sipecIndividualServidorService->getResumo()
            ?? $this->sipecIndividualUnidadeService->getResumo();
    }

    public function getRelatorioCarga(): ?array
    {
        return $this->sipecIndividualServidorService->getRelatorioCarga()
            ?? $this->sipecIndividualUnidadeService->getRelatorioCarga();
    }
}

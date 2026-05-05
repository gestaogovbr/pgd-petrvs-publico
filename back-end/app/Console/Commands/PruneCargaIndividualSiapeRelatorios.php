<?php

namespace App\Console\Commands;

use App\Services\Siape\CargaIndividual\CargaIndividualSiapeRelatorioService;
use Illuminate\Console\Command;

class PruneCargaIndividualSiapeRelatorios extends Command
{
    protected $signature = 'siape:prune-relatorios-carga-individual';

    protected $description = 'Remove relatorios expirados de carga individual SIAPE no tenant atual';

    public function handle(CargaIndividualSiapeRelatorioService $service): int
    {
        $removidos = $service->limparExpirados(now());

        $this->info("Relatorios expirados removidos: {$removidos}");

        return self::SUCCESS;
    }
}

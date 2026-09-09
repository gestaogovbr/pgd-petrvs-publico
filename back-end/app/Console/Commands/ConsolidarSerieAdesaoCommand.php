<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\V2\PainelGerencial\Adesao\SerieAdesaoService;
use Illuminate\Console\Command;

class ConsolidarSerieAdesaoCommand extends Command
{
    protected $signature = 'painel:consolidar-serie-adesao
        {tenant : ID do tenant (ex: MGI)}
        {--periodo= : Período no formato YYYY-MM (default: mês atual)}';

    protected $description = 'Consolida manualmente a série de adesão (unidades executoras e participantes PGD)';

    public function handle(SerieAdesaoService $service): int
    {
        $tenantId = $this->argument('tenant');
        $periodo = $this->option('periodo') ?? now()->format('Y-m');

        $this->info("Inicializando tenant: {$tenantId}");

        $tenant = tenancy()->find($tenantId);

        if (!$tenant) {
            $this->error("Tenant '{$tenantId}' não encontrado.");
            return self::FAILURE;
        }

        tenancy()->initialize($tenant);

        $this->info("Consolidando série de adesão para o período: {$periodo}");

        $service->consolidar($periodo);

        $this->info('Consolidação concluída com sucesso.');

        return self::SUCCESS;
    }
}

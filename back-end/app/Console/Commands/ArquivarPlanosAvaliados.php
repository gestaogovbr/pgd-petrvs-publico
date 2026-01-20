<?php

namespace App\Console\Commands;

use App\Jobs\ArquivarPlanosAvaliadosJob;
use Illuminate\Console\Command;

class ArquivarPlanosAvaliados extends Command
{
    protected $signature = 'planos:arquivar-avaliados {--days=90 : Dias após ter sido assumir o status AVALIADO para o arquivamento }';

    protected $description = 'Arquivar Planos Avaliados (PTs e PEs)';

    public function handle()
    {
        ArquivarPlanosAvaliadosJob::dispatch($this->option('days'));
        $this->info("Job de arquivamento despachado para todos os tenants");
    }
}

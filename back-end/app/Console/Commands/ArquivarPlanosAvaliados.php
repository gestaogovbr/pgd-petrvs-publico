<?php

namespace App\Console\Commands;

use App\Models\PlanoEntrega;
use App\Models\PlanoTrabalho;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ArquivarPlanosAvaliados extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'planos:arquivar-avaliados {--days=90 : Dias após ter sido assumir o status AVALIADO para o arquivamento }';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Arquivar Planos Avaliados (PTs e PEs)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $days = $this->option('days');
        $cutoffDate = now()->subDays($days)->toDateString();

        DB::transaction(function () use ($cutoffDate) {
            $ptCount = PlanoTrabalho::where('status', 'AVALIADO')
                ->where('avaliado_at', '<=', $cutoffDate)
                ->update(['status' => 'ARQUIVADO']);

            $peCount = PlanoEntrega::where('status', 'AVALIADO')
                ->where('avaliado_at', '<=', $cutoffDate)
                ->update(['status' => 'ARQUIVADO']);

            $this->info("Planos de Trabalho arquivados: {$ptCount}
                         Planos de Entrega arquivados:  {$peCount}");
        });
    }
}

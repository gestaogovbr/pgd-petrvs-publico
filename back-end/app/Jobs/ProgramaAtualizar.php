<?php

namespace App\Jobs;

use App\Models\Tenant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\PGD\OrgaoCentralService;

class ProgramaAtualizar implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $dados;

    public function __construct($dados)
    {
        $this->dados = $dados;
    }

    public function handle(OrgaoCentralService $orgaoCentralService)
    {
        foreach(Tenant::all() as $tenant) {
            $tenant->run(function () {
                
                //dias_tolerancia_consolidacao
                //dias_tolerancia_avaliacao
            });
        }
    }
}

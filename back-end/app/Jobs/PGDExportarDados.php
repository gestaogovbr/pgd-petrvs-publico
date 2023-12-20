<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\PGD\OrgaoCentralService;

class PGDExportarDados implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $dados;

    public function __construct($dados)
    {
        $this->dados = $dados;
    }

    public function handle(OrgaoCentralService $orgaoCentralService)
    {
        $orgaoCentralService->exportarDados($this->dados);
    }
}

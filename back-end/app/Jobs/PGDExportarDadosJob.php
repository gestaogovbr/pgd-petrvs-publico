<?php

namespace App\Jobs;

use App\Jobs\Contratos\ContratoJobSchedule;
use App\Services\API_PGD\OrgaoCentralService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class PGDExportarDadosJob implements ShouldQueue, ShouldBeUnique, ContratoJobSchedule
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $dados;

    public function __construct($dados)
    {
        $this->dados = $dados;
    }

    public static function getDescricao(): string
    {
       return "Envia Dados para API do PGD";
    }


    public function handle(OrgaoCentralService $orgaoCentralService)
    {
        $orgaoCentralService->exportarDados($this->dados);
    }
}

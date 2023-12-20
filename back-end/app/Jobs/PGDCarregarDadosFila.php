<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use App\Services\PGD\OrgaoCentralService;

class PGDCarregarDadosFila implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $dados;

    public function __construct($dados)
    {
        $this->dados = $dados;
    }

    public function handle()
    {

       $planos_trabalhos = [];
       //Query para listar planos de trabalhos
       foreach ($planos_trabalhos as $pt){
                $dados['plano_trabalho_id'] = $pt->numero;
                $dados['tipo'] = 'PLANO_TRABALHO';
                $dados['cod_SIAPE_instituidora'] = 17500 
                $dados['id_plano_trabalho_participante'] = 10;
                PGDExportarDados::dispath($dados);
       }

       $planos_entregas = [];
       //Query para listar planos de entregas
       foreach ($planos_entregas as $pe){
                $dados['plano_entrega_id'] = $pe->numero;
                $dados['tipo'] = 'PLANO_ENTREGA';
                $dados['cod_SIAPE_instituidora'] = 17500 
                $dados['id_plano_trabalho_participante'] = 10;
                PGDExportarDados::dispath($dados);
       }

    }
}

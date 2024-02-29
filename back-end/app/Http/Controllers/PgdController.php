<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\PGDCarregarDadosFila;
use App\Services\PGD\OrgaoCentralService;
use Illuminate\Http\Request;

class PgdController extends Controller
{
    protected $orgaoCentralService;

    public function __construct(OrgaoCentralService $orgaoCentralService)
    {
        $this->orgaoCentralService = $orgaoCentralService;
    }

    public function user()
    {
        $user =  $this->orgaoCentralService->getUser();

        return response()->json(['resultado' => $user]);
    }

    public function exportarDados(Request $request)
    {
        $dados['mock'] = 1;
        $dados['plano_trabalho_id'] = 10;
        $dados['tipo'] = 'PLANO_ENTREGA';
        $dados['cod_SIAPE_instituidora'] = 17500;
        $dados['id_plano_entrega_unidade'] = 10;
        $api_pgd =  $this->orgaoCentralService->exportarDados($dados);
        
        return response()->json($api_pgd);
    }

    public function exportarDadosJob()
    {
        dd("exportarDadosJob 252525");
        $request->validate(['dados'=>'required']);
        try {
            PGDCarregarDadosFila::dispatch();
            return response()->json(['mensagem' => 'Job registrado']);
        } catch (\Exception $e) {
            echo 'Exceção capturada: ',  $e->getMessage(), "\n";
        }

    }
}

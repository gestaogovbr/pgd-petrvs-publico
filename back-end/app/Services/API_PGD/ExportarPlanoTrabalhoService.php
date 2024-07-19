<?php
namespace App\Services\API_PGD;

use Illuminate\Support\Facades\Http;
use App\Services\API_PGD\HttpSenderService;
use App\Models\PlanoTrabalho;
use App\Services\CalendarioService;

class ExportarPlanoTrabalhoService
{
    public function __construct(private readonly CalendarioService $calendarioService, private readonly HttpSenderService $httpSender)
    {
    }

    public function enviar($token, $dados)
    {
        $body = $this->getBody($dados);
        return $this->httpSender->enviarDados($token, 
            "/organizacao/{$dados['cod_SIAPE_instituidora']}/plano_trabalho/{$dados['id_plano_trabalho_participante']}",
            $body
        );
    }

    public function getBody($dados)
    {
        $plano_trabalho = PlanoTrabalho::find($dados['plano_trabalho_id']);
    
        if (!$plano_trabalho) {
            return null;
        }
    
        $contribuicoes = $plano_trabalho->entregas->map(function ($entrega) use ($plano_trabalho) {
            // $entrega = PlanoTrabalhoEntrega
            return [
                "id_contribuicao" => $entrega->id, // id da planos_trabalhos_entregas
                "tipo_contribuicao" => $entrega->planoEntregaEntrega ? ($entrega->planoEntregaEntrega->unidade_id == $plano_trabalho->unidade_id ? 1 : 3) : 2,
                "percentual_contribuicao" => $entrega->forca_trabalho,
                "id_plano_entregas" => $entrega->planoEntregaEntrega->plano_entrega_id,
                "id_entrega" => $entrega->planoEntregaEntrega->id,
            ];
        })->toArray();
    
        $consolidacoes = $plano_trabalho->consolidacoes->map(function ($consolidacao) {
            return $consolidacao->avaliacao ? [
                "id_periodo_avaliativo" => $consolidacao->id,
                "data_inicio_periodo_avaliativo" => $consolidacao->data_inicio,
                "data_fim_periodo_avaliativo" => $consolidacao->data_fim,
                "avaliacao_registros_execucao" => $this->converteAvaliacao($consolidacao->avaliacao),
                "data_avaliacao_registros_execucao" => $consolidacao->avaliacao->data_avaliacao,
            ] : [];
        })->toArray();
    
        return [
            "origem_unidade" => "SIAPE",
            "cod_unidade_autorizadora" => $plano_trabalho->programa->unidade_id,
            "id_plano_trabalho" => $plano_trabalho->id,
            "status" => $plano_trabalho->status,
            "cod_unidade_executora" => $plano_trabalho->unidade_id,
            "cpf_participante" => $plano_trabalho->usuario->cpf,
            "matricula_siape" => $plano_trabalho->usuario->matricula,
            "data_inicio" => $plano_trabalho->data_inicio,
            "data_termino" => $plano_trabalho->data_fim,            
            "carga_horaria_disponivel" => $this->calendarioService->qtdDiasUteis($plano_trabalho->data_inicio, $plano_trabalho->data_fim, $plano_trabalho->unidade_id) * $plano_trabalho->carga_horaria,
            "contribuicoes"=> $contribuicoes,
            "consolidacoes"=> $consolidacoes
        ];
    }


    /* 
        1 = excepcional: plano de trabalho executado muito acima do esperado;
        2 = alto desempenho: plano de trabalho executado acima do esperado;
        3 = adequado: plano de trabalho executado dentro do esperado;
        4 = inadequado: plano de trabalho executado abaixo do esperado ou parcialmente executado;
        5 = não executado: plano de trabalho integralmente não executado.    
    */
    function converteAvaliacao($avaliacao) {
        switch ($avaliacao->nota) {
            case 'Excepcional':
                return 1;
            case 'Alto desempenho':
                return 2;
            case 'Adequado':        
                return 3;       
            case 'Inadequado':          
                return 4;
            case 'Não executado':          
                return 5;
        }
    }
}

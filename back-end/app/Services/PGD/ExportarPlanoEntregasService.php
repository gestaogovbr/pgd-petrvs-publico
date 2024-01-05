<?php
namespace App\Services\PGD;

use Illuminate\Support\Facades\Http;
use App\Models\PlanoEntrega;


class ExportarPlanoEntregasService
{
    protected $httpSender;
    
    public function __construct()
    {
        $this->httpSender = new HttpSenderService();
    }


    public function enviar($token, $dados)
    {
        if(isset($dados['mock']) && $dados['mock']){
            $body = $this->getBodyMock($dados);
        } else{
            $body = $this->getBody($dados);
        }
        
        $dados['url'] = config('pgd.host')."/organizacao/{$dados['cod_SIAPE_instituidora']}/plano_trabalho/{$dados['id_plano_entrega_unidade']}";
        return $this->httpSender->enviarDados('PLANO_ENTREGA', $dados, $token, $body);
    }

    public function getBody($dados)
    {
        $plano_entrega= PlanoEntrega::find($dados['plano_entrega_id']);
        return [
            "cod_SIAPE_instituidora"=> null,
            "id_plano_entrega_unidade"=> $plano_entrega->unidade_id,
            "cancelado"=> $plano_entrega->status,
            "data_inicio_plano_entregas"=> $plano_entrega->data_inicio,
            "data_termino_plano_entregas"=> $plano_entrega->data_fim,
            "avaliacao_plano_entregas"=> $plano_entrega->avaliacao_id,
            "data_avaliacao_plano_entregas"=>$plano_entrega->avaliacao()->data_avaliacao,
            "cod_SIAPE_unidade_plano"=> $plano_entrega->unidade_id,
            "entregas"=> [
              [
                "id_entrega"=> $plano_entrega->planoEntregaEntrega()->entrega_id,
                "nome_entrega"=> $plano_entrega->planoEntregaEntrega()->descricao,
                "meta_entrega"=> $plano_entrega->planoEntregaEntrega()->meta,
                "tipo_meta"=> null,
                "nome_vinculacao_cadeia_valor"=> $plano_entrega->planoEntregaEntrega()->cadeiaValor,
                "nome_vinculacao_planejamento"=> $plano_entrega->planoEntregaEntrega()->planejamento,
                "percentual_progresso_esperado"=> $plano_entrega->planoEntregaEntrega()->progresso_esperado,
                "percentual_progresso_realizado"=> $plano_entrega->planoEntregaEntrega()->progresso_realizado,
                "data_entrega"=> $plano_entrega->planoEntregaEntrega()->entrega()->data_fim,
                "nome_demandante"=> $plano_entrega->criador()->nome,
                "nome_destinatario"=> $plano_entrega->planoEntregaEntrega()->destinatario
              ]
            ]
        ];

    }

    public function getBodyMock($dados){
        return [
            "cod_SIAPE_instituidora"=> $dados['cod_SIAPE_instituidora'],
            "id_plano_entrega_unidade"=> $dados['id_plano_entrega_unidade'],
            "cancelado"=> false,
            "data_inicio_plano_entregas"=> "2023-12-01",
            "data_termino_plano_entregas"=> "2023-12-10",
            "avaliacao_plano_entregas"=> 1,
            "data_avaliacao_plano_entregas"=> "2023-12-10",
            "cod_SIAPE_unidade_plano"=> 1,
            "entregas"=> []
        ];
    }
}


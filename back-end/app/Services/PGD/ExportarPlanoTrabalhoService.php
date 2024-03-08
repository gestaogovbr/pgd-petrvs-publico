<?php
namespace App\Services\PGD;

use Illuminate\Support\Facades\Http;
use App\Models\PlanoTrabalho;
class ExportarPlanoTrabalhoService
{
    protected $httpSender;

    public function __construct()
    {
        $this->httpSender = new HttpSenderService();
    }

    public function enviar($token, $dados)
    {
        $body = $this->getBody($dados);
        $dados['url'] = config('pgd.host')."/organizacao/{$dados['cod_SIAPE_instituidora']}/plano_trabalho/{$dados['id_plano_trabalho_participante']}";
        return $this->httpSender->enviarDados('PLANO_TRABALHO', $dados, $token, $body);
    }

    public function getBody($dados)
    {
        $plano_trabalho = PlanoTrabalho::find($dados['plano_trabalho_id']);

        $contribuicoes = $plano_trabalho->entregas->entrega->map(function ($entregas) {
            return [
                "data_inicio_registro" => $entregas->data_inicio_registro,
                "data_fim_registro" => $entregas->data_fim_registro,
                "avaliacao_plano_trabalho" => 0
            ];
        })->toArray();

        $consolidacoes = $plano_trabalho->consolidacoes->map(function ($consolidacao) {
            return [
                "data_inicio_registro" => $consolidacao->data_inicio_registro,
                "data_fim_registro" => $consolidacao->data_fim_registro,
                "avaliacao_plano_trabalho" => 0
            ];
        })->toArray();

        return [
            "cod_SIAPE_instituidora"=> null,
            "id_plano_trabalho_participante"=> $plano_trabalho->numero,
            "id_plano_entrega_unidade"=> $plano_trabalho->unidade,
            "cancelado"=> $plano_trabalho->status,
            "cod_SIAPE_unidade_exercicio"=> null,
            "cpf_participante"=> $plano_trabalho->documento,
            "data_inicio_plano"=> $plano_trabalho->data_inicio,
            "data_termino_plano"=> $plano_trabalho->data_fim,
            "carga_horaria_total_periodo_plano"=> $plano_trabalho->carga_horaria,
            "contribuicoes"=> $contribuicoes,
            "consolidacoes"=> $consolidacoes
        ];

    }
}

/*
Valores permitidos para a tipo_contribuicao:
1: Contribuição para entrega da própria unidade de execução do participante;
2: Contribuição não vinculada diretamente a entrega, mas necessária ao adequado funcionamento administrativo (por exemplo, Atividades de apoio, assessoramento e desenvolvimento, e Atividades de gestão de equipes e entregas);
3: Contribuição vinculada a entrega de outra unidade de execução, inclusive de outros órgãos e entidades.

*/
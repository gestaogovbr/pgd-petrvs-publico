<?php
namespace App\Services\API_PGD;



class ExportarParticipanteService extends ExportarService
{
    public function __construct(private HttpSenderService $httpSender)
    {
    }

    public function getBody($dados) : array
    {

        $arrayRetorno = [
            "lista_status" => []
        ];
        
        foreach ($dados as $dado) {
            $jsonArray["lista_status"][] = [
                "cod_SIAPE_instituidora" => $dado["cod_SIAPE_instituidora"],
                "cpf_participante" => $dado["cpf_participante"],
                "matricula_siape" => $dado["matricula_siape"],
                "participante_ativo_inativo_pgd" => $dado["participante_ativo_inativo_pgd"],
                "modalidade_execucao" => $dado["modalidade_execucao"],
                "jornada_trabalho_semanal" => $dado["jornada_trabalho_semanal"],
                "data_envio" => $dado["data_envio"]
            ];
        }
       return $arrayRetorno;
    }

    public function getBodyMock($dados): array{

        $dados = [
            [
                "cod_SIAPE_instituidora" => 123456,
                "cpf_participante" => "123.456.789-00",
                "matricula_siape" => "987654",
                "participante_ativo_inativo_pgd" => 1,
                "modalidade_execucao" => 2,
                "jornada_trabalho_semanal" => 40,
                "data_envio" => "2024-07-22"
            ],
        ];
        return [
            "lista_status" =>[ $dados]
        ];
    }

    public function getEndpoint(array $dados): string
    {
        return "/organizacao/{$dados['cod_SIAPE_instituidora']}/participante/{$dados['cpf_participante']}";
    }
}


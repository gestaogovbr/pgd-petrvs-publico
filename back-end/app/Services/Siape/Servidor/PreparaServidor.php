<?php

namespace App\Services\Siape\Servidor;

use App\Services\UtilService;
use Illuminate\Support\Facades\Log;

trait PreparaServidor
{


    /**
     *
     * @param array $servidor
     * @return null|array
     */
    public function getAtivo(array $servidor): ?array
    {
        if(isset($servidor['matriculas']) && isset($servidor['matriculas']['dados'])){
            return $servidor['matriculas']['dados'];
        }
        return null;
    }

    public function getEmail(array $matriculas, array $dadosFuncionais, UtilService $utilService): ?string
    {
        $email =  $utilService->valueOrDefault($dadosFuncionais['emailfuncional'], $matriculas['matriculasiape'] . "@petrvs.gov.br");
        if (!empty($email)) {
            $email = str_contains($email, "@") ? $email : $email . "@prf.gov.br";
            $email = mb_strtolower($email, 'UTF-8');
            return $email;
        }
        return $email;
    }

    public function getEmailChefiaImediata(array $servidor, UtilService $utilService): ?string
    {
        $emailChefiaImediata = null;
        if (isset($servidor['email_chefia_imediata'])) {
            $emailChefiaImediata = $utilService->valueOrDefault($servidor['email_chefia_imediata'], null);
            if (!empty($emailChefiaImediata)) $emailChefiaImediata = mb_strtolower($emailChefiaImediata, 'UTF-8');
        }
        return $emailChefiaImediata;
    }


    public function getNomeDeGuerra(array $ativo, array $servidor, UtilService $utilService): string
    {
        if (!empty($ativo['nomeguerra'])) {
            return $ativo['nomeguerra'];
        }
        return $utilService->getApelido($servidor['nome']);
    }

    public function modificafuncao(array &$ativo): void
    {
        if (!empty($ativo['funcoes'] && is_array($ativo['funcoes']))) {
            foreach ($ativo['funcoes'] as &$at) {
                if (array_key_exists('uorg_funcao', $at)) {
                    $at['uorg_funcao'] = strval(intval($at['uorg_funcao']));
                }
            }
            $ativo['funcoes'] = json_encode(($ativo['funcoes']));
        } else {
            $ativo['funcoes'] = null;
        }
    }

    public function getSituacaoFuncional(array $ativo,  UtilService $utilService): string
    {
        return  $utilService
            ->valueOrDefault(
                $ativo['codsitfuncional'],
                "DESCONHECIDO",
                $option = "situacao_funcional"
            );
    }

    public function getNome(array $servidor, UtilService $utilService): ?string
    {
        $nome = $utilService->valueOrDefault($servidor['nome'], null);
        if (!is_null($nome)) $nome = $utilService->getNomeFormatado($nome);
        return $nome;
    }

    public function getSexo(array &$servidor): void
    {
        if ($servidor['sexo'] == 'M' || $servidor['sexo'] == 'm') {
            $servidor['sexo'] = 'MASCULINO';
        };
        if ($servidor['sexo'] == 'F' || $servidor['sexo'] == 'f') {
            $servidor['sexo'] = 'FEMININO';
        };
        if (empty($servidor['sexo']) || is_null($servidor['sexo'])) {
            $servidor['sexo'] = 'MASCULINO';
        }
    }

    /**
     *
     * @param array $servidor
     * @param UtilService $utilService
     * @param string $tipo
     * @return string|null
     */
    public function getDataNascimento(array $servidor, UtilService $utilService, string $tipo): ?string
    {
        $formatWSO2Date = function ($dataString) use ($utilService) {
            if ($dataString === null) return null;
            $dataNascimento = $utilService->valueOrDefault($dataString, null);
            $dataNascimento = date_create($dataNascimento);
           return date_format($dataNascimento, "Y-m-d H:i:s");
        };

        return match ($tipo) {
            "SIAPE" => $utilService->valueOrDefault($servidor['data_nascimento'], null),
            "WSO2" => $formatWSO2Date($servidor['datanascimento']),
            default => null
        };
    }

    /**
     * Obtém a data de exercício formatada com base no tipo de origem dos dados.
     *
     * @param array $ativo 
     * @param UtilService $utilService 
     * @param string $tipo 
     * @return string|null 
     */
    public function getDataExercicio(array $ativo, UtilService $utilService, string $tipo): ?string
    {
        $formatWSO2Date = function ($dataString) use ($utilService) {
            if ($dataString === null) return null;
            $dataModificacao = $utilService->valueOrDefault($dataString, null);
            return date_format(date_create($dataModificacao), "Y-m-d H:i:s");
        };

        return match ($tipo) {
            "SIAPE" => $utilService->valueOrDefault($ativo['dataexercicionoorgao'], null),
            "WSO2" => $formatWSO2Date($ativo['dataexercicionoorgao']),
            default => null
        };
    }

    public function setFuncoes(array &$ativo): void{
        if (!empty($ativo['funcoes'] && is_array($ativo['funcoes']))) {
            foreach ($ativo['funcoes'] as &$at) {
              if (array_key_exists('uorg_funcao', $at)) {
                $at['uorg_funcao'] = strval(intval($at['uorg_funcao']));
              }
            }
            $ativo['funcoes'] = json_encode(($ativo['funcoes']));
          } else {
            $ativo['funcoes'] = null;
          }
    }


    public function getCPFChefiaImediata(array $servidor, UtilService $utilService): ?string
    {
        $cpfChefiaImediata = null;
        if (isset($servidor['cpf_chefia_imediata'])) {
            $cpfChefiaImediata = $utilService->valueOrDefault($servidor['cpf_chefia_imediata'], null);
        }
        return $cpfChefiaImediata;
    }

    /**
     * Obtém a data de modificação formatada com base no tipo de servidor.
     *
     * @param array $servidor 
     * @param UtilService $utilService
     * @param string $tipo 
     * @return string|null 
     */
    public function getDataModificacao(array $servidor, UtilService $utilService, string $tipo): ?string
    {
        $formatWSO2Date = function ($dataString) use ($utilService) {
            if ($dataString === null) return null;
            $dataModificacao = $utilService->valueOrDefault($dataString, null);
            return date_format(date_create($dataModificacao), "Y-m-d H:i:s");
        };

        return match ($tipo) {
            "SIAPE" => $utilService->valueOrDefault($servidor['data_modificacao'], null),
            "WSO2" => $formatWSO2Date($servidor['data_modificacao']),
            default => null
        };
    }
}

<?php

use App\Models\IntegracaoServidor as entidade;
use App\Repository\IntegracaoServidorRepository;
use App\Services\Siape\DTO\ServidorDTO;
use App\Services\UtilService;
use Ramsey\Uuid\Uuid;

class IntegracaoServidor{


    public function __construct(private IntegracaoServidorRepository $repository, private UtilService $utilService) {
    }
    

    private function getDataModificacao($servidor) : string{
        return $servidor['data_modificacao'];
    }

    private function getNome($servidor) : string{
        return $servidor['nome'];
    }

    private function getEmail($servidor) : string{
        return $servidor['emailfuncional'];
    }

    private function getNomeGuerra($servidor) : string{
        return $servidor['nomeguerra'];
    }

    private function getAtivo($servidor) : array{
        return $servidor['ativo'];
    }

    private function getSituacaoFuncional($ativo) : string{
        return $ativo['situacao_funcional'];
    }

    private function getDataNascimento($servidor) : string{
        return $servidor['data_nascimento'];
    }

    private function getDataExercicio($ativo) : string{
        return $ativo['dataexercicionoorgao'];
    }

    private function getChefiaImediata($servidor) : array{
        return $servidor['chefia_imediata'];
    }

    private function getEmailChefiaImediata($servidor) : string{
        return $servidor['email_chefia_imediata'];
    }

    private function montaEntidadeServidor(array $servidor) : entidade{

        $ativo = $this->getAtivo($servidor);
        $servidor = [
            'id' => Uuid::uuid4(),
            'cpf_ativo' => $this->utilService->valueOrDefault($servidor['cpf_ativo']),
            'data_modificacao' => $this->getDataModificacao($servidor),
            'cpf' => $this->utilService->valueOrDefault( $this->utilService->onlyNumbers($servidor['cpf']), null),
            'nome' => $this->getNome($servidor),
            'emailfuncional' => $this->getEmail($servidor),
            'sexo' => $this->utilService->valueOrDefault($servidor['sexo'], null),
            'municipio' => $this->utilService->valueOrDefault($servidor['municipio'], null),
            'uf' => $this->utilService->valueOrDefault($servidor['uf'], null),
            'data_nascimento' => $this->getDataNascimento($servidor),
            'telefone' => $this->utilService->valueOrDefault($servidor['telefone'], null),
            'vinculo_ativo' => $this->utilService->valueOrDefault($ativo['vinculo_ativo'], null),
            'matriculasiape' => $this->utilService->valueOrDefault($ativo['matriculasiape'], null),
            'codigo_cargo' => $this->utilService->valueOrDefault($ativo['tipo'], null),
            'coduorgexercicio' => $this->utilService->valueOrDefault($ativo['coduorgexercicio'], null, $option = "uorg"),
            'coduorglotacao' => $this->utilService->valueOrDefault($ativo['coduorglotacao'], null, $option = "uorg"),
            'codigo_servo_exercicio' => $this->utilService->valueOrDefault($ativo['codigo_servo_exercicio'], null, $option = "uorg"),
            'nomeguerra' => $this->getNomeGuerra($servidor),
            'codigo_situacao_funcional' => $this->utilService->valueOrDefault($ativo['codsitfuncional'], null),
            'situacao_funcional' => $this->getSituacaoFuncional($ativo),
            'codupag' => $this->utilService->valueOrDefault($ativo['codupag'], null),
            'dataexercicionoorgao' => $this->getDataExercicio($ativo),
            'funcoes' => $ativo['funcoes'],
            'matricula' => $this->utilService->valueOrDefault($ativo['matriculasiape'], null),
            'cpf_chefia_imediata' => $this->getChefiaImediata($servidor)['cpf_chefia_imediata'],
            'email_chefia_imediata' => $this->getEmailChefiaImediata($servidor),
            'deleted_at' => null,
          ];

          return $this->createFromDTO(new ServidorDTO($servidor));
    }


    public function createFromDTO(ServidorDTO $dto): entidade {
        $model = new entidade((array) $dto);
        // $model->save();
        return $model;
    }
}
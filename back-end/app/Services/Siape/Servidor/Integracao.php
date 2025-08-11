<?php

namespace App\Services\Siape\Servidor;

use App\Models\IntegracaoServidor as entidade;
use App\Models\IntegracaoServidor;
use App\Repository\IntegracaoServidorRepository;
use App\Services\LogTrait;
use App\Services\Siape\Contrato\InterfaceIntegracao;
use App\Services\Siape\Imprimir;
use App\Services\Siape\Unidade\Atribuicao;
use App\Services\Tipo;
use App\Services\UtilService;
use Illuminate\Support\Facades\Log;
use Ramsey\Uuid\Uuid;

class Integracao implements InterfaceIntegracao
{

    use PreparaServidor, Imprimir, LogTrait;

    private array $servidores = [];
    private array $cpfsIntegracaoAlterados = [];
    private array $cpfsComEmaisFuncionaisVazios = [];
    private array $servidoresRegistradosNoBD = [];
    private bool $echo = false;
    private array $result = [];
    private array $integracaoConfig = [];

    public function __construct(
        private readonly IntegracaoServidorRepository $repository, private readonly UtilService $utilService
        )
    {
    }

    public function processar(): void
    {
        foreach ($this->getServidores() as $servidor) {
            $entidade = $this->montaEntidadeServidor($servidor);
            if ($entidade) {
                $this->salvaEntidade($entidade);
            }
        }

        if ($this->echo) {
            $this->imprimeNoTerminal("Concluída a fase de reconstrução da tabela integração_servidores.....");
        }

        $this->montaLogs();
    }

    private function montaLogs(): void
    {
        $quantidadeTotal = entidade::count();
        $quantidadeDeEmaisVazios = count($this->cpfsComEmaisFuncionaisVazios);

        if(empty($this->result['servidores'])){
            $this->result['servidores']['Observações'] = [];
        }

        if ($quantidadeDeEmaisVazios) {
            array_push($this->result['servidores']['Observações'],
                'Total de servidores com email funcional vazio no SIAPE: ' .
                    $quantidadeDeEmaisVazios . ' (apenas ATIVOS).');
            array_push($this->result['servidores']['Observações'],
                'Lista de servidores com email funcional vazio no SIAPE: ' .
                    implode(', ', $this->cpfsComEmaisFuncionaisVazios) . '.');
        }

        array_push($this->result['servidores']['Observações'],
            'Total de servidores importados do SIAPE: ' . $quantidadeTotal . ' (apenas ATIVOS).');
    }


    private function salvaEntidade(entidade $entidade): void
    {
        $registroDobanco = $this->repository->getUmPeloCPF($entidade->cpf);

        if (!in_array($entidade->cpf, $this->cpfsIntegracaoAlterados) && $registroDobanco == null) {
            /*$this->logSiape('Salvando Novo Servidor na tabela integracao_servidores: ' , [
                'integracao_servidores'=>$entidade->toJson()
            ], Tipo::INFO);**/

            $registro = $this->repository->save($entidade);
            array_push($this->cpfsIntegracaoAlterados, $entidade->cpf);

            $this->verificaEmailsFuncionaisVazios($entidade);

            if ($registro) $this->salvaNoArrayServidoresRegistradosNoBD($entidade);
            return;
        }

        if ($registroDobanco && !in_array($entidade->cpf, $this->cpfsIntegracaoAlterados)) {
            
            /*$this->logSiape('Atualizando Servidor na tabela integracao_servidores: ' , [
                'integracao_servidores_antigo'=>$registroDobanco->toJson(),
                'integracao_servidores_novo'=>$entidade->toJson()
            ], Tipo::INFO);*/

            $dadosAtualizados = $entidade->only([
                'cpf_ativo', 'data_modificacao', 'nome', 'emailfuncional', 'sexo',
                'municipio', 'uf', 'data_nascimento', 'telefone', 'vinculo_ativo', 
                'codigo_cargo', 'coduorgexercicio', 'coduorglotacao',
                'codigo_servo_exercicio', 'nomeguerra', 'codigo_situacao_funcional', 
                'situacao_funcional', 'codupag', 'dataexercicionoorgao', 'funcoes', 
                'cpf_chefia_imediata', 'email_chefia_imediata'
            ]);
            $registro =  $this->repository->update($entidade->cpf, $dadosAtualizados);
            array_push($this->cpfsIntegracaoAlterados, $entidade->cpf);
            $this->verificaEmailsFuncionaisVazios($entidade);
            if ($registro) $this->salvaNoArrayServidoresRegistradosNoBD($entidade);
            return;
        }
    }


    private function salvaNoArrayServidoresRegistradosNoBD(entidade $entidade): void
    {
        array_push($this->servidoresRegistradosNoBD, $entidade->cpf);
    }

    private function verificaEmailsFuncionaisVazios(entidade $entidade): void
    {
        str_contains($entidade->emailfuncional, '@petrvs.gov.br') ?
            array_push($this->cpfsComEmaisFuncionaisVazios,
                "CPF: " . $entidade->cpf .
                    " (" . $entidade->situacao_funcional . ") - " .
                    $entidade->emailfuncional) : true;
    }

    private function montaEntidadeServidor(array $servidor): ?entidade
    {

        $ativo = $this->getAtivo($servidor);
        $emailFuncional = $this->getEmail($servidor, $this->utilService);

        if (!$ativo || empty($emailFuncional)) {
            return null;
        }
        $this->setFuncoes($ativo);

        $servidor = [
            'id' => Uuid::uuid4(),
            'cpf_ativo' => $this->utilService->valueOrDefault($servidor['cpf_ativo']),
            'data_modificacao' => $this->getDataModificacao($servidor, $this->utilService, $this->integracaoConfig['tipo']),
            'cpf' => $this->utilService->valueOrDefault($this->utilService->onlyNumbers($servidor['cpf']), null),
            'nome' => $this->getNome($servidor, $this->utilService),
            'emailfuncional' => $emailFuncional,
            'sexo' => $this->utilService->valueOrDefault($servidor['sexo'], null),
            'municipio' => $this->utilService->valueOrDefault($servidor['municipio'], null),
            'uf' => $this->utilService->valueOrDefault($servidor['uf'], null),
            'data_nascimento' => $this->getDataNascimento($servidor, $this->utilService, $this->integracaoConfig['tipo']),
            'telefone' => $this->utilService->valueOrDefault($servidor['telefone'], null),
            'vinculo_ativo' => $this->utilService->valueOrDefault($ativo['vinculo_ativo'], null),
            'matriculasiape' => $this->utilService->valueOrDefault($ativo['matriculasiape'], null),
            'codigo_cargo' => $this->utilService->valueOrDefault($ativo['tipo'], null),
            'coduorgexercicio' => $this->utilService->valueOrDefault($ativo['coduorgexercicio'], null, $option = "uorg"),
            'coduorglotacao' => $this->utilService->valueOrDefault($ativo['coduorglotacao'], null, $option = "uorg"),
            'codigo_servo_exercicio' => $this->utilService->valueOrDefault($ativo['codigo_servo_exercicio'], null, $option = "uorg"),
            'nomeguerra' => $this->getNomeDeGuerra($ativo, $servidor, $this->utilService),
            'codigo_situacao_funcional' => $this->utilService->valueOrDefault($ativo['codsitfuncional'], null),
            'situacao_funcional' => $this->getSituacaoFuncional($ativo, $this->utilService),
            'codupag' => $this->utilService->valueOrDefault($ativo['codupag'], null),
            'dataexercicionoorgao' => $this->getDataExercicio($ativo, $this->utilService, $this->integracaoConfig['tipo']),
            'funcoes' => $ativo['funcoes'],
            'matricula' => $this->utilService->valueOrDefault($ativo['matriculasiape'], null),
            'nome_jornada' => $this->utilService->valueOrDefault($servidor['nome_jornada'], null),
            'cod_jornada' => $this->utilService->valueOrDefault($servidor['cod_jornada'], null),
            'cpf_chefia_imediata' => $this->getCPFChefiaImediata($servidor, $this->utilService),
            'email_chefia_imediata' => $this->getEmailChefiaImediata($servidor, $this->utilService),
            'deleted_at' => null,
        ];

        return $this->createFromDTO(new ServidorDTO($servidor));
    }


    private function createFromDTO(ServidorDTO $dto): entidade
    {
        $model = new entidade((array) $dto);
        return $model;
    }

    public function getServidores(): array
    {
        return $this->servidores;
    }
    public function setServidores(array $servidores): self
    {
        $this->servidores = $servidores;
        return $this;
    }

    public function setResult(array $result): self
    {
        $this->result = $result;
        return $this;
    }

    public function getResult(): array
    {
        return $this->result;
    }

    public function setEcho(bool $echo): self
    {
        $this->echo = $echo;
        return $this;
    }

    public function setIntegracaoConfig($integracaoConfig): self
    {
        $this->integracaoConfig = $integracaoConfig;
        return $this;
    }
}

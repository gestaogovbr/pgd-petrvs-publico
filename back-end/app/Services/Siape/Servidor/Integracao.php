<?php

namespace App\Services\Siape\Servidor;

use App\Facades\SiapeLog;
use App\Models\IntegracaoServidor as entidade;
use App\Repository\IntegracaoServidorRepository;
use App\Services\LogTrait;
use App\Services\Siape\Contrato\InterfaceIntegracao;
use App\Services\Siape\Imprimir;
use App\Services\UtilService;
use Ramsey\Uuid\Uuid;

class Integracao implements InterfaceIntegracao
{

    use PreparaServidor, Imprimir, LogTrait;

    public const SISTEMA_ORIGEM = 'SIAPE';

    private array $servidores = [];
    private array $matriculasIntegracaoAlterados = [];
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
            $entidades = $this->montaEntidadeServidor($servidor);
            if (!empty($entidades)) {
                array_map(fn($entidade) => $this->salvaEntidade($entidade), $entidades);
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
        $registroDobanco = $this->repository->getServidor($entidade->cpf, $entidade->matriculasiape);

        if (!in_array($entidade->matriculasiape, $this->matriculasIntegracaoAlterados) && $registroDobanco == null) {
            $registro = $this->repository->save($entidade);
            array_push($this->matriculasIntegracaoAlterados, $entidade->matriculasiape);

            $this->verificaEmailsFuncionaisVazios($entidade);

            if ($registro) $this->salvaNoArrayServidoresRegistradosNoBD($entidade);
            return;
        }

        if ($registroDobanco && !in_array($entidade->matriculasiape, $this->matriculasIntegracaoAlterados)) {
            
            $dadosAtualizados = $entidade->only([
                'cpf_ativo', 'data_modificacao', 'nome', 'emailfuncional', 'sexo',
                'municipio', 'uf', 'data_nascimento', 'telefone', 'vinculo_ativo', 
                'codigo_cargo', 'coduorgexercicio', 'coduorglotacao',
                'codigo_servo_exercicio', 'nomeguerra', 'codigo_situacao_funcional', 
                'situacao_funcional', 'codupag', 'dataexercicionoorgao', 'funcoes', 
                'cpf_chefia_imediata', 'email_chefia_imediata', 'ident_unica','cod_jornada',
                'nome_jornada','modalidade_pgd','participa_pgd'
            ]);

            $dadosAtualizados['participa_pgd'] = $this->normalizeParticipaPGD($dadosAtualizados['participa_pgd']);

            $registro =  $this->repository->update($entidade->cpf, $entidade->matriculasiape, $dadosAtualizados);
            
            array_push($this->matriculasIntegracaoAlterados, $entidade->cpf);
            
            $this->verificaEmailsFuncionaisVazios($entidade);
            
            if ($registro) $this->salvaNoArrayServidoresRegistradosNoBD($entidade);

            return;
        }
    }


    private function salvaNoArrayServidoresRegistradosNoBD(entidade $entidade): void
    {
        array_push($this->servidoresRegistradosNoBD, $entidade->matriculasiape);
    }

    private function verificaEmailsFuncionaisVazios(entidade $entidade): void
    {
        str_contains($entidade->matriculasiape, '@petrvs.gov.br') ?
            array_push($this->cpfsComEmaisFuncionaisVazios,
                "Matricula   : " . $entidade->matriculasiape .
                    " (" . $entidade->situacao_funcional . ") - " .
                    $entidade->emailfuncional) : true;
    }

    private function montaEntidadeServidor(array $servidor): array
    {
        $entidades = [];
        $pessoal = $servidor['pessoal'];
        foreach($servidor['funcionais'] as $funcional){
            $ativo = $this->getAtivo($funcional);
            $emailFuncional = $this->getEmail($ativo ,$funcional, $this->utilService);

            if (!$ativo || empty($emailFuncional)) {
                continue;
            }
            $this->setFuncoes($ativo);

            if(empty($ativo['matriculasiape'])){
                SiapeLog::info('Matrícula SIAPE vazia', ['cpf' => $pessoal['cpf']]);
                continue;
            }

            if(empty($pessoal['cpf'])){
                SiapeLog::info('CPF SIAPE vazio', $pessoal);
                continue;
            }

            $servidor = [
                'id' => Uuid::uuid4(),
                'cpf_ativo' => $this->utilService->valueOrDefault($pessoal['cpf_ativo']),
                'data_modificacao' => $this->getDataModificacao($pessoal, $this->utilService, self::SISTEMA_ORIGEM),
                'cpf' => $this->utilService->valueOrDefault($this->utilService->onlyNumbers($pessoal['cpf']), null),
                'nome' => $this->getNome($pessoal, $this->utilService),
                'emailfuncional' => $emailFuncional,
                'sexo' => $this->utilService->valueOrDefault($pessoal['sexo'], null),
                'municipio' => $this->utilService->valueOrDefault($pessoal['municipio'], null),
                'uf' => $this->utilService->valueOrDefault($pessoal['uf'], null),
                'data_nascimento' => $this->getDataNascimento($pessoal, $this->utilService, self::SISTEMA_ORIGEM),
                'telefone' => $this->utilService->valueOrDefault($pessoal['telefone'], null),
                'vinculo_ativo' => $this->utilService->valueOrDefault($ativo['vinculo_ativo'], null),
                'matriculasiape' => $this->utilService->valueOrDefault($ativo['matriculasiape'], null),
                'codigo_cargo' => $this->utilService->valueOrDefault($ativo['tipo'], null),
                'coduorgexercicio' => $this->utilService->valueOrDefault($ativo['coduorgexercicio'], null, $option = "uorg"),
                'coduorglotacao' => $this->utilService->valueOrDefault($ativo['coduorglotacao'], null, $option = "uorg"),
                'codigo_servo_exercicio' => $this->utilService->valueOrDefault($ativo['codigo_servo_exercicio'], null, $option = "uorg"),
                'nomeguerra' => $this->getNomeDeGuerra($ativo, $pessoal, $this->utilService),
                'codigo_situacao_funcional' => $this->utilService->valueOrDefault($ativo['codsitfuncional'], null),
                'situacao_funcional' => $this->getSituacaoFuncional($ativo, $this->utilService),
                'codupag' => $this->utilService->valueOrDefault($ativo['codupag'], null),
                'dataexercicionoorgao' => $this->getDataExercicio($ativo, $this->utilService, self::SISTEMA_ORIGEM),
                'funcoes' => $ativo['funcoes'],
                'matricula' => $this->utilService->valueOrDefault($ativo['matriculasiape'], null),
                'cpf_chefia_imediata' => $this->getCPFChefiaImediata($funcional, $this->utilService),
                'email_chefia_imediata' => $this->getEmailChefiaImediata($funcional, $this->utilService),
                'ident_unica' => $this->utilService->valueOrDefault($ativo['ident_unica'], null),
                'modalidade_pgd' => $this->utilService->valueOrDefault($ativo['modalidade_pgd'], null),
                'participa_pgd' => $this->normalizeParticipaPGD($this->utilService->valueOrDefault($ativo['participa_pgd'], null)),
                'cod_jornada' => $this->utilService->valueOrDefault($ativo['cod_jornada'], null),
                'nome_jornada' => $this->utilService->valueOrDefault($ativo['nome_jornada'], null),
                'deleted_at' => null,
            ];
            array_push($entidades, $this->createFromDTO(new ServidorDTO($servidor)));
        }

        return $entidades;


    }

    /**
     * Normaliza o valor de participa_pgd para os valores aceitos no BD
     * Aceita variações como 'SIM', 'S', true, 1 -> 'sim'
     * e 'NAO', 'NÃO', 'N', false, 0, 'nÃ£o' -> 'não'
     */
    private function normalizeParticipaPGD($value): ?string
    {
        if ($value === null) return 'não';

        $v = is_bool($value) ? ($value ? 'sim' : 'não') : (string)$value;

        $v = trim(mb_strtolower($v));

        if ($v === '' || $v === 'null' || $v === 'undefined') return 'não';

        if ($v === 'nÃ£o' || $v === 'nÃo' || $v === 'nao') {
            $v = 'não';
        }

        $vSemAcento = $v;
        if (function_exists('iconv')) {
            $converted = @iconv('UTF-8', 'ASCII//TRANSLIT', $v);
            if ($converted !== false) {
                $vSemAcento = $converted;
            }
        }
        $vSemAcento = preg_replace('/[^a-z0-9]/', '', (string)$vSemAcento);

        if (in_array($v, ['1', 's', 'sim', 'yes', 'true'], true) || in_array($vSemAcento, ['1', 's', 'sim', 'yes', 'true'], true)) {
            return 'sim';
        }
        if (in_array($v, ['0', 'n', 'não', 'nao', 'no', 'false', 'nÃ£o'], true) || in_array($vSemAcento, ['0', 'n', 'nao', 'no', 'false'], true)) {
            return 'não';
        }

        if (strlen($vSemAcento) > 0) {
            $first = $vSemAcento[0];
            if ($first === 's') return 'sim';
            if ($first === 'n') return 'não';
        }

        return 'não';
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
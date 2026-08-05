<?php

declare(strict_types=1);

namespace App\DTOs\Sipec;

final readonly class ServidorSipecDTO
{
    public function __construct(
        public ?string $cpf,
        public ?string $nome,
        public ?string $matriculaSiape,
        public ?string $codOrgao,
        public ?string $codUorgExercicio,
        public ?string $codUorgLotacao,
        public ?string $codSitFuncional,
        public ?string $nomeSitFuncional,
        public ?string $codCargo,
        public ?string $nomeCargo,
        public ?string $codAtivFun,
        public ?string $codUpag,
        public ?string $codJornada,
        public ?string $nomeJornada,
        public ?string $modalidadePGD,
        public ?string $nomeModalidadePGD,
        public ?string $participaPGD,
        public ?string $identUnica,
        public ?string $dataOcorrIngressoOrgao,
        public ?string $dataOcorrExclusao,
        public ?string $dataUltimaTransacao,
        public ?string $emailInstitucional,
        public ?string $cpfChefiaImediata,
    ) {
    }

    /**
     * Cria o DTO a partir de um único vínculo (array flat com campos funcionais).
     * Usado quando o JSON já está no nível do vínculo.
     */
    public static function fromArray(array $data): self
    {
        $emailInstitucional = $data['servidorDisponivel']['emailInstitucional'] ?? null;
        if ($emailInstitucional && str_contains($emailInstitucional, 'naoinformado@')) {
            $emailInstitucional = null;
        }

        $matriculaSiape = isset($data['matriculaSiape']) ? (string) $data['matriculaSiape'] : null;
        $codOrgao = isset($data['codOrgao']) ? (string) $data['codOrgao'] : null;
        if ($matriculaSiape && $codOrgao && str_starts_with($matriculaSiape, $codOrgao)) {
            $matriculaSiape = substr($matriculaSiape, strlen($codOrgao));
        }

        $cpfChefiaImediata = isset($data['rh']['cpfChefiaImediata'])
            ? (string) $data['rh']['cpfChefiaImediata']
            : null;

        return new self(
            cpf: $data['cpf'] ?? null,
            nome: $data['nome'] ?? null,
            matriculaSiape: $matriculaSiape,
            codOrgao: $codOrgao,
            codUorgExercicio: isset($data['codUorgExercicio']) ? (string) $data['codUorgExercicio'] : null,
            codUorgLotacao: isset($data['codUorgLotacao']) ? (string) $data['codUorgLotacao'] : null,
            codSitFuncional: $data['codSitFuncional'] ?? null,
            nomeSitFuncional: $data['situacaoServidor']['nomeSitFuncional'] ?? null,
            codCargo: isset($data['codCargo']) ? (string) $data['codCargo'] : null,
            nomeCargo: $data['cargo']['nomeCargo'] ?? null,
            codAtivFun: isset($data['codAtivFun']) ? (string) $data['codAtivFun'] : null,
            codUpag: $data['codUpag'] ?? null,
            codJornada: isset($data['codJornada']) ? (string) $data['codJornada'] : null,
            nomeJornada: $data['jornadaTrabalho']['nomeJornada'] ?? null,
            modalidadePGD: isset($data['modalidadePGD']) ? (string) $data['modalidadePGD'] : null,
            nomeModalidadePGD: $data['nomeModalidadePGD'] ?? null,
            participaPGD: $data['participaPGD'] ?? null,
            identUnica: isset($data['identUnica']) ? (string) $data['identUnica'] : null,
            dataOcorrIngressoOrgao: $data['dataOcorrIngressoOrgao'] ?? null,
            dataOcorrExclusao: $data['dataOcorrExclusao'] ?? null,
            dataUltimaTransacao: $data['dataUltimaTransacao'] ?? null,
            emailInstitucional: $emailInstitucional,
            cpfChefiaImediata: $cpfChefiaImediata,
        );
    }

    /**
     * Parseia o objeto raiz retornado pela API SIPEC (contém cpf, nome, vinculos).
     * Retorna dados pessoais (1x) e array de DTOs funcionais (1 por vínculo).
     *
     * @return array{dadosPessoais: array, vinculos: self[]}
     */
    public static function fromServidor(array $servidor): array
    {
        $dadosPessoais = [
            'cpf' => $servidor['cpf'] ?? null,
            'nome' => $servidor['nome'] ?? null,
        ];

        $vinculos = $servidor['vinculos'] ?? [];

        // Se não possui vinculos, tenta tratar como flat (retrocompatibilidade)
        if (empty($vinculos)) {
            return [
                'dadosPessoais' => $dadosPessoais,
                'vinculos' => [self::fromArray($servidor)],
            ];
        }

        $dtos = [];
        foreach ($vinculos as $vinculo) {
            $vinculo['cpf'] = $vinculo['cpf'] ?? $servidor['cpf'] ?? null;
            $vinculo['nome'] = $vinculo['nome'] ?? $servidor['nome'] ?? null;
            $dtos[] = self::fromArray($vinculo);
        }

        return [
            'dadosPessoais' => $dadosPessoais,
            'vinculos' => $dtos,
        ];
    }

    /**
     * Retorna dados funcionais no formato interno esperado pelo Petrvs.
     */
    public function toDadosFuncionais(): array
    {
        return [
            'matriculaSiape' => $this->matriculaSiape,
            'codOrgao' => $this->codOrgao,
            'codUorgExercicio' => $this->codUorgExercicio ?? '',
            'codUorgLotacao' => $this->codUorgLotacao ?? '',
            'codSitFuncional' => $this->codSitFuncional,
            'nomeSitFuncional' => $this->nomeSitFuncional,
            'codCargo' => $this->codCargo,
            'nomeCargo' => $this->nomeCargo,
            'codAtivFun' => $this->codAtivFun,
            'codUpag' => $this->codUpag,
            'codJornada' => $this->codJornada,
            'nomeJornada' => $this->nomeJornada,
            'modalidadePGD' => $this->modalidadePGD,
            'nomeModalidadePGD' => $this->nomeModalidadePGD,
            'participaPGD' => $this->participaPGD,
            'identUnica' => $this->identUnica,
            'dataOcorrIngressoOrgao' => $this->dataOcorrIngressoOrgao,
            'dataOcorrExclusao' => $this->dataOcorrExclusao,
            'dataUltimaTransacao' => $this->dataUltimaTransacao,
            'cpfChefiaImediata' => $this->cpfChefiaImediata,
        ];
    }

    /**
     * Retorna dados pessoais no formato interno esperado pelo Petrvs.
     */
    public function toDadosPessoais(): array
    {
        return [
            'cpf' => $this->cpf,
            'nome' => $this->nome,
        ];
    }

    /**
     * Retorna todos os campos como array.
     */
    public function toArray(): array
    {
        return [
            'cpf' => $this->cpf,
            'nome' => $this->nome,
            'matriculaSiape' => $this->matriculaSiape,
            'codOrgao' => $this->codOrgao,
            'codUorgExercicio' => $this->codUorgExercicio,
            'codUorgLotacao' => $this->codUorgLotacao,
            'codSitFuncional' => $this->codSitFuncional,
            'nomeSitFuncional' => $this->nomeSitFuncional,
            'codCargo' => $this->codCargo,
            'nomeCargo' => $this->nomeCargo,
            'codAtivFun' => $this->codAtivFun,
            'codUpag' => $this->codUpag,
            'codJornada' => $this->codJornada,
            'nomeJornada' => $this->nomeJornada,
            'modalidadePGD' => $this->modalidadePGD,
            'nomeModalidadePGD' => $this->nomeModalidadePGD,
            'participaPGD' => $this->participaPGD,
            'identUnica' => $this->identUnica,
            'dataOcorrIngressoOrgao' => $this->dataOcorrIngressoOrgao,
            'dataOcorrExclusao' => $this->dataOcorrExclusao,
            'dataUltimaTransacao' => $this->dataUltimaTransacao,
            'emailInstitucional' => $this->emailInstitucional,
            'cpfChefiaImediata' => $this->cpfChefiaImediata,
        ];
    }
}

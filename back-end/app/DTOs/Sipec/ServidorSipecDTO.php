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
        public ?string $codCargo,
        public ?string $codAtivFun,
        public ?string $codUpag,
        public ?string $codJornada,
        public ?string $nomeJornada,
        public ?string $modalidadePGD,
        public ?string $participaPGD,
        public ?string $identUnica,
        public ?string $dataOcorrIngressoOrgao,
        public ?string $dataOcorrExclusao,
        public ?string $dataUltimaTransacao,
    ) {
    }

    /**
     * Cria o DTO a partir do array retornado pela API SIPEC (ServidorDetalhadoDTO).
     */
    public static function fromArray(array $data): self
    {
        return new self(
            cpf: $data['cpf'] ?? null,
            nome: $data['nome'] ?? null,
            matriculaSiape: isset($data['matriculaSiape']) ? (string) $data['matriculaSiape'] : null,
            codOrgao: isset($data['codOrgao']) ? (string) $data['codOrgao'] : null,
            codUorgExercicio: isset($data['codUorgExercicio']) ? (string) $data['codUorgExercicio'] : null,
            codUorgLotacao: isset($data['codUorgLotacao']) ? (string) $data['codUorgLotacao'] : null,
            codSitFuncional: $data['codSitFuncional'] ?? null,
            codCargo: isset($data['codCargo']) ? (string) $data['codCargo'] : null,
            codAtivFun: isset($data['codAtivFun']) ? (string) $data['codAtivFun'] : null,
            codUpag: $data['codUpag'] ?? null,
            codJornada: isset($data['codJornada']) ? (string) $data['codJornada'] : null,
            nomeJornada: $data['jornadaTrabalho']['nome'] ?? null,
            modalidadePGD: isset($data['modalidadePGD']) ? (string) $data['modalidadePGD'] : null,
            participaPGD: $data['participaPGD'] ?? null,
            identUnica: isset($data['identUnica']) ? (string) $data['identUnica'] : null,
            dataOcorrIngressoOrgao: $data['dataOcorrIngressoOrgao'] ?? null,
            dataOcorrExclusao: $data['dataOcorrExclusao'] ?? null,
            dataUltimaTransacao: $data['dataUltimaTransacao'] ?? null,
        );
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
            'codCargo' => $this->codCargo,
            'codAtivFun' => $this->codAtivFun,
            'codUpag' => $this->codUpag,
            'codJornada' => $this->codJornada,
            'nomeJornada' => $this->nomeJornada,
            'modalidadePGD' => $this->modalidadePGD,
            'participaPGD' => $this->participaPGD,
            'identUnica' => $this->identUnica,
            'dataOcorrIngressoOrgao' => $this->dataOcorrIngressoOrgao,
            'dataOcorrExclusao' => $this->dataOcorrExclusao,
            'dataUltimaTransacao' => $this->dataUltimaTransacao,
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
            'codCargo' => $this->codCargo,
            'codAtivFun' => $this->codAtivFun,
            'codUpag' => $this->codUpag,
            'codJornada' => $this->codJornada,
            'nomeJornada' => $this->nomeJornada,
            'modalidadePGD' => $this->modalidadePGD,
            'participaPGD' => $this->participaPGD,
            'identUnica' => $this->identUnica,
            'dataOcorrIngressoOrgao' => $this->dataOcorrIngressoOrgao,
            'dataOcorrExclusao' => $this->dataOcorrExclusao,
            'dataUltimaTransacao' => $this->dataUltimaTransacao,
        ];
    }
}

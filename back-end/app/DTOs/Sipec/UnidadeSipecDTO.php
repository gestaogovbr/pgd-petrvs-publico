<?php

declare(strict_types=1);

namespace App\DTOs\Sipec;

/**
 * Mapeamento de UnidadeDetalhadaDTO — contrato OpenAPI SIGEPE-Integra v0.0.1
 */
final readonly class UnidadeSipecDTO
{
    public function __construct(
        public ?string $codUorg,
        public ?string $codUorgPai,
        public ?string $codOrgao,
        public ?string $siglaUorg,
        public ?string $nomeUorg,
        public ?string $nomeExtendido,
        public ?string $siglaOrgao,
        public ?string $dataUltimaTransacao,
        public ?string $dataCriacaoUorg,
        public ?string $idUnidadePai,
        public ?string $emailUorg,
        public ?string $uf,
    ) {
    }

    /**
     * Cria o DTO a partir do array retornado pela API SIPEC (UnidadeDetalhadaDTO).
     */
    public static function fromArray(array $data): self
    {
        return new self(
            codUorg:             isset($data['codUorg'])    ? (string) $data['codUorg']    : null,
            codUorgPai:          isset($data['codUorgPai']) ? (string) $data['codUorgPai'] : null,
            codOrgao:            isset($data['codOrgao'])   ? (string) $data['codOrgao']   : null,
            siglaUorg:           $data['siglaUorg']         ?? null,
            nomeUorg:            $data['nomeUorg']          ?? null,
            nomeExtendido:       $data['nomeExtendido']     ?? null,
            siglaOrgao:          $data['siglaOrgao']        ?? null,
            dataUltimaTransacao: $data['dataUltimaTransacao'] ?? null,
            dataCriacaoUorg:     $data['dataCriacaoUorg']   ?? null,
            idUnidadePai:        isset($data['idUnidadePai']) ? (string) $data['idUnidadePai'] : null,
            emailUorg:           $data['emailUorg']         ?? null,
            uf:                  $data['endereco']['ufUorg'] ?? null,
        );
    }

    public function toRelatorio(): array
    {
        return [
            'codUorg'             => $this->codUorg,
            'codUorgPai'          => $this->codUorgPai,
            'codOrgao'            => $this->codOrgao,
            'siglaUorg'           => $this->siglaUorg,
            'nomeUorg'            => $this->nomeUorg,
            'nomeExtendido'       => $this->nomeExtendido,
            'siglaOrgao'          => $this->siglaOrgao,
            'dataUltimaTransacao' => $this->dataUltimaTransacao,
            'dataCriacaoUorg'     => $this->dataCriacaoUorg,
            'idUnidadePai'        => $this->idUnidadePai,
            'emailUorg'           => $this->emailUorg,
            'uf'                  => $this->uf,
        ];
    }
}

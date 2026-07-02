<?php

declare(strict_types=1);

namespace App\DTOs\Sipec;

use App\Services\UtilService;

/**
 * Mapeamento de UnidadeDetalhadaDTO (SIGEPE-Integra) → IntegracaoUnidade
 */
final readonly class UnidadeSipecDTO
{
    public function __construct(
        public ?string $idServo,
        public ?string $paiServo,
        public ?string $paiSiape,
        public ?string $codigoSiape,
        public ?string $codUnidade,
        public ?string $codupag,
        public ?string $nomeuorg,
        public ?string $nomeextendido,
        public ?string $siglauorg,
        public ?string $telefone,
        public ?string $email,
        public ?string $tipo,
        public ?string $logradouro,
        public ?string $bairro,
        public ?string $cep,
        public ?string $municipioIbge,
        public ?string $municipioUf,
        public ?string $ativa,
        public ?string $regimental,
        public ?string $dataModificacao,
        public ?string $cnpjupag,
        public ?string $cpfTitularAutoridadeUorg,
        public ?string $cpfSubstitutoAutoridadeUorg,
        public ?string $codOrgao,
        public ?string $siglaOrgao,
        public ?string $dataCriacaoUorg,
    ) {
    }

    public static function fromArray(array $data): self
    {
        $cpfSubstituto = null;
        if (isset($data['rh']['cpfSubstitutoAutoridadeUorg'])) {
            $sub = $data['rh']['cpfSubstitutoAutoridadeUorg'];
            $cpfSubstituto = is_array($sub) ? (string) reset($sub) : (string) $sub;
        }

        return new self(
            idServo:                      isset($data['codUorg']) ? (string) $data['codUorg'] : null,
            paiServo:                     self::nullableString($data['codUorgPai'] ?? null),
            paiSiape:                     self::nullableString($data['codUorgPai'] ?? null),
            codigoSiape:                  isset($data['codUnidadeSiafi']) ? (string) $data['codUnidadeSiafi'] : null,
            codUnidade:                   isset($data['codUorg']) ? (string) $data['codUorg'] : null,
            codupag:                      isset($data['dadoComplementar']['codUorgPagadora']) ? (string) $data['dadoComplementar']['codUorgPagadora'] : null,
            nomeuorg:                     $data['nomeUorg'] ?? null,
            nomeextendido:                $data['nomeExtendido'] ?? null,
            siglauorg:                    $data['siglaUorg'] ?? null,
            telefone:                     $data['contato']['numTelefoneUorg'] ?? null,
            email:                        $data['contato']['emailUorg'] ?? null,
            tipo:                         $data['tipoUorg'] ?? null,
            logradouro:                   $data['endereco']['logradouroUorg'] ?? null,
            bairro:                       $data['endereco']['bairroUorg'] ?? null,
            cep:                          $data['endereco']['cepUorg'] ?? null,
            municipioIbge:                isset($data['endereco']['codMunicipio']) ? (string) $data['endereco']['codMunicipio'] : null,
            municipioUf:                  $data['endereco']['ufUorg'] ?? null,
            ativa:                        $data['situacaoUorg'] ?? null,
            regimental:                   isset($data['dadoComplementar']['indicadorUorgRegimenta']) ? (string) $data['dadoComplementar']['indicadorUorgRegimenta'] : null,
            dataModificacao:              $data['dataUltimaTransacao'] ?? null,
            cnpjupag:                     $data['cnpjUpag'] ?? null,
            cpfTitularAutoridadeUorg:     $data['rh']['cpfTitularAutoridadeUorg'] ?? null,
            cpfSubstitutoAutoridadeUorg:  $cpfSubstituto,
            codOrgao:                     isset($data['codOrgao']) ? (string) $data['codOrgao'] : null,
            siglaOrgao:                   $data['siglaOrgao'] ?? null,
            dataCriacaoUorg:              $data['dataCriacaoUorg'] ?? null,
        );
    }

    /**
     * Retorna array compatível com IntegracaoUnidade::$fillable
     */
    public function toIntegracaoUnidade(): array
    {
        return [
            'id_servo'                      => $this->idServo,
            'pai_servo'                     => $this->paiServo,
            'pai_siape'                     => $this->paiSiape,
            'codigo_siape'                  => $this->codigoSiape,
            'cod_unidade'                   => $this->codUnidade,
            'codupag'                       => $this->codupag,
            'nomeuorg'                      => $this->normalizarNome(),
            'siglauorg'                     => $this->siglauorg,
            'telefone'                      => $this->normalizarTelefone(),
            'email'                         => $this->normalizarEmail(),
            'tipo'                          => $this->tipo,
            'logradouro'                    => $this->logradouro,
            'bairro'                        => $this->bairro,
            'cep'                           => $this->cep,
            'municipio_ibge'                => $this->municipioIbge,
            'municipio_uf'                  => $this->municipioUf,
            'ativa'                         => $this->isAtiva() ? 'true' : 'false',
            'regimental'                    => $this->regimental,
            'data_modificacao'              => $this->dataModificacao,
            'cnpjupag'                      => $this->cnpjupag,
            'cpf_titular_autoridade_uorg'   => $this->cpfTitularAutoridadeUorg,
            'cpf_substituto_autoridade_uorg' => $this->cpfSubstitutoAutoridadeUorg,
        ];
    }

    public function toRelatorio(): array
    {
        return [
            'codUorg'             => $this->idServo,
            'codUorgPai'          => $this->paiServo,
            'codOrgao'            => $this->codOrgao,
            'siglaUorg'           => $this->siglauorg,
            'nomeUorg'            => $this->nomeuorg,
            'nomeExtendido'       => $this->nomeextendido,
            'siglaOrgao'          => $this->siglaOrgao,
            'dataUltimaTransacao' => $this->dataModificacao,
            'dataCriacaoUorg'     => $this->dataCriacaoUorg,
            'idUnidadePai'        => $this->paiServo,
            'emailUorg'           => $this->email,
            'uf'                  => $this->municipioUf,
            'cpfTitularAutoridadeUorg'      => $this->cpfTitularAutoridadeUorg,
            'cpfSubstitutoAutoridadeUorg'   => $this->cpfSubstitutoAutoridadeUorg,
        ];
    }

    private static function nullableString(mixed $value): ?string
    {
        return ($value === '' || $value === null) ? null : (string) $value;
    }

    private function normalizarNome(): ?string
    {
        if (empty($this->nomeuorg)) {
            return null;
        }

        return UtilService::getNomeFormatado($this->nomeuorg);
    }

    private function isAtiva(): bool
    {
        if (empty($this->ativa)) {
            return false;
        }

        $valor = mb_strtoupper(trim($this->ativa), 'UTF-8');

        return in_array($valor, ['ATV', 'ATIVA', 'TRUE', '1'], true);
    }

    private function normalizarEmail(): ?string
    {
        if (empty($this->email)) {
            return null;
        }

        // TODO: tratar múltiplos emails (vêm separados por vírgula da API SIPEC)
        $primeiro = explode(',', $this->email)[0];
        $primeiro = trim(mb_strtolower($primeiro, 'UTF-8'));

        return mb_substr($primeiro, 0, 100) ?: null;
    }

    private function normalizarTelefone(): ?string
    {
        if (empty($this->telefone)) {
            return null;
        }

        // TODO: tratar múltiplos telefones (vêm separados por vírgula da API SIPEC)
        $primeiro = explode(',', $this->telefone)[0];
        $primeiro = trim(str_replace(['#', ' '], '', $primeiro));

        // Remove código do país (55) do início
        if (str_starts_with($primeiro, '55') && strlen($primeiro) > 10) {
            $primeiro = substr($primeiro, 2);
        }

        return mb_substr($primeiro, 0, 50) ?: null;
    }
}

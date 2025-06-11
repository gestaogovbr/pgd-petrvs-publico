<?php
namespace App\Services\Siape\Consulta\Resources;

use App\Exceptions\Siape\SiapeRequestException;

class UnidadeResource extends SiapeResource
{
    public function __construct(string $xml) {
        return parent::__construct('//ns1:dadosUorgResponse/out', $xml);
    }

    public function toArray() {
        
        if (!$this->data) {
            throw new SiapeRequestException('Não foram encontrados dados de Unidades.');
        }

        $item = $this->data[0];

        return [
            'codUorg'     => (string) intval($item->codUorg),
            'cpfTitularAutoridadeUorg'    => (string) $item->cpfTitularAutoridadeUorg,
            'cpfSubstitutoAutoridadeUorg'    => (string) $item->cpfSubstitutoAutoridadeUorg,
            'nomeUorg' => (string) $item->nomeUorg,
            'siglaOrgao' => (string) $item->siglaOrgao
        ];
    }
}
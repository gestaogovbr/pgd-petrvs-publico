<?php
namespace App\Services\Siape\Consulta\Resources;

use App\Exceptions\Siape\SiapeRequestException;

class DadosPessoaisResource extends SiapeResource
{
    public function __construct(string $xml) {
        return parent::__construct('//soap:Body/ns1:consultaDadosPessoaisResponse/out', $xml);
    }

    public function toArray() {
        
        if (!$this->data) {
            throw new SiapeRequestException('Não foram encontrados dados pessoais para o CPF informado.');
        }

        $item = $this->data[0];

        return [
            'nome'     => (string) $item->nome,
            'dataNascimento'    => (string) $item->dataNascimento,
        ];
    }
}
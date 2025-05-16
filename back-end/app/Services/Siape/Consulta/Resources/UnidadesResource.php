<?php
namespace App\Services\Siape\Consulta\Resources;

use App\Exceptions\Siape\SiapeRequestException;

class UnidadesResource extends SiapeResource
{
    public function __construct(string $xml) {
        return parent::__construct('//ns2:Uorg', $xml);
    }

    public function toArray() {
        
        if (!$this->data) {
            throw new SiapeRequestException('Não foram encontrados dados de Unidades.');
        }

        $items = [];

        foreach($this->data as $item) {
            $items[(string) $item->codigo] = [
                'nome' => (string) $item->nome
            ];
        }

        return $items;
    }
}
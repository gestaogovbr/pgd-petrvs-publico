<?php
namespace App\Services\Siape\Consulta\Resources;

use App\Exceptions\Siape\SiapeRequestException;

class DadosFuncionaisResource extends SiapeResource
{
    public function __construct(string $xml) {
        return parent::__construct('//tipo:DadosFuncionais', $xml);
    }

    public function toArray() {
        if (!$this->data) {
            throw new SiapeRequestException('Não foram encontrados dados funcionais para o CPF informado.');
        }

        return array_map(function($item) {
            return [
                'emailServidor'     => (string) $item->emailServidor,
                'matriculaSiape'    => (string) $item->matriculaSiape,
                'codUorgExercicio' => $item->codUorgExercicio
                    ? (string) intval($item->codUorgExercicio)
                    : null,
            ];
        }, $this->data);
    }
}
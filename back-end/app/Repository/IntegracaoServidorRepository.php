<?php
namespace App\Repository;

use App\Models\IntegracaoServidor;

class IntegracaoServidorRepository{

    public function __construct(private IntegracaoServidor $integracaoServidor){
    }

    public function getUmPeloCPF(string $cpf){
        return $this->integracaoServidor->where('cpf', $cpf)
        ->orderBy('created_at', 'desc')
        ->first();
    }

    /**
     *
     * @param IntegracaoServidor $entidade
     * @return bool
     */
    public function save(IntegracaoServidor $entidade): bool{
        return $entidade->save();
    }

    public function update(string $cpf, array $data)
    {
        return (bool) $this->integracaoServidor->where('cpf', $cpf)->update($data);
    }
   
}
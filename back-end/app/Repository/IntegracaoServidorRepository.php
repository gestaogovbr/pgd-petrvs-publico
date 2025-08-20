<?php
namespace App\Repository;

use App\Models\IntegracaoServidor;

class IntegracaoServidorRepository{

    public function __construct(private IntegracaoServidor $integracaoServidor){
    }

    //FIXME modificar para buscar pelo cpf e matricula
    public function getServidor(string $cpf, string $matricula){
        return $this->integracaoServidor->where('cpf', $cpf)
        ->where('matricula', $matricula)
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
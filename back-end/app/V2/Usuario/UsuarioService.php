<?php

namespace App\V2\Usuario;

use App\Repository\UsuarioRepository;

class UsuarioService
{
    protected UsuarioRepository $usuarioRepository;

    public function __construct(UsuarioRepository $usuarioRepository)
    {
        $this->usuarioRepository = $usuarioRepository;
    }

    public function buscarPorNomeOuMatricula(string $nomeMatricula)
    {
        return $this->usuarioRepository->findByNomeMatricula($nomeMatricula);
    }

    public function buscarPorId(string $usuarioId)
    {
        return $this->usuarioRepository->findById($usuarioId);
    }

    public function buscarUnidadesVinculadas(string $cpf)
    {
        return $this->usuarioRepository->getUnidadesVinculadas($cpf);
    }
}

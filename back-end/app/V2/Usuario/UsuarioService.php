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

    public function buscarPorNomeOuMatricula(string $nomeMatricula, ?string $unidadeId = null)
    {
        return $this->usuarioRepository->findAllByNomeMatricula($nomeMatricula, $unidadeId);
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

<?php

namespace App\V2\Usuario;

use App\Repository\Usuario\Contracts\UsuarioReadRepositoryContract;

class UsuarioService
{
    protected UsuarioReadRepositoryContract $usuarioReadRepository;

    public function __construct(UsuarioReadRepositoryContract $usuarioReadRepository)
    {
        $this->usuarioReadRepository = $usuarioReadRepository;
    }

    public function buscarPorNome(string $nome)
    {
        return $this->usuarioReadRepository->search(['query' => $nome, 'fields' => ['nome']]);
    }

    public function buscarPorNomeOuMatricula(string $nomeMatricula)
    {
        return $this->usuarioReadRepository->findByNomeMatricula($nomeMatricula);
    }
}

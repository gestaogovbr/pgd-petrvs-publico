<?php

namespace App\V2\Usuario;

use App\Repository\UsuarioRepository;
use Illuminate\Database\Eloquent\Collection;

class UsuarioService
{
    public function __construct(
        protected UsuarioRepository $usuarioRepository,
    ) {}

    public function buscarPorNomeOuMatricula(string $nomeMatricula): Collection
    {
        return $this->usuarioRepository->findAllByNomeMatricula($nomeMatricula);
    }

    public function buscarAgentesPublicosNoEscopoCadastrante(string $nomeMatricula, string $cadastranteId): Collection
    {
        return $this->usuarioRepository->findAgentesPublicosNoEscopoCadastrante($nomeMatricula, $cadastranteId);
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

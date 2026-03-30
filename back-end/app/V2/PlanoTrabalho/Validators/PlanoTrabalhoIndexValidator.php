<?php

declare(strict_types=1);

namespace App\V2\PlanoTrabalho\Validators;

use App\Enums\PerfilEnum;
use App\Exceptions\ServerException;
use App\Exceptions\ValidateException;
use App\Repository\UnidadeIntegranteRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\PlanoTrabalho\DTOs\PlanoTrabalhoIndexDTO;

class PlanoTrabalhoIndexValidator
{
    public function __construct(
        private readonly UsuarioRepository $usuarioRepository,
        private readonly UnidadeIntegranteRepository $integranteRepository,
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    public function validar(PlanoTrabalhoIndexDTO $filtro): PlanoTrabalhoIndexDTO
    {
        if ($filtro->usuarioLogadoId === null) {
            return $filtro;
        }

        $usuario = $this->usuarioRepository->findById($filtro->usuarioLogadoId);

        if ($usuario->perfil->nivel == PerfilEnum::PARTICIPANTE->value) {
            return $this->validarPerfilParticipante($filtro);
        }

        if ($usuario->perfil->nivel !== PerfilEnum::PARTICIPANTE->value) {
            return $this->validarPerfilUnidade($filtro);
        }

        return $filtro;
    }

    private function validarPerfilParticipante(PlanoTrabalhoIndexDTO $filtro): PlanoTrabalhoIndexDTO
    {
        if ($filtro->usuarioId !== null && $filtro->usuarioId !== $filtro->usuarioLogadoId) {
            throw new ValidateException("Usuário de perfil participante só pode consultar seus próprios planos de trabalho.");
        }

        return $filtro;
    }

    private function validarPerfilUnidade(PlanoTrabalhoIndexDTO $filtro): PlanoTrabalhoIndexDTO
    {
        $unidadesDiretas = $this->integranteRepository
            ->findByUsuario($filtro->usuarioLogadoId)
            ->pluck('unidade_id')
            ->toArray();

        $subordinadasIds = $this->unidadeRepository
            ->getSubordinadasRecursivas($unidadesDiretas)
            ->pluck('id')
            ->toArray();

        $unidadesPermitidas = array_values(array_unique(array_merge($unidadesDiretas, $subordinadasIds)));

        if ($filtro->unidadesId === null) {
            return $filtro->withUnidadesId($unidadesPermitidas);
        }

        $naoPermitidas = array_diff($filtro->unidadesId, $unidadesPermitidas);

        if (!empty($naoPermitidas)) {
            throw new ValidateException("Usuário de perfil unidade só pode consultar planos de unidades onde possui atribuição.");
        }

        return $filtro;
    }
}

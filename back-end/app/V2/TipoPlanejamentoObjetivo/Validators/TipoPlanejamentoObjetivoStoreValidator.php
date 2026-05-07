<?php

declare(strict_types=1);

namespace App\V2\TipoPlanejamentoObjetivo\Validators;

use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Exceptions\NotFoundException;
use App\Models\TipoPlanejamentoObjetivo;
use App\Repository\TipoPlanejamentoObjetivoRepository;
use App\Repository\UsuarioRepository;

class TipoPlanejamentoObjetivoStoreValidator
{
    public function __construct(
        private readonly TipoPlanejamentoObjetivoRepository $repository,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    public function validarExistencia(string $id): TipoPlanejamentoObjetivo
    {
        $tipoObjetivo = $this->repository->findById($id);

        if ($tipoObjetivo === null) {
            throw new NotFoundException('Tipo de objetivo não encontrado.');
        }

        return $tipoObjetivo;
    }

    public function validar(string $usuarioLogadoId): void
    {
        $usuario = $this->usuarioRepository->findById($usuarioLogadoId);

        if ($usuario->perfil->nivel <= PerfilEnum::ADMINISTRADOR_MASTER->value) {
            return;
        }

        throw new ForbiddenException('Apenas administradores master podem gerenciar tipos de objetivo.');
    }
}

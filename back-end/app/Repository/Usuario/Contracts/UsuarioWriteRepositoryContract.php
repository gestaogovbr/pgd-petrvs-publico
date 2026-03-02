<?php

declare(strict_types=1);

namespace App\Repository\Usuario\Contracts;

use App\Models\Usuario;

/**
 * @see \App\Repository\Usuario\Eloquent\EloquentUsuarioWriteRepository
 */
interface UsuarioWriteRepositoryContract
{
    public function create(array $attributes): Usuario;

    public function newUsuario(array $attributes = []): Usuario;

    public function update(string $id, array $attributes): ?Usuario;

    public function delete(string $id): bool;

    public function updateFotoPerfil(string $usuarioId, string $tipo, string $url, string $downloadedUrl): bool;

    public function removerVinculos(string $usuarioId): void;
}

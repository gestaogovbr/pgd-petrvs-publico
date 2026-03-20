<?php

declare(strict_types=1);

namespace App\Repository\Usuario\Contracts;

use App\Models\Usuario;

interface UsuarioWriteRepositoryContract
{
    public function create(array $attributes): Usuario;
    public function newUsuario(array $attributes = []): Usuario;
    public function update(string|int $id, array $attributes): ?Usuario;
    public function delete(string|int $id): bool;
    public function updateFotoPerfil(string $usuarioId, string $tipo, string $url, string $downloadedUrl): bool;
    public function removerVinculos(string $usuarioId): void;
    public function restore(string|int $id): bool;
}

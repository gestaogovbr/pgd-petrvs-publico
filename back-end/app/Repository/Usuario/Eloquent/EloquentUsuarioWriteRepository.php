<?php

declare(strict_types=1);

namespace App\Repository\Usuario\Eloquent;

use App\Models\Usuario;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Usuario\Contracts\UsuarioWriteRepositoryContract;
use Illuminate\Support\Facades\Storage;
use Throwable;

/**
 * @extends AbstractEloquentWriteRepository<Usuario>
 */
class EloquentUsuarioWriteRepository extends AbstractEloquentWriteRepository implements UsuarioWriteRepositoryContract
{
    public function __construct(Usuario $model)
    {
        $this->model = $model;
    }

    public function create(array $attributes): Usuario
    {
        /** @var Usuario $model */
        $model = parent::create($attributes);
        return $model;
    }

    public function newUsuario(array $attributes = []): Usuario
    {
        return new Usuario($attributes);
    }

    public function update(string|int $id, array $attributes): ?Usuario
    {
        /** @var Usuario|null $model */
        $model = parent::update($id, $attributes);
        return $model;
    }

    public function delete(string|int $id): bool
    {
        return parent::delete($id);
    }

    public function updateFotoPerfil(string $usuarioId, string $tipo, string $url, string $downloadedUrl): bool
    {
        $usuario = $this->model->find($usuarioId);
        if (!$usuario) {
            return false;
        }

        $usuario->foto_perfil = $downloadedUrl;
        
        switch ($tipo) {
            case "GOOGLE":
                $usuario->foto_google = $url;
                break;
            case "AZURE":
                $usuario->foto_microsoft = $url;
                break;
            case "FIREBASE":
                $usuario->foto_firebase = $url;
                break;
        }
        
        return $usuario->save();
    }

    public function removerVinculos(string $usuarioId): void
    {
        $usuario = $this->model->find($usuarioId);
        if ($usuario) {
            foreach ($usuario->unidadesIntegrantes as $vinculo) {
                // Assuming deleteCascade is a method on the model or relation
                // If not, we might need to implement the logic here.
                // Looking at UsuarioService: $vinculo->deleteCascade();
                // If UnidadeIntegrante has deleteCascade, we call it.
                // Otherwise we delete.
                if (method_exists($vinculo, 'deleteCascade')) {
                    $vinculo->deleteCascade();
                } else {
                    $vinculo->delete();
                }
            }
            // fresh() is called in service, but here we just return void.
        }
    }


}

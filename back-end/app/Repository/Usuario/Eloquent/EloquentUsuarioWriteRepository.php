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

    public function updateFotoPerfil(string $usuarioId, string $tipo, string $url): bool
    {
        $usuario = $this->model->find($usuarioId);
        if (!$usuario) {
            return false;
        }

        $mudou = false;
        switch ($tipo) {
            case "GOOGLE":
                $mudou = $usuario->foto_google != $url;
                break;
            case "AZURE":
                $mudou = $usuario->foto_microsoft != $url;
                break;
            case "FIREBASE":
                $mudou = $usuario->foto_firebase != $url;
                break;
        }

        if (!empty($url) && $mudou) {
            $downloaded = $this->downloadImgProfile($url, "usuarios/" . $usuario->id);
            if (!empty($downloaded)) {
                $usuario->foto_perfil = $downloaded;
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
        }
        return false;
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

    private function downloadImgProfile($url, $path)
    {
        if (!Storage::exists($path)) {
            Storage::makeDirectory($path);
        }
        try {
            $contents = file_get_contents($url);
        } catch (Throwable $e) {
            return "";
        }
        if (!empty($contents)) {
            $name = $path . "/profile_" . md5($contents) . ".jpg";
            if (!Storage::exists($name))
                Storage::put($name, $contents);
            return $name;
        } else {
            return "";
        }
    }
}

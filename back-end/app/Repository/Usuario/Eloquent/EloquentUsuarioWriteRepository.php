<?php

declare(strict_types=1);

namespace App\Repository\Usuario\Eloquent;

use App\Enums\UsuarioSituacaoSiape;
use App\Models\Usuario;
use App\Repository\Eloquent\AbstractEloquentWriteRepository;
use App\Repository\Eloquent\CodUnidadeAutorizadoraTrait;
use App\Repository\Eloquent\EnvioTrait;
use App\Repository\Usuario\Contracts\UsuarioWriteRepositoryContract;

/**
 * @extends AbstractEloquentWriteRepository<Usuario>
 */
class EloquentUsuarioWriteRepository extends AbstractEloquentWriteRepository implements UsuarioWriteRepositoryContract
{
    use CodUnidadeAutorizadoraTrait;
    use EnvioTrait;

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

    public function restore(string|int $id): bool
    {
        /** @var Usuario|null $usuario */
        $usuario = Usuario::withTrashed()->find($id);

        return $usuario !== null && (bool) $usuario->restore();
    }

    public function delete(string|int $id): bool
    {
        return parent::delete($id);
    }

    public function updateFotoPerfil(string $usuarioId, string $tipo, string $url, string $downloadedUrl): bool
    {
        /** @var Usuario|null $usuario */
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

    public function limparEmail(string $usuarioId): bool
    {
        return Usuario::withoutGlobalScopes()
            ->whereKey($usuarioId)
            ->update(['email' => null]) > 0;
    }

    public function updateConfig(string $usuarioId, string $unidadeId): bool
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->model->find($usuarioId);
        if (!$usuario) {
            return false;
        }

        $config = $usuario->config ?? [];
        $config['unidade_id'] = $unidadeId;

        Usuario::withoutEvents(function () use ($usuario, $config): void {
            $usuario->config = $config;
            $usuario->save();
        });

        return true;
    }

    public function removerVinculos(string $usuarioId): void
    {
        /** @var Usuario|null $usuario */
        $usuario = $this->model->find($usuarioId);
        if ($usuario) {
            foreach ($usuario->unidadesIntegrantes as $vinculo) {
                if (method_exists($vinculo, 'deleteCascade')) {
                    $vinculo->deleteCascade();
                } else {
                    $vinculo->delete();
                }
            }
        }
    }

    public function reativarPorCpfEMatriculas(string $cpf, array $matriculas, ?string $perfilConsultaId, ?string $perfilParticipanteId): int
    {
        if ($matriculas === []) {
            return 0;
        }

        /** @var \Illuminate\Database\Eloquent\Collection<int, Usuario> $usuarios */
        $usuarios = $this->model->newQuery()
            ->where('cpf', $cpf)
            ->whereIn('matricula', $matriculas)
            ->get();

        $atualizados = 0;
        foreach ($usuarios as $usuario) {
            $attributes = [
                'situacao_siape' => UsuarioSituacaoSiape::ATIVO->value,
                'data_ativacao_temporaria' => null,
                'justicativa_ativacao_temporaria' => null,
            ];

            if (
                $perfilConsultaId !== null
                && $perfilParticipanteId !== null
                && $usuario->perfil_id === $perfilConsultaId
                && in_array($usuario->situacao_siape, [UsuarioSituacaoSiape::INATIVO->value, UsuarioSituacaoSiape::ATIVO_TEMPORARIO->value], true)
            ) {
                $attributes['perfil_id'] = $perfilParticipanteId;
            }

            $atualizados += $this->model->newQuery()->whereKey($usuario->id)->update($attributes);
        }

        return $atualizados;
    }
}

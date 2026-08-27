<?php

declare(strict_types=1);

namespace App\V2\Usuario\Validators;

use App\Enums\PerfilEnum;
use App\Exceptions\ValidateException;
use App\Models\Usuario;
use App\Repository\PerfilRepository;
use App\Repository\UnidadeRepository;
use App\Repository\UsuarioRepository;
use App\V2\Usuario\DTOs\UsuarioStoreDTO;

class UsuarioStoreValidator
{
    public function __construct(
        private readonly PerfilRepository $perfilRepository,
        private readonly UnidadeRepository $unidadeRepository,
        private readonly UsuarioRepository $usuarioRepository,
    ) {}

    /**
     * Valida regras de negócio para criação de usuário externo.
     * Retorna o usuário soft-deleted se encontrado para restauração, ou null para criação nova.
     */
    public function validar(UsuarioStoreDTO $dto): ?Usuario
    {
        $this->validarPerfil($dto->perfilId);
        $this->validarUnidades($dto->atribuicoes);

        return $this->validarDuplicidade($dto->cpf, $dto->email);
    }

    private function validarPerfil(string $perfilId): void
    {
        $perfil = $this->perfilRepository->find($perfilId);

        if ($perfil === null) {
            throw new ValidateException('Perfil não encontrado.');
        }

        if ($perfil->nivel < PerfilEnum::COLABORADOR->value) {
            throw new ValidateException('Usuário externo não pode ter este nível de acesso.');
        }
    }

    private function validarUnidades(array $atribuicoes): void
    {
        foreach ($atribuicoes as $item) {
            $unidade = $this->unidadeRepository->findById($item['unidade_id']);

            if ($unidade === null || $unidade->data_inativacao !== null) {
                throw new ValidateException('Unidade não encontrada ou está inativada.');
            }
        }
    }

    /**
     * Verifica duplicidade de CPF/email.
     * Se encontrar um usuário soft-deleted, retorna para restauração.
     * Se encontrar um usuário ativo, lança exceção.
     */
    private function validarDuplicidade(string $cpf, string $email): ?Usuario
    {
        $existente = $this->usuarioRepository->findByCpfOrEmail($cpf, $email, null, true);

        if ($existente === null) {
            return null;
        }

        if ($existente->deleted_at === null) {
            throw new ValidateException('Já existe um usuário com mesmo e-mail ou CPF no sistema.');
        }

        return $existente;
    }
}

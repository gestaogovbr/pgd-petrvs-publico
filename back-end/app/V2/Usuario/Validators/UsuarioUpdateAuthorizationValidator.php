<?php

declare(strict_types=1);

namespace App\V2\Usuario\Validators;

use App\Enums\PerfilEnum;
use App\Exceptions\ForbiddenException;
use App\Models\Usuario;
use App\Repository\PerfilRepository;
use App\Repository\UnidadeRepository;

class UsuarioUpdateAuthorizationValidator
{
    private const CAPACIDADE_EDITAR_USUARIO = 'MOD_USER_EDT';

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
        private readonly PerfilRepository $perfilRepository,
    ) {}

    /**
     * Valida se o editor pode editar o alvo.
     * Auto-edição sempre permitida (o chamador decide quais campos o próprio pode alterar).
     * Para editar outros: exige capacidade MOD_USER_EDT + escopo hierárquico (quando aplicável).
     *
     * @return Usuario O alvo com relações carregadas (lotacoes) para reuso no service.
     */
    public function validarEscopo(Usuario $editor, Usuario $alvo): Usuario
    {
        if ($editor->cpf === $alvo->cpf) {
            return $alvo;
        }

        if (!$editor->hasPermissionTo(self::CAPACIDADE_EDITAR_USUARIO)) {
            throw new ForbiddenException('Seu perfil não permite editar outros usuários.');
        }

        $nivelEditor = $this->getNivel($editor);

        if ($nivelEditor <= PerfilEnum::ADMINISTRADOR_MASTER->value) {
            return $alvo;
        }

        $this->validarEscopoHierarquico($editor, $alvo);

        return $alvo;
    }

    /**
     * Valida se o editor pode alterar o perfil do alvo.
     * Regras:
     * - Não pode alterar o próprio perfil
     * - Não pode mexer em quem tem nível superior ao seu
     * - Não pode atribuir nível superior ao seu
     */
    public function validarAlteracaoPerfil(Usuario $editor, Usuario $alvo, string $perfilId): void
    {
        if ($editor->cpf === $alvo->cpf) {
            throw new ForbiddenException('Não é permitido alterar o próprio perfil.');
        }

        $nivelEditor = $this->getNivel($editor);
        $nivelAlvo = $this->getNivel($alvo);

        if ($nivelAlvo < $nivelEditor) {
            throw new ForbiddenException('Você não pode alterar o perfil deste usuário.');
        }

        $perfilNovo = $this->perfilRepository->find($perfilId);

        if ($perfilNovo === null) {
            return;
        }

        if ($perfilNovo->nivel < $nivelEditor) {
            throw new ForbiddenException('Não é possível atribuir perfil superior ao seu.');
        }
    }

    private function validarEscopoHierarquico(Usuario $editor, Usuario $alvo): void
    {
        $unidadesGerenciadas = $this->unidadeRepository
            ->getUnidadesGerenciadas($editor->id)
            ->pluck('id')
            ->all();

        if ($unidadesGerenciadas === []) {
            throw new ForbiddenException('Você não possui vinculação de chefia em nenhuma unidade.');
        }

        $subordinadasIds = $this->unidadeRepository
            ->getSubordinadasRecursivas($unidadesGerenciadas)
            ->pluck('id')
            ->all();

        $unidadesNoEscopo = array_values(array_unique(array_merge($unidadesGerenciadas, $subordinadasIds)));

        if (!$this->alvoEstaNasUnidades($alvo, $unidadesNoEscopo)) {
            throw new ForbiddenException('O usuário não está no seu escopo de atuação.');
        }
    }

    private function alvoEstaNasUnidades(Usuario $alvo, array $unidadeIds): bool
    {
        $alvo->loadMissing('lotacoes');

        foreach ($alvo->lotacoes as $lotacao) {
            if (in_array($lotacao->unidade_id, $unidadeIds, true)) {
                return true;
            }
        }

        return false;
    }

    private function getNivel(Usuario $usuario): int
    {
        $usuario->loadMissing('perfil');

        return $usuario->perfil?->nivel ?? PerfilEnum::CONSULTA->value;
    }
}

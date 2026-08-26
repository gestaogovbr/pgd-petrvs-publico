<?php

declare(strict_types=1);

namespace App\V2\Usuario\Validators;

use App\Exceptions\ForbiddenException;
use App\Models\Usuario;
use App\Repository\UnidadeRepository;

class UsuarioShowAuthorizationValidator
{
    private const CAPACIDADE_VISUALIZAR_USUARIO = 'MOD_USER_VIS';
    private const CAPACIDADE_VISUALIZAR_TODOS = 'MOD_USER_TUDO';

    public function __construct(
        private readonly UnidadeRepository $unidadeRepository,
    ) {}

    /**
     * Valida se o solicitante pode visualizar o alvo.
     * Auto-consulta sempre permitida.
     * Para visualizar outros: exige capacidade MOD_USER_VIS + escopo hierárquico (quando aplicável).
     *
     * @return Usuario O alvo validado para reuso no service.
     */
    public function validarEscopo(Usuario $solicitante, Usuario $alvo): Usuario
    {
        if ($solicitante->cpf === $alvo->cpf) {
            return $alvo;
        }

        if (!$solicitante->hasPermissionTo(self::CAPACIDADE_VISUALIZAR_USUARIO)) {
            throw new ForbiddenException('Seu perfil não permite visualizar outros usuários.');
        }

        if ($solicitante->hasPermissionTo(self::CAPACIDADE_VISUALIZAR_TODOS)) {
            return $alvo;
        }

        $this->validarEscopoHierarquico($solicitante, $alvo);

        return $alvo;
    }

    private function validarEscopoHierarquico(Usuario $solicitante, Usuario $alvo): void
    {
        $unidadesGerenciadas = $this->unidadeRepository
            ->getUnidadesGerenciadas($solicitante->id)
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
}

<?php

namespace App\Enums;

/**
 * Nível do usuário do painel (coluna `users_panel.nivel`).
 *
 * Diferente de {@see PerfilEnum}, que representa o perfil de acesso do usuário
 * dentro de um tenant. Aqui o nível distingue o Órgão Central dos
 * configuradores vinculados a tenants.
 */
enum PainelUsuarioNivel: int
{
    case ORGAO_CENTRAL = 1;
    case CONFIGURADOR = 2;

    public function label(): string
    {
        return match ($this) {
            self::ORGAO_CENTRAL => 'Órgão Central',
            self::CONFIGURADOR => 'Configurador',
        };
    }
}

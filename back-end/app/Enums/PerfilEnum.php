<?php

namespace App\Enums;

enum PerfilEnum: int
{
    case DESENVOLVEDOR = 0;
    case ADMINISTRADOR_MASTER = 1;
    case ADMINISTRADOR_NEGOCIAL = 2;
    case UNIDADE = 3;
    case PARTICIPANTE = 5;
    case COLABORADOR = 6;
    case CONSULTA = 7;

    public function label(): string
    {
        return match($this) {
            self::DESENVOLVEDOR => 'Perfil Desenvolvedor',
            self::ADMINISTRADOR_MASTER => 'Perfil Administrador Master',
            self::ADMINISTRADOR_NEGOCIAL => 'Perfil Administrador Negocial',
            self::UNIDADE => 'Perfil Unidade',
            self::PARTICIPANTE => 'Perfil Participante',
            self::COLABORADOR => 'Perfil Colaborador',
            self::CONSULTA => 'Perfil Consulta',
        };
    }

    public function description(): string
    {
        return match($this) {
            self::DESENVOLVEDOR => 'Representantes do órgão Central do Siorg',
            self::ADMINISTRADOR_MASTER => 'Representantes da unidade autorizadora',
            self::ADMINISTRADOR_NEGOCIAL => 'Representantes de unidades instituidoras',
            self::UNIDADE => 'Representantes de unidades executoras',
            self::PARTICIPANTE => 'Agentes públicos selecionáveis para o PGD',
            self::COLABORADOR => 'Agente públicos não selecionáveis para o PGD (ex: Terceirizados)',
            self::CONSULTA => 'Agente públicos inativos na integração SIAPE da instalação',
        };
    }

    public static function asArray(): array
    {
        return array_map(
            fn(self $e) => [$e->value, $e->label(), $e->description()],
            self::cases()
        );
    }
}
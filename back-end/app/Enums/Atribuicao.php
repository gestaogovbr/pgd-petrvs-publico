<?php

namespace App\Enums;

enum Atribuicao: string
{
    case COLABORADOR = 'COLABORADOR';
    case GESTOR = 'GESTOR';
    case LOTADO = 'LOTADO';
    case GESTOR_SUBSTITUTO = 'GESTOR_SUBSTITUTO';
    case DELEGADO = 'GESTOR_DELEGADO';
}

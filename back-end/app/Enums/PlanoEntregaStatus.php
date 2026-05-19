<?php

namespace App\Enums;

enum PlanoEntregaStatus: string
{
    case INCLUIDO = 'INCLUIDO';
    case ATIVO = 'ATIVO';
    case SUSPENSO = 'SUSPENSO';
    case CONCLUIDO = 'CONCLUIDO';
    case CANCELADO = 'CANCELADO';
    case AVALIADO = 'AVALIADO';
    case HOMOLOGANDO = 'HOMOLOGANDO';
}

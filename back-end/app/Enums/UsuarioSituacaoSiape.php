<?php

namespace App\Enums;

enum UsuarioSituacaoSiape: string
{
    case ATIVO = 'ATIVO';
    case INATIVO = 'INATIVO';
    case ATIVO_TEMPORARIO = 'ATIVO_TEMPORARIO';
}
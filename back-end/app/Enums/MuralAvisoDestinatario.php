<?php

namespace App\Enums;

enum MuralAvisoDestinatario: string
{
    case TODOS = 'TODOS';
    case TENANT_ESPECIFICO = 'TENANT_ESPECIFICO';
}

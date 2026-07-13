<?php

namespace App\Enums;

enum EnvioPlanoTrabalhoStatusEnum: int
{
    case CANCELADO = 1;
    case EM_EXECUCAO = 3;
    case CONCLUIDO = 4;
}

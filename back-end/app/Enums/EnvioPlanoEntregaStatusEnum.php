<?php

namespace App\Enums;

enum EnvioPlanoEntregaStatusEnum: int
{
    case EM_EXECUCAO = 3;
    case CONCLUIDO = 4;
    case AVALIADO = 5;
}

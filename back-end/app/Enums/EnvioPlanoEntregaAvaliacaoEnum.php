<?php

namespace App\Enums;

enum EnvioPlanoEntregaAvaliacaoEnum: int
{
    case EXCEPCIONAL = 1;
    case ALTO_DESEMPENHO = 2;
    case ADEQUADO = 3;
    case ATENDEU_PARCIALMENTE = 4;
    case INADEQUADO_OU_NAO_EXECUTADO = 5;
}

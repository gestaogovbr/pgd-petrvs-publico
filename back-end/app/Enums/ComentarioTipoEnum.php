<?php

namespace App\Enums;

enum ComentarioTipoEnum: string
{
    case COMENTARIO = 'COMENTARIO';
    case TECNICO = 'TECNICO';
    case GERENCIAL = 'GERENCIAL';
    case AVALIACAO = 'AVALIACAO';
    case TAREFA = 'TAREFA';
    case ATIVIDADE = 'ATIVIDADE';
    case TIPO_ATIVIDADE = 'TIPO_ATIVIDADE';
}

<?php

namespace App\Models;

class CargaIndividualSiapeRelatorio extends ModelBase
{
    protected $table = 'cargas_individuais_siape_relatorios';

    protected $fillable = [
        'processamento_id',
        'tipo',
        'chave',
        'status',
        'entrada_valida',
        'mensagem_usuario',
        'orientacoes',
        'secoes',
        'solicitante_id',
        'processado_em',
        'expira_em',
    ];

    protected $casts = [
        'entrada_valida' => 'boolean',
        'orientacoes' => 'array',
        'secoes' => 'array',
        'processado_em' => 'datetime',
        'expira_em' => 'datetime',
    ];
}

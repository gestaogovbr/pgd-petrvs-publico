<?php

namespace App\Models;

use App\Enums\RelatorioGeracaoStatus;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property RelatorioGeracaoStatus $status
 */
class RelatorioGeracao extends ModelBase
{
    protected $table = 'relatorio_geracoes';

    protected $fillable = [
        'tipo',
        'nome',
        'status',
        'usuario_id',
        'parametros',
        'arquivo_path',
        'arquivo_nome',
        'iniciado_em',
        'finalizado_em',
        'erro_mensagem',
        'progresso_pagina',
        'progresso_total',
    ];

    protected $casts = [
        'status' => RelatorioGeracaoStatus::class,
        'parametros' => 'array',
        'iniciado_em' => 'datetime',
        'finalizado_em' => 'datetime',
        'progresso_pagina' => 'integer',
        'progresso_total' => 'integer',
    ];

    protected $hidden = [
        'arquivo_path',
    ];

    protected $appends = [
        'status_label',
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function getStatusLabelAttribute(): string
    {
        return $this->status instanceof RelatorioGeracaoStatus
            ? $this->status->label()
            : RelatorioGeracaoStatus::tryFrom((string) $this->status)?->label() ?? '';
    }
}

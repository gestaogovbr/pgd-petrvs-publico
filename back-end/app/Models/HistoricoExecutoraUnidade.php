<?php

namespace App\Models;

use App\Traits\AutoUuid;

class HistoricoExecutoraUnidade extends ModelBase
{
    use AutoUuid;

    protected $table = 'unidades_executora_historico';

    public $fillable = [
        'unidade_id',
        'executora',
        'data_inicio',
        'data_fim',
    ];

    protected $casts = [
        'executora' => 'boolean',
        'data_inicio' => 'date',
        'data_fim' => 'date',
    ];

    public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }
}

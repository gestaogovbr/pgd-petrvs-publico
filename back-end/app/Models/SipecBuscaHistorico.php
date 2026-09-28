<?php

namespace App\Models;

use App\Models\ModelBase;

/**
 * @property \Illuminate\Support\Carbon|null $data_execucao
 * @property string $resultado
 */
class SipecBuscaHistorico extends ModelBase
{
    protected $table = 'sipec_busca_historicos';

    protected $fillable = [
        'data_execucao',
        'resultado', /* json; NOT NULL; */
    ];

    protected $casts = [
        'data_execucao' => 'datetime',

    ];
}

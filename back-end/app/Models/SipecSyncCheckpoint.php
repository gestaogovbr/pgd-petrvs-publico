<?php

namespace App\Models;

class SipecSyncCheckpoint extends ModelBase
{
    protected $table = 'sipec_sync_checkpoints';

    protected $fillable = [
        'id',
        'tenant_id',
        'etapa',
        'ultima_pagina',
        'total_paginas',
    ];

    protected $casts = [
        'ultima_pagina' => 'integer',
        'total_paginas' => 'integer',
    ];
}

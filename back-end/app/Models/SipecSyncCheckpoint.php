<?php

namespace App\Models;

use App\Traits\AutoUuid;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string|null $tenant_id
 * @property string $etapa
 * @property int $ultima_pagina
 * @property int|null $total_paginas
 */
class SipecSyncCheckpoint extends Model
{
    use AutoUuid;

    protected $table = 'sipec_sync_checkpoints';

    protected $keyType = 'string';
    public $incrementing = false;

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

<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Traits\AutoUuid;

class IntegracaoChefia extends ModelBase
{
    use AutoUuid;

    protected $table = 'integracao_chefias';
    
    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'usuario_id', /* varchar(50); */
        'unidade_id', /* varchar(50); */
        'tipo', /* $table->enum("tipo", ["TITULAR", "SUBSTITUTO"]) (default = TITULAR)*/ 
    ];

    protected $keyType = 'string';

    protected $casts = [];

    protected $dates = ['deleted_at'];
}

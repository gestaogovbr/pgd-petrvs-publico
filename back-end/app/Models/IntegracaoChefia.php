<?php

namespace App\Models;

use App\Models\ModelBase;
<<<<<<< HEAD
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
=======

class IntegracaoChefia extends ModelBase
{
    protected $table = 'integracao_chefias';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'unidade_id',
        'gestor_id_siape',
        'gestor_id_petrvs',
        'gestor_substituto_id_siape',
        'gestor_substituto_id_petrvs'
    ];
    //Has
    //belongsTo
    public function gestor_siape() { return $this->belongsTo(Usuario::class, 'gestor_id_siape'); }
    public function gestor_petrvs() { return $this->belongsTo(Usuario::class, 'gestor_id_petrvs'); }
    public function gestor_substituto_siape() { return $this->belongsTo(Usuario::class, 'gestor_substituto_id_siape'); }
    public function gestor_substituto_petrvs() { return $this->belongsTo(Usuario::class, 'gestor_substituto_id_petrvs'); }

    protected $casts = [];
>>>>>>> develop
}

<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;

class Favorito extends ModelBase
{
    protected $table = 'favoritos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        //'config', /* json; */// Configurações do favoritos
        //'usuario_id', /* char(36); NOT NULL; */
    ];

    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    
    // Mutattors e Casts
    public function getConfigAttribute($value)
    {
        return json_decode($value);
    }   
    public function setConfigAttribute($value)
    {
        $this->attributes['config'] = json_encode($value);
    }    
}

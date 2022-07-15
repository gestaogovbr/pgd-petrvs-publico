<?php

namespace App\Models;

use App\Models\ModelBase;
use App\Models\Usuario;

class Favorito extends ModelBase
{
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

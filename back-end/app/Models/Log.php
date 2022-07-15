<?php

namespace App\Models;

use App\Models\ModelBase;

class Log extends ModelBase
{
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    
}

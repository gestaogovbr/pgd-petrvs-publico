<?php

namespace App\Models;

use App\Casts\AsJson;
use App\Models\ModelBase;
use App\Models\Usuario;

class Favorito extends ModelBase
{
    protected $table = 'favoritos';

    protected $with = [];

    public $fillable = [ /* TYPE; NULL?; DEFAULT?; */// COMMENT
        'config', /* json; */// Configurações do favoritos
        'usuario_id', /* char(36); NOT NULL; */
        //'deleted_at', /* timestamp; */
    ];

    // Casting
    protected $casts = [
        'config' => AsJson::class
    ];
    
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    

}

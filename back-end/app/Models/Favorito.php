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
        //'deleted_at', /* timestamp; */
        'config', /* json; */// Configurações do favoritos
        'usuario_id', /* char(36); NOT NULL; */
    ];

    // Casting
    protected $casts = [
        'config' => AsJson::class
    ];
    
    // Belongs
    public function usuario() { return $this->belongsTo(Usuario::class); }    //OK//

}

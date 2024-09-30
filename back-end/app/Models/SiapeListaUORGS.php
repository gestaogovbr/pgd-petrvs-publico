<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiapeListaUORGS extends ModelBase
{
    use HasFactory;

    protected $table = 'siape_listaUORG';


    protected $fillable = [
        'response',
         'processado'
    ];

}

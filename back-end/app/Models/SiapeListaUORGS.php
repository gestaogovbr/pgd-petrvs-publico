<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiapeListaUORGS extends ModelBase
{
    use HasFactory;

    public const PROCESSADO = 1;

    protected $table = 'siape_listaUORG';


    protected $fillable = [
        'codigo_orgao',
        'response',
         'processado'
    ];

}

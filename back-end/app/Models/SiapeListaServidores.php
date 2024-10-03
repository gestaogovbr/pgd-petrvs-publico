<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiapeListaServidores extends ModelBase
{
    use HasFactory;

    protected $table = 'siape_listaServidores';


    protected $fillable = [
        'id',
        'response',
        'processado',
         'created_at',
        'updated_at'
    ];
    
}
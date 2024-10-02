<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiapeConsultaDadosPessoais extends ModelBase
{
    use HasFactory;

    protected $table = 'siape_consultaDadosPessoais';


    protected $fillable = [
        'id',
        'cpf',
        'response',
        'processado'
    ];
    
}
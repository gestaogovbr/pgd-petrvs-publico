<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiapeConsultaDadosFuncionais extends ModelBase
{
    use HasFactory;

    protected $table = 'siape_consultaDadosFuncionais';


    protected $fillable = [
        'id',
        'cpf',
        'response',
        'data_modificacao',
        'processado',
        'created_at',
        'updated_at'
    ];
    
}

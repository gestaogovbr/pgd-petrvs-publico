<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiapeBlackListServidor extends ModelBase
{
    use HasFactory;

    protected $table = 'siape_blacklist_servidores';

    protected $fillable = [
        'id',
        'cpf',
        'matricula',
        'response',
        'created_at',
        'updated_at'
    ];
    
}

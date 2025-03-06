<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiapeBlackListServidores extends ModelBase
{
    use HasFactory;

    protected $table = 'siape_blacklist_servidores';

    protected $fillable = [
        'id',
        'cpf',
        'response',
        'created_at',
        'updated_at'
    ];
    
}

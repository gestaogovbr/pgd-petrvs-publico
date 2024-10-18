<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiapeDadosUORG extends ModelBase
{
    use HasFactory;

    protected $table = 'siape_dadosUORG';


    protected $fillable = [
        'id',
        'response',
        'processado',
        'data_modificacao',
        'created_at',
        'updated_at'
    ];
}

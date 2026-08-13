<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $codigo_orgao
 */
class SiapeDadosUORG extends ModelBase
{
    use HasFactory;

    protected $table = 'siape_dadosUORG';


    protected $fillable = [
        'id',
        'codigo_orgao',
        'codigo',
        'response',
        'processado',
        'data_modificacao',
        'created_at',
        'updated_at'
    ];
}

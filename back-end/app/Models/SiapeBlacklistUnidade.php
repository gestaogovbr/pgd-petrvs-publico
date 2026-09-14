<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property string $codigo_orgao
 */
class SiapeBlacklistUnidade extends ModelBase
{
    use HasFactory;

    protected $table = 'siape_blacklist_unidades';

    protected $fillable = [
        'id',
        'codigo_orgao',
        'codigo',
        'response',
        'inativado',
        'created_at',
        'updated_at'
    ];
    
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiapeBlacklistUnidade extends ModelBase
{
    use HasFactory;

    protected $table = 'siape_blacklist_unidades';

    protected $fillable = [
        'id',
        'codigo',
        'response',
        'created_at',
        'updated_at'
    ];
    
}
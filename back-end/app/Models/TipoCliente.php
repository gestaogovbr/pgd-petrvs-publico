<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TipoCliente extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'tipos_clientes';
    public $fillable = [
        'nome',
    ];

    public function clientes()
    {
        return $this->hasMany(Cliente::class);
    }

}

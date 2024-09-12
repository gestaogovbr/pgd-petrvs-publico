<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'clientes';

    public $fillable = [
        'nome',
        'tipo_cliente_id'
    ];

    public function tipoCliente()
    {
        return $this->belongsTo(TipoCliente::class);
    }

    public function clienteProduto()
    {
        return $this->hasMany(ProdutoCliente::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'clientes';

    public $fillable = [
        'nome',
        'tipo_cliente_id',
        'unidade_id'
    ];

    protected $casts = [
        'id' => 'string',
        'nome' => 'string',
        'tipo_cliente_id' => 'string',
        'unidade_id' => 'string'
    ];

    public function tipoCliente()
    {
        return $this->belongsTo(TipoCliente::class);
    }

    public function clienteProduto()
    {
        return $this->hasMany(ProdutoCliente::class);
    }

    public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }
}

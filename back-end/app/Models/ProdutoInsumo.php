<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\ModelBase;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProdutoInsumo extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'produtos_insumos';

    
    protected $fillable = [
        'produto_insumo_id',
        'produto_id',
        'origem',
        'unidade_id',
        'descricao',
        'cliente_id'
    ];


    protected $casts = [
        'id' => 'string',
        'produto_id' => 'string',
        'produto_insumo_id' => 'string',
        'unidade_id' => 'string',
        'cliente_id' => 'string',
    ];

    public function produto()
    {
        return $this->belongsTo(Produto::class, 'produto_id');
    }

    public function unidade()
    {
        return $this->belongsTo(Unidade::class, 'unidade_id');
    }

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'cliente_id');
    }

    public function produtoRelacionado()
    {
        return $this->belongsTo(Produto::class, 'produto_insumo_id');
    }
}

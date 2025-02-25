<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\ModelBase;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProdutoProduto extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'produto_produto';

    
    protected $fillable = [
        'produto_base_id',
        'produto_id'
    ];


    protected $casts = [
        'id' => 'string',
        'produto_id' => 'string',
        'produto_base_id' => 'string'
    ];

    public function produtoBase()
    {
        return $this->belongsTo(Produto::class, 'produto_base_id');
    }

    public function produtoRelacionado()
    {
        return $this->belongsTo(Produto::class, 'produto_id');
    }
}

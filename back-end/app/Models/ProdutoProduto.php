<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ModelBase;
class ProdutoProduto extends ModelBase
{
    use HasFactory;

    protected $table = 'produto_produto';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'produto_base_id',
        'produto_id',
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

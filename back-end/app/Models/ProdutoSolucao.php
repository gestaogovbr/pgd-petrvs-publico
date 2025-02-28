<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProdutoSolucao extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'produtos_solucoes';

    protected $fillable = [
        'produto_id',
        'solucao_id'
    ];

    protected $casts = [
        'id' => 'string',
        'produto_id' => 'string',
        'solucao_id' => 'string'
    ];

    public function produto()
    {
        return $this->belongsTo(Produto::class, 'produto_id');
    }

    public function solucao()
    {
        return $this->belongsTo(Solucao::class, 'solucao_id');
    }
}

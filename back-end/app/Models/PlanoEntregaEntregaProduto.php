<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ModelBase;

class PlanoEntregaEntregaProduto extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'planos_entregas_entregas_produtos';

    protected $fillable = [
        'entrega_id', // FK para a entrega
        'produto_id', // FK para o produto
    ];

    // Relacionamentos
    public function entrega()
    {
        return $this->belongsTo(PlanoEntregaEntrega::class, 'entrega_id');
    }

    public function produto()
    {
        return $this->belongsTo(Produto::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ModelBase;

class EntregaProduto extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'entregas_produtos';

    protected $fillable = [
        'entrega_id', // FK para a entrega
        'produto_id', // FK para o produto
        'unidade_id', // FK para a unidade
    ];

    protected $casts = [
        'descricao' => 'string',
    ];

    // Relacionamentos
    public function entrega()
    {
        return $this->belongsTo(Entrega::class);
    }

    public function produto()
    {
        return $this->belongsTo(Produto::class);
    }

    public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }
}

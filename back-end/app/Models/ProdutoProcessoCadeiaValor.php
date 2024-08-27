<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ModelBase;
class ProdutoProcessoCadeiaValor extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'produto_processo_cadeia_valor';


    protected $fillable = [
        'produto_id',
        'cadeia_valor_processo_id',
    ];

    protected $casts = [
        'id' => 'string',
        'produto_id' => 'string',
        'cadeia_valor_processo_id' => 'string',
    ];

   
    public function produto()
    {
        return $this->belongsTo(Produto::class, 'produto_id');
    }

    public function cadeiaValorProcesso()
    {
        return $this->belongsTo(CadeiaValorProcesso::class, 'cadeia_valor_processo_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rules\Enum;
use App\Models\ModelBase;

class Produto  extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'produtos';
    
    public $fillable_changes = ['produtoProcessoCadeiaValor', 'produtoProduto'];

    public $cascadeDeletes = ['produtoProcessoCadeiaValor'];

    const TIPO_PRODUTO = 'produto';
    const TIPO_SERVICO = 'servico';

    protected $fillable = [
        'nome',
        'nome_fantasia',
        'tipo',
        'descricao',
        'url',
    ];

    protected $casts = [
        'id' => 'string',
        'nome' => 'string',
        'nome_fantasia' => 'string',
        'tipo' => 'string',
        'descricao' => 'string',
        'url' => 'string',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];


    public function produtoProduto()
    {
        return $this->hasMany(ProdutoProduto::class, 'produto_base_id');
    }

    public function produtoProcessoCadeiaValor()
    {
        return $this->hasMany(ProdutoProcessoCadeiaValor::class, 'produto_id');
    }

    public function setTipoAttribute($value)
    {
        $this->attributes['tipo'] = strtolower($value);
    }

   
    public function isTipoValido($tipo)
    {
        return in_array($tipo, [self::TIPO_PRODUTO, self::TIPO_SERVICO]);
    }
}

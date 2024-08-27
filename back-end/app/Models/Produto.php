<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rules\Enum;

class Produto extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'produtos';

    protected $keyType = 'string';

    public $incrementing = false;

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

    

    public function produtosRelacionados()
    {
        return $this->belongsToMany(Produto::class, 'produto_produto', 'produto_base_id', 'produto_id');
    }

    public function produtoProcessoCadeiaValor()
    {
        return $this->hasMany(ProdutoProcessoCadeiaValor::class, 'produto_id');
    }

    public function getTipoAttribute($value)
    {
        return ucfirst($value);
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

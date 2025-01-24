<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rules\Enum;
use App\Models\ModelBase;
use Illuminate\Support\Facades\DB;

class Produto  extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'produtos';

    public $fillable_changes = ['produtoProcessoCadeiaValor', 'produtoProduto', 'produtoCliente', 'solucoes','produtoSolucoes'];

    public $cascadeDeletes = ['produtoProcessoCadeiaValor'];

    const TIPO_PRODUTO = 'produto';
    const TIPO_SERVICO = 'servico';

    protected $fillable = [
        'responsavel_id',
        'nome',
        'nome_fantasia',
        'tipo',
        'descricao',
        'url',
        'unidade_id',
        'data_ativado',
        'data_desativado',
        'identificador'
    ];

    protected $casts = [
        'id' => 'string',
        'responsavel_id' => 'string',
        'nome' => 'string',
        'nome_fantasia' => 'string',
        'tipo' => 'string',
        'descricao' => 'string',
        'url' => 'string',
        'unidade_id' => 'string',
        'data_ativado' => 'datetime',
        'data_desativado' => 'datetime',
        'identificador' => 'integer'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected static function booted()
    {
        static::creating(function ($produto) {
            $produto->identificador = DB::select("SELECT IFNULL(MAX(identificador), 0) + 1 AS proximo_numero FROM produtos;")[0]->proximo_numero;
        });
    }


    public function produtoProduto()
    {
        return $this->hasMany(ProdutoProduto::class, 'produto_base_id');
    }

    public function produtoProcessoCadeiaValor()
    {
        return $this->hasMany(ProdutoProcessoCadeiaValor::class, 'produto_id');
    }

    public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }

    public function setTipoAttribute($value)
    {
        $this->attributes['tipo'] = strtolower($value);
    }


    public function isTipoValido($tipo)
    {
        return in_array($tipo, [self::TIPO_PRODUTO, self::TIPO_SERVICO]);
    }

    public function produtoCliente()
    {
        return $this->hasMany(ProdutoCliente::class);
    }

    public function produtoSolucoes()
    {
        return $this->hasMany(ProdutoSolucao::class);
    }

    public function solucoes()
    {
        return $this->belongsToMany(Solucao::class, 'produtos_solucoes', 'produto_id', 'solucao_id');
    }

    public function entregas()
    {
        return $this->belongsToMany(PlanoEntregaEntrega::class, 'planos_entregas_entregas_produtos', 'produto_id', 'entrega_id');
    }

    public function responsavel(){
        return $this->belongsTo(Usuario::class, 'responsavel_id', 'id');
    }
    
}

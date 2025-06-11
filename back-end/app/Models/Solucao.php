<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use App\Models\ModelBase;

class Solucao extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'solucao_produtos_servicos';

    protected $keyType = 'string';

    public $incrementing = false;

    protected static function booted()
    {
        static::creating(function ($produto) {
            $produto->identificador = DB::select("SELECT IFNULL(MAX(identificador), 0) + 1 AS proximo_numero FROM solucao_produtos_servicos;")[0]->proximo_numero;
        });
    }

    protected $fillable = [
        'nome',
        'sigla',
        'descricao',
        'url',
        'identificador'
    ];

    protected $casts = [
        'id' => 'string',
        'identificador' => 'string',
        'nome' => 'string',
        'sigla' => 'string',
        'descricao' => 'string',
        'identificador' => 'integer',
        'url' => 'string'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function solucoesUnidades(){
        return $this->hasMany(SolucaoUnidade::class, 'id_solucao', 'id');
    }

    public function produtosSolucoes(){
        return $this->hasMany(ProdutoSolucao::class, 'solucao_id', 'id');
    }
}

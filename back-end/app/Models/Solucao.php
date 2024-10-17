<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\ModelBase;

class Solucao extends ModelBase
{
    use HasFactory, SoftDeletes;

    protected $table = 'solucao_produtos_servicos';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'nome',
        'sigla',
        'unidade_id',
        'descricao',
        'status',
        'url',
        'data_ativado',
        'data_desativado',
    ];

    protected $casts = [
        'id' => 'string',
        'nome' => 'string',
        'sigla' => 'string',
        'unidade_id' => 'string',
        'descricao' => 'string',
        'status' => 'integer',
        'url' => 'string',
        'data_ativado' => 'datetime',
        'data_desativado' => 'datetime',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }

    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}

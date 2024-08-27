<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rules\Enum;

class Catalogo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'catalogo_produtos_servicos';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'nome',
        'unidade_id',
        'curador_responsavel_id',
        'data_inicio',
        'data_fim',
    ];

    protected $casts = [
        'id' => 'string',
        'nome' => 'string',
        'unidade_id' => 'string',
        'curador_responsavel_id' => 'string',
        'data_inicio' => 'date',
        'data_fim' => 'date',
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

    public function curadorResponsavel()
    {
        return $this->belongsTo(User::class, 'curador_responsavel_id');
    }


}

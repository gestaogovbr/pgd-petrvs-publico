<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatalogoProdutoServico extends Model
{
    use HasFactory;

    protected $table = 'catalogo_produtos_servicos';

    protected $fillable = [
        'nome',
        'unidade_id',
        'curador_responsavel_id',
        'data_inicio',
        'data_fim'
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrgaoCentralExportacao extends Model
{
    use HasFactory;

    protected $table = 'orgao_central_exportacoes';

    protected $fillable = ['data_exportacao', 'tipo', 'parametros', 'versao', 'corpo', 'retorno', 'hashs'];

    protected $casts = [
        'parametros' => 'array',
        'corpo' => 'array',
        'retorno' => 'array',
        'hashs' => 'array'
    ];
}

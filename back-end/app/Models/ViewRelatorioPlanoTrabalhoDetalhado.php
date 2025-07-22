<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewRelatorioPlanoTrabalhoDetalhado extends Model
{
    protected $table = 'view_relatorio_plano_trabalho_detalhado';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
        'chd' => 'double:2'
    ];
}

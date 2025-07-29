<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewRelatorioAgente extends Model
{
    protected $table = 'view_relatorio_agentes';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
    ];
}

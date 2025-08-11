<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewRelatorioUnidade extends Model
{
    protected $table = 'view_relatorio_unidades';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $casts = [
    ];
}

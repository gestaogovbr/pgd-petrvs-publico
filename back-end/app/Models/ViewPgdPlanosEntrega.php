<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewPgdPlanosEntrega extends Model
{
    protected $table = 'vw_pgd_planos_entrega';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;
}

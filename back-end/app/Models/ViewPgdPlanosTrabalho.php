<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewPgdPlanosTrabalho extends Model
{
    protected $table = 'vw_pgd_planos_trabalho';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;
}
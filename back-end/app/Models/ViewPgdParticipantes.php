<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ViewPgdParticipantes extends Model
{
    protected $table = 'vw_pgd_usuarios';
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;
}

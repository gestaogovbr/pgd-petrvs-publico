<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\AutoUuid;

class EnvioItem extends Model
{
    use HasFactory, AutoUuid;

    protected $table = 'envio_itens';
    protected $keyType = 'string';
    public $incrementing = false;
}

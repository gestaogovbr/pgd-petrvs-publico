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

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'uid');
    }

    public function planoTrabalho()
    {
        return $this->belongsTo(PlanoTrabalho::class, 'uid');
    }

    public function planoEntrega()
    {
        return $this->belongsTo(PlanoEntrega::class, 'uid');
    }
}

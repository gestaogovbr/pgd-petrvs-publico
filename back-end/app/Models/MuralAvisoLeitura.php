<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\AutoUuid;

class MuralAvisoLeitura extends Model
{
    use AutoUuid;

    protected $table = 'mural_avisos_leituras';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'data_confirmacao',
        'created_at',
    ];

    protected $casts = [
        'data_confirmacao' => 'datetime',
        'created_at' => 'datetime',
    ];

    public function usuario(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
}

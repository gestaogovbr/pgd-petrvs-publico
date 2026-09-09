<?php

namespace App\Models;

use App\Traits\AutoUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MuralAvisoLeitura extends Model
{
    use HasFactory, AutoUuid;

    protected $table = 'mural_avisos_leituras';

    protected $keyType = 'string';

    public $incrementing = false;

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

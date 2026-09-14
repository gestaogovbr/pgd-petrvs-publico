<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property string $usuario_id
 * @property \DateTimeInterface $data_inicio
 * @property \DateTimeInterface|null $data_fim
 * @property \DateTimeInterface $ciencia_em
 * @property string $responsavel_id
 * @property-read Usuario $usuario
 * @property-read Usuario $responsavel
 * @property-read \Illuminate\Database\Eloquent\Collection|DispensaPlanoTrabalhoHistorico[] $historicos
 */
class DispensaPlanoTrabalho extends ModelBase
{
    protected $table = 'dispensas_plano_trabalho';

    public $fillable = [
        'usuario_id',
        'data_inicio',
        'data_fim',
        'ciencia_em',
        'responsavel_id',
    ];

    protected $casts = [
        'data_inicio' => 'date',
        'data_fim' => 'date',
        'ciencia_em' => 'datetime',
    ];

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function responsavel(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'responsavel_id');
    }

    public function historicos(): HasMany
    {
        return $this->hasMany(DispensaPlanoTrabalhoHistorico::class, 'dispensa_id')->orderByDesc('created_at');
    }

    public function isVigente(?Carbon $naData = null): bool
    {
        $data = ($naData ?? Carbon::today())->startOfDay();
        $inicio = Carbon::parse($this->data_inicio)->startOfDay();
        if ($data->lt($inicio)) {
            return false;
        }
        if ($this->data_fim === null) {
            return true;
        }

        return $data->lte(Carbon::parse($this->data_fim)->startOfDay());
    }
}

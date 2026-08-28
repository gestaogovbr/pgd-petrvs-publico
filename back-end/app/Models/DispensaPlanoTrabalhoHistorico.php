<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property string $dispensa_id
 * @property string $usuario_id
 * @property \DateTimeInterface $data_inicio
 * @property \DateTimeInterface|null $data_fim
 * @property string $operacao
 * @property \DateTimeInterface $ciencia_em
 * @property string $responsavel_id
 * @property-read Usuario $usuario
 * @property-read Usuario $responsavel
 * @property-read DispensaPlanoTrabalho $dispensa
 */
class DispensaPlanoTrabalhoHistorico extends ModelBase
{
    protected $table = 'dispensas_plano_trabalho_historico';

    public const UPDATED_AT = null;

    /** Histórico é append-only; não usa soft delete. */
    public static function bootSoftDeletes()
    {
        // no-op: desabilita SoftDeletes herdado de ModelBase
    }

    public $fillable = [
        'dispensa_id',
        'usuario_id',
        'data_inicio',
        'data_fim',
        'operacao',
        'ciencia_em',
        'responsavel_id',
    ];

    protected $casts = [
        'data_inicio' => 'date',
        'data_fim' => 'date',
        'ciencia_em' => 'datetime',
    ];

    public function dispensa(): BelongsTo
    {
        return $this->belongsTo(DispensaPlanoTrabalho::class, 'dispensa_id');
    }

    public function usuario(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function responsavel(): BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'responsavel_id');
    }
}

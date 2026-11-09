<?php

namespace App\Models;

use App\Traits\AutoUuid;
use Illuminate\Database\Eloquent\Model;

/**
 * Histórico do flag "executora" de uma unidade.
 *
 * A tabela unidades_executora_historico não possui deleted_at nem auditoria
 * (migração 2026_09_09_110000 rebuild sem audits), então este modelo não
 * pode herdar SoftDeletes/Auditable de ModelBase.
 */
class HistoricoExecutoraUnidade extends Model
{
    use AutoUuid;

    protected $table = 'unidades_executora_historico';

    protected $keyType = 'string';
    public $incrementing = false;

    public $fillable = [
        'unidade_id',
        'executora',
        'data_inicio',
        'data_fim',
    ];

    protected $casts = [
        'executora' => 'boolean',
        'data_inicio' => 'date',
        'data_fim' => 'date',
    ];

    public function unidade()
    {
        return $this->belongsTo(Unidade::class);
    }
}

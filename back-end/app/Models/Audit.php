<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable as AuditableContract;
use OwenIt\Auditing\Auditable;

class Audit extends Model implements AuditableContract
{
    use Auditable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'audits';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',       // Usuário que realizou a alteração
        'event',         // Tipo de evento (created, updated, deleted)
        'auditable_type', // Tipo do modelo alterado
        'auditable_id',   // ID do modelo alterado
        'old_values',    // Valores anteriores (JSON)
        'new_values',    // Novos valores (JSON)
        'url',           // URL onde ocorreu a ação
        'ip_address',    // IP do usuário
        'user_agent',    // User Agent do navegador
        'tags',          // Tags opcionais
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
    ];

    /**
     * Relationship with User model.
     */
    public function user()
    {
        return $this->belongsTo(Usuario::class);
    }

    /**
     * Relationship with the auditable model.
     */
    public function auditable()
    {
        return $this->morphTo();
    }
}

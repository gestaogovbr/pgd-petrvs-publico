<?php

namespace App\Models;

class MuralAviso extends ModelBase
{
    protected $table = 'mural_avisos';

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->connection = env('DB_CONNECTION', 'mysql');
    }

    protected $fillable = [
        'titulo',
        'conteudo',
        'destinatario',
        'tenant_id',
        'remetente_tipo',
        'remetente_tenant_id',
        'publicado_por_id',
        'data_publicacao',
    ];

    protected $casts = [
        'data_publicacao' => 'datetime',
    ];

    public function tenant(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Tenant::class, 'tenant_id');
    }

    public function remetenteTenant(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Tenant::class, 'remetente_tenant_id');
    }

    public function publicadoPor(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(PainelUsuario::class, 'publicado_por_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logs extends Model
{
    protected $fillable = ['tenant_id', 'level', 'message', 'context'];

    // Relação com o tenant, se aplicável
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    // Scope para filtrar por data de criação
    public function scopeCreatedAt($query, $date)
    {
        return $query->whereDate('created_at', $date);
    }

    // Scope para filtrar por tenant_id
    public function scopeTenantId($query, $tenantId)
    {
        return $query->where('tenant_id', $tenantId);
    }
}

<?php
namespace App\Services\API_PGD\AuditSources;

use App\Models\ViewPgdPlanosEntrega;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PlanoEntregaAuditSource extends AuditSource
{
    public function __construct(string $tipo = null) {
        $this->tipo = 'entrega';
    }

    public function getData() {
        return ViewPgdPlanosEntrega::withoutGlobalScope(SoftDeletingScope::class)
                ->cursor();
    }

    public function count() {
        return ViewPgdPlanosEntrega::withoutGlobalScope(SoftDeletingScope::class)
                ->count();
    }
}


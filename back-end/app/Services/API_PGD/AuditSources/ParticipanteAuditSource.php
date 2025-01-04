<?php
namespace App\Services\API_PGD\AuditSources;

use App\Models\ViewPgdParticipantes;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ParticipanteAuditSource extends AuditSource
{
    public function __construct(string $tipo = null) {
        $this->tipo = 'participante';
    }

    public function getData() {
        return ViewPgdParticipantes::withoutGlobalScope(SoftDeletingScope::class)
                ->cursor();
    }

    public function count() {
        return ViewPgdParticipantes::withoutGlobalScope(SoftDeletingScope::class)
                ->count();
    }
}
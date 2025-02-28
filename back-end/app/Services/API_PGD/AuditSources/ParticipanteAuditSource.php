<?php
namespace App\Services\API_PGD\AuditSources;

use App\Models\ViewPgdParticipantes;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\DB;
use PDO;

class ParticipanteAuditSource extends AuditSource
{
    public function __construct(string $tipo = null) {
        $this->tipo = 'participante';
    }

    public function getData() {
        DB::connection()->getPdo()->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
        return ViewPgdParticipantes::withoutGlobalScope(SoftDeletingScope::class)
                ->chunk(100);
    }

    public function count() {
        return ViewPgdParticipantes::withoutGlobalScope(SoftDeletingScope::class)
                ->count();
    }
}
<?php
namespace App\Services\API_PGD\Sources;

use App\Exceptions\ExportPgdException;
use App\Models\Usuario;
use App\Models\ViewApiPgd;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ParticipanteDataSource extends DataSource
{
    public function getAuditInfo() { 
        return ViewApiPgd::where('tipo', 'participante')
                ->withoutGlobalScope(SoftDeletingScope::class)
                ->get();
    }

    public function getData($auditModel) {

        if (!$auditModel->id){
            throw new ExportPgdException('ID de Usuário não definido');
        }

        $participante = Usuario::with([
                'ultimoPlanoTrabalho',
                'ultimoPlanoTrabalho.tipoModalidade',
                'ultimoPlanoTrabalho.ultimaAssinatura',
                'ultimaParticipacaoPrograma',
                'ultimaParticipacaoPrograma.programa.unidade',
                'unidadesIntegrantes.unidade',
                'unidadesIntegrantes.atribuicoes' => function ($query) {
                    $query
                        ->where('atribuicao', 'lotado')
                        ->whereNull('deleted_at');
                }
            ])
            ->find($auditModel->id);

        if (!$participante){
            throw new ExportPgdException('Usuário sem Participação');
        }

        return $participante;
    }
}


<?php
namespace App\Services\API_PGD\Sources;

use App\Exceptions\ExportPgdException;
use App\Models\PlanoTrabalho;
use App\Models\Usuario;
use App\Models\ViewApiPgd;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PlanoTrabalhoDataSource extends DataSource
{
    public function getAuditInfo() { 
        return ViewApiPgd::where('tipo', 'trabalho')
                ->withoutGlobalScope(SoftDeletingScope::class)
                ->get();
    }

    public function getData($auditModel) {

        if (!$auditModel->id){
            throw new ExportPgdException('ID do Plano de Trabalho não definido');
        }

        $planoTrabalho = PlanoTrabalho::with([
            'programa',
            'programa.unidadeAutorizadora',
            'usuario',
            'entregas',
            'entregas.planoEntregaEntrega',
            'entregas.planoTrabalho',
            'consolidacoes',
            'consolidacoes.avaliacao'
        ])
        ->find($auditModel->id);
        //->whereIn('status', ['CANCELADO', 'ATIVO', 'CONCLUIDO', 'AVALIADO', '']);


        if (!$planoTrabalho->programa){
            throw new ExportPgdException('Plano de Trabalho não possui Programa');
        }

        if (!$planoTrabalho->unidade){
            throw new ExportPgdException('Plano de Trabalho não possui Unidade Autorizadora');
        }

        if (!$planoTrabalho->programa->unidadeAutorizadora){
            throw new ExportPgdException('Plano de Trabalho não possui Unidade Autorizadora');
        }

        if (!$planoTrabalho->usuario){
            throw new ExportPgdException('Plano de Trabalho não possui Usuário');
        }

        return $planoTrabalho;
    }
}


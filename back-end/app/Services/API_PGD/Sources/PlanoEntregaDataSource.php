<?php
namespace App\Services\API_PGD\Sources;

use App\Exceptions\ExportPgdException;
use App\Models\PlanoEntrega;
use App\Models\ViewApiPgd;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PlanoEntregaDataSource extends DataSource
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

        $planoEntrega = PlanoEntrega::with([
            'programa',
            'programa.unidadeAutorizadora',
            'programa.unidade',
            'unidade',
            'entregas',
            'entregas.planoEntregaEntrega',
            'entregas.planoTrabalho'
        ])
        ->find($auditModel->id);
        //->whereIn('status', ['CANCELADO', 'ATIVO', 'CONCLUIDO', 'AVALIADO', '']);

        if (!$planoEntrega){
            throw new ExportPgdException('Plano de Entrega removido ou inválido');
        }

        if (!$planoEntrega->programa){
            throw new ExportPgdException('Plano de Entrega não possui Programa');
        }

        if (!$planoEntrega->programa->unidadeAutorizadora){
            throw new ExportPgdException('Plano de Entrega não possui Unidade Autorizadora');
        }

        if (!$planoEntrega->unidade){
            throw new ExportPgdException('Plano de Trabalho não possui Unidade Executora');
        }

        if (!$planoEntrega->programa->unidade){
            throw new ExportPgdException('Plano de Trabalho não possui Unidade Instituidora');
        }

        return $planoEntrega;
    }
}


<?php
namespace App\Services\API_PGD\DataSources;

use App\Exceptions\ExportPgdException;
use App\Models\PlanoTrabalho;
use App\Services\API_PGD\ExportSource;

class PlanoTrabalhoDataSource extends DataSource
{
    public function getData(ExportSource $exportSource) {

        if (!$exportSource->id){
            throw new ExportPgdException('ID do Plano de Trabalho não definido');
        }

        $planoTrabalho = PlanoTrabalho::with([
            'programa',
            'programa.unidadeAutorizadora',
            'usuario',
            'entregas',
            'entregas.planoEntregaEntrega',
            'entregas.planoEntregaEntrega.planoEntrega' => function ($query) {
                $query->whereIn('status', ['CANCELADO', 'ATIVO', 'CONCLUIDO', 'AVALIADO']);
            },
            'entregas.planoTrabalho',
            'consolidacoes' => function ($query) {
                $query->whereIn('status', ['CANCELADO', 'AVALIADO']);
            },
            'consolidacoes.avaliacao'
        ])
        ->find($exportSource->id);
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


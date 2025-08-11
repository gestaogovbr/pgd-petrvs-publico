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
            'usuario',
            'entregas' => function ($query) {
                $query
                    ->whereDoesntHave('planoEntregaEntrega.planoEntrega')
                    ->orWhereHas('planoEntregaEntrega.planoEntrega', function($query) {
                        $query->whereIn('status', ['ATIVO', 'CONCLUIDO', 'AVALIADO']);
                    });
            },
            'entregas.planoTrabalho',
            'consolidacoes' => function ($query) {
                $query->whereIn('status', ['AVALIADO']);
            },
            'consolidacoes.avaliacao'
        ])
        ->find($exportSource->id);

        if (!$planoTrabalho) {
            throw new ExportPgdException("Plano de Trabalho {$exportSource->id} inválido para exportação");
        }

        if (!$planoTrabalho->programa){
            throw new ExportPgdException("Plano de Trabalho {$exportSource->id} não possui Programa válido");
        }

        if (!$planoTrabalho->usuario){
            throw new ExportPgdException("Plano de Trabalho {$exportSource->id} não possui Usuário");
        }

        if (!$planoTrabalho->usuario->lotacao){
            throw new ExportPgdException("Usuário do Plano de Trabalho {$exportSource->id} não possui Lotação");
        }

        if (!$planoTrabalho->usuario->ultimaParticipacaoPrograma){
            throw new ExportPgdException("Usuário do Plano de trabalho {$exportSource->id} não possui Participação Ativa");
        }

        return $planoTrabalho;
    }
}


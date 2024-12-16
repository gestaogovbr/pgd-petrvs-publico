<?php
namespace App\Services\API_PGD\DataSources;

use App\Exceptions\ExportPgdException;
use App\Models\PlanoEntrega;
use App\Services\API_PGD\ExportSource;

class PlanoEntregaDataSource extends DataSource
{
    public function getData(ExportSource $exportSource) {

        if (!$exportSource->id){
            throw new ExportPgdException('ID do Plano de Entrega não definido');
        }

        $planoEntrega = PlanoEntrega::with([
            'programa',
            'programa.unidade',
            'unidade',
            'entregas',
            'entregas.unidade'
        ])
        ->find($exportSource->id);

        if (!$planoEntrega){
            throw new ExportPgdException("Plano de Entrega {$exportSource->id} removido ou inválido");
        }

        if (!$planoEntrega->programa){
            throw new ExportPgdException("Plano de Entrega {$exportSource->id} não possui Programa");
        }

        if (!$planoEntrega->unidade){
            throw new ExportPgdException("Plano de Entrega {$exportSource->id} não possui Unidade Executora");
        }

        if (!$planoEntrega->programa->unidade){
            throw new ExportPgdException("Plano de Entrega {$exportSource->id} não possui Unidade Instituidora");
        }

        return $planoEntrega;
    }
}


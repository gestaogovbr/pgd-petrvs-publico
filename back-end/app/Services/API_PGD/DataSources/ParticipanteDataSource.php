<?php
namespace App\Services\API_PGD\DataSources;

use App\Exceptions\ExportPgdException;
use App\Models\Usuario;
use App\Services\API_PGD\ExportSource;

class ParticipanteDataSource extends DataSource
{
    public function getData(ExportSource $exportSource) {

        if (!$exportSource->id){
            throw new ExportPgdException('ID de Usuário não definido');
        }

        $participante = Usuario::with([
                'unidadesIntegrantes' => function($query) {
                    $query->whereHas('atribuicoes', function ($query) {
                        $query
                            ->where('atribuicao', 'LOTADO')
                            ->whereNull('deleted_at');
                    });
                }
            ])
            ->find($exportSource->id);

        if (!$participante){
            throw new ExportPgdException("Usuário {$exportSource->id} inválido ou sem lotação");
        }

        return $participante;
    }
}


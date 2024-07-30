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

        if (!$participante || !$participante->ultimaParticipacaoPrograma){
            throw new ExportPgdException('Usuário sem Participação');
        }

        if (!$participante->ultimoPlanoTrabalho){
            throw new ExportPgdException('Usuário sem Plano de Trabalho');
        }

        if (!$participante->ultimoPlanoTrabalho){
            throw new ExportPgdException('Usuário sem Plano de Trabalho');
        }

        $autorizadora = $participante->ultimaParticipacaoPrograma->programa->unidadeAutorizadora->codigo ?? null;
        
        if (!$autorizadora){
            throw new ExportPgdException('Usuário sem Unidade Autorizadora');
        }

        $unidadeIntegrante = $participante->unidadesIntegrantes->first();

        if (!$unidadeIntegrante || !$unidadeIntegrante->unidade || !$unidadeIntegrante->unidade->codigo){
            throw new ExportPgdException('Usuário não possui unidade de Lotação');
        }

        $dataAssinatura = $participante->ultimoPlanoTrabalho->ultimaAssinatura->data_assinatura ?? null;
        if (!$dataAssinatura){
            throw new ExportPgdException('Usuário não possui assinatura');
        }

        $result = [
            'id' => $participante->id,
            'cod_unidade_autorizadora' => $participante->ultimaParticipacaoPrograma->programa->unidadeAutorizadora->codigo ?? null,
            'cod_unidade_instituidora' => $participante->ultimaParticipacaoPrograma->programa->unidade->codigo ?? null,
            'cod_unidade_lotacao' => $unidadeIntegrante->unidade->codigo ?? null,
            'matricula' => $participante->matricula,
            'cpf' => $participante->cpf,
            'situacao' => $participante->ultimaParticipacaoPrograma->habilitado ?? 0,
            'tipo_modalidade' => $participante->ultimoPlanoTrabalho->tipoModalidade->nome ?? null,
            'data_assinatura' => $data_assinatura ?? null
        ];

        return (object) $result;
    }
}


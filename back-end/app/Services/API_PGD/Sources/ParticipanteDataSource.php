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

        if (!$participante){
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

        $result = [
            'id' => $participante->id,
            'cod_unidade_autorizadora' => $participante->ultimaParticipacaoPrograma->programa->unidadeAutorizadora->codigo ?? null,
            'cod_unidade_instituidora' => $participante->ultimaParticipacaoPrograma->programa->unidade->codigo ?? null,
            'cod_unidade_lotacao' => $participante->unidadesIntegrantes->first()->unidade->codigo ?? null,
            'matricula' => $participante->matricula,
            'cpf' => $participante->cpf,
            'situacao' => $participante->ultimaParticipacaoPrograma->habilitado ?? 0,
            'tipo_modalidade' => $participante->ultimoPlanoTrabalho->tipoModalidade->nome ?? null,
            'data_assinatura' => $participante->ultimoPlanoTrabalho->ultimaAssinatura->data_assinatura ?? null
        ];

        return (object) $result;
    }
}


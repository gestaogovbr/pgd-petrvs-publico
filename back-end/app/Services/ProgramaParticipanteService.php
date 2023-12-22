<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\Programa;
use App\Models\PlanoTrabalho;
use App\Models\ProgramaParticipante;
use App\Models\Usuario;
use App\Services\ServiceBase;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Throwable;

class ProgramaParticipanteService extends ServiceBase {
    public $todos = true; 
    public $lotacao_id = ''; 
    public $programa_id = ''; 

    public function proxyQuery(&$query, &$data) {
        $where = [];
        $todos = $this->extractWhere($data, "todos");
        if(empty($todos) || $todos[2] == false) {
            array_push($where, ["habilitado", "==", 1]);
            $this->todos = false;
        }
        foreach($data["where"] as $condition) {
            if($condition[0] == "usuario.lotacao.unidade.id") $this->lotacao_id = $condition[2];
            if($condition[0] == "programa_id" && !empty($condition[2])) $this->programa_id = $condition[2];
            array_push($where, $condition);
        }
        $data["where"] = $where;
        return $data;
    }

    public function proxyExtra(&$rows, $data, &$count){
        $extra = [];
        if($this->todos && !empty($this->lotacao_id)) {
            $extra = Usuario::with(['lotacao.unidade','planosTrabalho'])->whereHas("unidadesIntegrante", function (Builder $query) {
                $query->where('unidade_id', $this->lotacao_id)->whereHas('atribuicoes', function (Builder $query) {
                    $query->where('atribuicao', 'LOTADO');
                });
            })->get();
            foreach ($extra as $usuario) {
                $fake = (object) [
                    'id' => $this->utilService->uuid(),
                    'created_at' => now(),
                    'updated_at' => now(),
                    'deleted_at' => null,
                    'programa_id' => $this->programa_id,
                    'usuario_id' => $usuario->id
                ];
                $fake->usuario = $usuario;
                $rows->push($fake);
            }       
        }
        $rows->each(function ($item, $key) use ($rows) {
            if(!empty($item?->usuario?->planosTrabalho)) {
                $filtro = $item->usuario->planosTrabalho->filter(function ($item) {
                    return $item->status == 'ATIVO' && UtilService::between(now(),$item->data_inicio,$item->data_fim);
                });
                $item->usuario->planosTrabalho = $filtro;
                $rows[$key] = $item;
            }
        });
        $count = count($rows);
        return null;
    }

    public function habilitar($data)    // ou desabilitar
    {
        try {
            DB::beginTransaction();
            foreach($data['participantes_ids'] as $idp){
                $registro = ProgramaParticipante::firstOrCreate(['programa_id' => $data['programa_id'], 'usuario_id' => $idp]);
                $plano_trabalho_ativo = PlanoTrabalho::where('usuario_id',$idp)->where('programa_id',$data['programa_id'])->where('status','ATIVO')->where('data_inicio','<=',now())->where('data_fim','>=',now())->first();
                if(empty($data['habilitar']) && !empty($plano_trabalho_ativo)) {
                    if(!$data['suspender_plano_trabalho']) throw new ServerException("","Foi identificado que o usuário - " . Usuario::find($idp)->nome . " - possui Plano de Trabalho ATIVO e não foi repassada autorização para suspendê-lo. Portanto, a operação de desabilitação foi abortada " . count($data['participantes_ids']) > 1 ? "para todos os usuários " : "" . "!");
                    //PlanoTrabalho::find($plano_trabalho_ativo->id)->update(['status' => 'SUSPENSO']);
                    $plano_trabalho_ativo->update(['status' => 'SUSPENSO']);
                    // verificar se depende de mais alguma coisa a mudança do status
                }
                $registro->habilitado = $data['habilitar'];
                $registro->save();
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        //$this->notificar($data);
        return true;
    }

    public function quantidadesPlanosTrabalhosAtivo($programasParticipantesIds)
    {
        return ProgramaParticipante::whereIn("id", $programasParticipantesIds)->whereHas('usuario.planosTrabalho', function ($query) {
            return $query->where('status', 'ATIVO')->where('data_inicio', '<=', now())->where('data_fim', '>=', now());
        })->count();
    }

    public function notificar($data)
    {
        $this->notificacoesService->send("PRG_PART_HABILITACAO",
                [
                    "programa" => Programa::find($data['programa_id']),
                    "programa_participante"  => ProgramaParticipante::find($data['participantes_ids'] )
        ]);
    }
}


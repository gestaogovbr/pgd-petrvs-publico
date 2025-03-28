<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\Programa;
use App\Models\PlanoTrabalho;
use App\Models\ProgramaParticipante;
use App\Models\Usuario;
use App\Services\ServiceBase;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;
use Throwable;

class ProgramaParticipanteService extends ServiceBase {

    public function habilitar($data)    // ou desabilitar
    {
        try {
            DB::beginTransaction();
            foreach($data['participantes_ids'] as $idp){
                if($data['habilitar'] == 1) {
                    $programasHabilitados = ProgramaParticipante::where('usuario_id',$idp)->where('habilitado',1)->get();
                    if (!$programasHabilitados->isEmpty()) {
                        $mensagem = (count($data['participantes_ids']) > 1) ? "Agente(s) público(s) já selecionado(s) como participante(s) em outra unidade instituidora. Portanto, a operação de habilitação foi cancelada!" : "Agente público já selecionado como participante em outra unidade instituidora. Portanto, a operação de habilitação foi cancelada!";
                        throw new ServerException(
                            "ValidateProgramaParticipante",
                            $mensagem
                        );
                    }
                }
                
                $registro = ProgramaParticipante::firstOrCreate(['programa_id' => $data['programa_id'], 'usuario_id' => $idp]);
                $plano_trabalho_ativo = PlanoTrabalho::where('usuario_id',$idp)->where('programa_id',$data['programa_id'])->where('status','ATIVO')->first();
                
                if(empty($data['habilitar']) && !empty($plano_trabalho_ativo)) {
                    if(!$data['suspender_plano_trabalho']) throw new ServerException("ValidateProgramaPendencia","O participante: " . Usuario::find($idp)->nome . " não pode ser desligado deste Regramento Institucional, pois há pendências em Plano(s) de Trabalho.", '');
                    $plano_trabalho_ativo->status = 'SUSPENSO';
                    $plano_trabalho_ativo->save();
                }
                $registro->habilitado = $data['habilitar'];
                if($data['habilitar'] == 0) $registro->deleted_at = now();
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

    public function quantidadePlanosTrabalhoAtivos($programasParticipantesIds)
    {
        return ProgramaParticipante::whereIn("usuario_id", $programasParticipantesIds)->whereHas('usuario.planosTrabalho', function ($query) {
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


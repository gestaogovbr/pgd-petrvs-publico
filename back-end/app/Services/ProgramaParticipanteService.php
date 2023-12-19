<?php

namespace App\Services;

use App\Models\Programa;
use App\Models\ProgramaParticipante;
use App\Models\Unidade;
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
vi /etc/resolve.conf
nameserver 8.8.8.8
vi /etc/resolve.conf

    public function proxyExtra(&$rows, $data, &$count){
        $extra = [];

        if($this->todos && !empty($this->lotacao_id)) 
        
        $extra = Usuario::whereHas("lotacao", function (Builder $query) {
            $query->where('unidade_id','==',$this->lotacao_id);
        })->get();

        if($this->todos && !empty($this->lotacao_id)) {
            $extra = Usuario::with('lotacao.unidade')->where('nome', 'like', '%Ricardo%')->get();
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
            $count = count($rows);        
        }
        return null;
    }

    public function habilitar($data)
    {
        try {
            DB::beginTransaction();
            $programaParticipantes = ProgramaParticipante::whereIn("id", $data["participantes_ids"])->get();
            $count = 0;
            foreach ($programaParticipantes as $programaParticipante) {
                $usuarioId = $programaParticipante->usuario_id;
                if (strpos($usuarioId, 'VIRT_') === 0) {
                    $usuarioId = substr($usuarioId, 5);
                }
                $programaParticipante->usuario_id = $usuarioId;
                $programaParticipante->habilitado = $data['habilitado'];
                $programaParticipante->programa_id = $data['programa_id'];
                $programaParticipante->save();
                $count++;
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
    
        $this->notificar($data);
        
        return true;
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


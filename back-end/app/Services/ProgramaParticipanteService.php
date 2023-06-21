<?php

namespace App\Services;

use App\Models\ProgramaParticipante;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Services\ServiceBase;
use App\Traits\UseDataFim;
use Illuminate\Database\Eloquent\Builder;

class ProgramaParticipanteService extends ServiceBase {
    use UseDataFim;
    public $participantes = []; /* Buffer de unidades para funções que fazem consulta frequentes em unidades */
    public $todos = false; 
    public $unidadeId = null; 

    public function proxyQuery(&$query, &$data) {
        $where = [];
        foreach($data["where"] as $condition) {
            if(is_array($condition) && $condition[0] == "usuario.lotacoes.unidade.id") { 
                $query->whereHas('lotacoes', function (Builder $query) use ($condition) {
                    $query->where('unidade_id', $condition[2]);
                });
                $this->unidadeId =  $condition[2];
            } else if (is_array($condition) && $condition[0] == "todos"){
                $this->todos = true;
            } else {
                array_push($where, $condition);
            }
        }
        $data["where"] = $where;
        return $data;
    }

    public function proxyRows($rows, &$data){

        if ($this->todos) {
            /* Se for todos, obter a lista de usuários, 
                 depois verificar quais desses usuários já fazem parte da lista de participantes,
                  os que não fizerem parte instanciar um novo ProgramaParticipante com esse uusuário 
                  e o ID iniciando 'NEW'+usuarioId e habilitado false */
            $usuarios = Usuario::select('usuarios.*')->get();
            $programaParticipantes = [];
            $novoParticipante = [];

            foreach ($rows as $row) {
                $participanteEncontrado = false;
                $usuarioId = $row->usuario_id;
    
                foreach ($usuarios as $usuario) {
                    if ($usuario->id !== $usuarioId) {
                        $participanteEncontrado = false;
                        
                        if (!$participanteEncontrado) {
                            $novoParticipante = new ProgramaParticipante();
                            $novoParticipante->usuario_id = 'VIRT_' . $usuario->id;
                            $novoParticipante->habilitado = false;
                        }
                        $programaParticipantes[] = $novoParticipante;
                    }
                }     
            }
            $rows = $programaParticipantes;
        }
    
        return $rows; // Lista de PRogramaParticipantes, só que contendo registro REAIS  e registros VIRTUAIS iniciados com 'NEW'+usuarioId
    }

    

    public function habilitar($data)
    {
        $programaParticipantes = ProgramaParticipante::whereIn("usuario_id", $data["participantes_ids"])->get();
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
        return $count;
    }
}


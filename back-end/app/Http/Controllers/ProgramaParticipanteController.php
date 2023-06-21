<?php

namespace App\Http\Controllers;

use App\Models\ProgramaParticipante;
use App\Models\Usuario;
use App\Services\ProgramaParticipanteService;
use Illuminate\Http\Request;
use App\Http\Controllers\ControllerBase;
use App\Exceptions\ServerException;

class ProgramaParticipanteController extends ControllerBase {
    
    /* Utilizar as mesmas capacidades do programa */
    public function checkPermissions($action, $request, $service, $unidade, $usuario) {
        switch ($action) {
            case 'STORE':
                if (!$usuario->hasPermissionTo('MOD_PRGT_INCL')) throw new ServerException("CapacidadeStore", "Inserção não executada");
                break;
            case 'UPDATE':
                if (!$usuario->hasPermissionTo('MOD_PRGT_EDT')) throw new ServerException("CapacidadeStore", "Edição não executada");
                break;
            case 'DESTROY':
                if (!$usuario->hasPermissionTo('MOD_PRGT_EXCL')) throw new ServerException("CapacidadeStore", "Exclusão não executada");
                break;
        }
    }

    public function teste(){
        //if ($this->todos) {
            /* Se for todos, obter a lista de usuários, 
                 depois verificar quais desses usuários já fazem parte da lista de participantes,
                  os que não fizerem parte instanciar um novo ProgramaParticipante com esse uusuário 
                  e o ID iniciando 'NEW'+usuarioId e habilitado false */
            $rows = Usuario::whereIn('cpf',['25941933304'])->get();
            $usuarios = Usuario::all();
            foreach($usuarios->reject(function($u) use ($rows) { return in_array($u, $rows); }) as $np){
                $np = new ProgramaParticipante();
                $np->usuario_id = 'VIRT_' . $usuario->id;
                $np->habilitado = false;
            };
            $programaParticipantes = [];
            $novoParticipante = [];

            foreach ($rows as $row) {
                $participanteEncontrado = false;
                $usuarioId = $row->usuario_id;
    

                
                foreach ($usuarios as $usuario) {
                    if ($usuario->id == $usuarioId) {
                        $participanteEncontrado = true;
                        
                        if (!$participanteEncontrado) {
                            $np = new ProgramaParticipante();
                            $np->usuario_id = 'VIRT_' . $usuario->id;
                            $np->habilitado = false;
                        }
                        $programaParticipantes[] = $novoParticipante;
                    }
                }     
            }
            $rows = $programaParticipantes;
       // }
    }
}

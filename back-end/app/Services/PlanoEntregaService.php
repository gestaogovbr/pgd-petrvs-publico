<?php

namespace App\Services;

use App\Models\Unidade;
use App\Models\PlanoEntrega;
use App\Traits\UseDataFim;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Throwable;

class PlanoEntregaService extends ServiceBase
{
    use UseDataFim;

    public $unidades = []; /* Buffer de unidades para funções que fazem consulta frequentes em unidades */


    public function metadados($planoEntrega) {
        if(empty($this->unidades[$planoEntrega->unidade_id])) {
            $this->unidades[$planoEntrega->unidade_id] = Unidade::find($planoEntrega->unidade_id);
        }
        $result = [
            "incluindo" => $planoEntrega->status == 'INCLUINDO',
            "homologando" => $planoEntrega->status == 'HOMOLOGANDO',
            "ativo" => $planoEntrega->status == 'ATIVO',
            "suspenso" => $planoEntrega->status == 'SUSPENSO',
            "concluido" => $planoEntrega->status == 'CONCLUIDO',
            "avaliado" => $planoEntrega->status == 'AVALIADO',
            "arquivado" => !empty($planoEntrega->data_arquivamento),
            "cancelado" => !empty($planoEntrega->data_cancelamento)
        ];
        return $result;
    }

    public function proxyRows($rows){
        foreach($rows as $row){ $row->metadados = $this->metadados($row); }
        return $rows;
    }

    public function liberarHomologacao($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'HOMOLOGANDO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function retirarHomologacao($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'INCLUINDO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function homologar($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'ATIVO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function cancelarHomologacao($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'HOMOLOGANDO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function concluir($data, $unidade){
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'CONCLUIDO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function cancelarConclusao($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'ATIVO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function avaliar($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'AVALIADO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;    
    }

    public function cancelarAvaliacao($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'CONCLUIDO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }

    public function reativar($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            $this->update([
                "id" => $planoEntrega->id,
                "status" => 'ATIVO',
            ], $unidade, false);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;    
    }
    
    public function arquivar($data, $unidade) {
        try {
            DB::beginTransaction();
            $planoEntrega = PlanoEntrega::find($data["id"]);
            if(!empty($planoEntrega)) {
                $this->update([
                    "id" => $planoEntrega->id,
                    "data_arquivamento" => $data["arquivar"] ? Carbon::now() : null
                ], $unidade, false);
            } else {
                throw new ServerException("ValidatePlano", "Plano de Entrega não encontrado!");
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollback();
            throw $e;
        }
        return true;
    }


}

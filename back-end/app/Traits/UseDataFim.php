<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;
use Exception;

trait UseDataFim
{
    private function whereDataFimNull(&$data) {
        if(isset($data['where']) && count($data['where']) > 0) {
            if(gettype($data['where'][0]) == "string") {
                $data['where'] = [["data_fim", "==", null], $data['where']];
            } else {
                $data['where'][] = ["data_fim", "==", null];
            }
        } else {
            $data['where'] = [["data_fim", "==", null]];
        }
    }

    public function searchText($data) {
        $this->whereDataFimNull($data);
        return parent::searchText($data);
    }

    public function query($data) {
        $this->whereDataFimNull($data);
        return parent::query($data);
    }

    public function destroy($id, $transaction = true) {
        $model = $this->getModel();
        $entity = $model::find($id);
        if(isset($entity)) {
            if(!property_exists($entity, 'has_data_fim')) {
                throw new Exception("Entidade " . get_class($entity) . " não possui trait HasDataFim");
            }
            return parent::destroy($id, $transaction);
            /*try {
                if($transaction) DB::beginTransaction();
                $entity->data_fim = date("Y-m-d H:i:s");
                $entity->save();
                if($transaction) DB::commit();
                return true;
            } catch (Throwable $e) {
                if($transaction) DB::rollback();
                throw $e;
            }*/
        } else {
            throw new Exception("Id não encontrado");
        }
    }
}
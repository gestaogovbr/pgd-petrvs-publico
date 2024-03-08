<?php

namespace App\Services;

use App\Models\Programa;
use App\Models\Unidade;
use App\Models\Usuario;
use App\Models\PlanoTrabalho;
use App\Services\ServiceBase;
use App\Exceptions\ServerException;

class ProgramaService extends ServiceBase {

    public function proxyQuery(&$query, &$data) {
        $where = [];
        $vigentesUnidadeExecutora = $this->extractWhere($data, "vigentesUnidadeExecutora");
        $todosUnidadeExecutora = $this->extractWhere($data, "todosUnidadeExecutora");

        if(!empty($vigentesUnidadeExecutora)) {
            $unidadesIds = $this->unidadeService->linhaAscendente($vigentesUnidadeExecutora[2]);
            $unidadesIds[] = $vigentesUnidadeExecutora[2];
            array_push($where, ['unidade_id', 'in', $unidadesIds]);
            array_push($where, ['data_inicio', '<=', now()]);
            array_push($where, ['data_fim', '>=', now()]);
        }
        if(!empty($todosUnidadeExecutora)){
            $unidadesIds = $this->unidadeService->linhaAscendente($todosUnidadeExecutora[2]);
            $unidadesIds[] = $todosUnidadeExecutora[2];
            array_push($where, ['unidade_id', 'in', $unidadesIds]);
        }

        foreach($data["where"] as $condition) array_push($where, $condition);
        $data["where"] = $where;
    }

    public function proxySearch(&$query, &$data, &$text) {
        $where = [];
        $vigentesUnidadeExecutora = $this->extractWhere($data, "vigentesUnidadeExecutora");
        if(!empty($vigentesUnidadeExecutora)) {
            array_push($where, ['unidade.path', 'like', '%' . $vigentesUnidadeExecutora[2] . '%']);
            array_push($where, ['data_inicio', '<=', now()]);
            array_push($where, ['data_fim', '>=', now()]);
        }
        foreach($data["where"] as $condition) array_push($where, $condition);
        $data["where"] = $where;
    }

    public function proxyRows($rows){
        if (!$rows->isEmpty()) {
            $ultimoPrograma = $rows->last();
            $rows = $rows->filter(function ($row) use ($ultimoPrograma) {
                return $row->unidade_id === $ultimoPrograma->unidade_id;
            })->values();
        }
        return $rows;        
    }

 }
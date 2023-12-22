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
        if(!empty($vigentesUnidadeExecutora)) {
            array_push($where, ['unidade.path', 'like', '%' . $vigentesUnidadeExecutora[2] . '%']);
            array_push($where, ['data_inicio', '<=', now()]);
            array_push($where, ['data_fim', '>=', now()]);
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

 }
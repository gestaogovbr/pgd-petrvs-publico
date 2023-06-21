<?php

namespace App\Services;

use App\Models\Unidade;
use App\Services\ServiceBase;
use App\Traits\UseDataFim;

class TemplateService extends ServiceBase {

    use UseDataFim;

    public function proxyQuery($query, &$data) {
        if(!empty(array_filter($data["where"], fn($v) => $v[0] == 'especie' && $v[2] == 'NOTIFICACAO'))) {
            $where = [];
            foreach ($data["where"] as $condition) {
              if (is_array($condition) && $condition[0] == "unidade_id") {
                $unidade = Unidade::find($condition[2]);
                $where[] = ["or", ["entidade_id", "==", $unidade?->entidade_id], $condition];
              } else {
                $where[] = $condition;
              }
            }
            $data["where"] = $where;
        }
    }

    public function proxyExtra($rows, $data) {
        $result = null; 
        if(!empty(array_filter($data["where"], fn($v) => $v[0] == 'especie' && $v[2] == 'NOTIFICACAO'))) {
            $result["notificacoes"] = [];
            $keys = array_keys($this->NotificacoesService->notificacoes);
            foreach($keys as $key) {
                $value = $this->NotificacoesService->notificacoes[$key];
                $result["notificacoes"][] = [
                    "codigo" => $key,
                    "descricao" => $value["descricao"],
                    "dataset" => $value["dataset"],
                    "template" => $value["template"]
                ];
            }
            $config = config("notificacoes");
            $result["notifica_enviroment"] = [
                "petrvs" => $config["petrvs"]["enviar"],
                "email" => $config["email"]["enviar"],
                "whatsapp" => $config["whatsapp"]["enviar"]
            ];
        }
        return $result;
    }

}


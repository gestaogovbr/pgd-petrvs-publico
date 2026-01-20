<?php

namespace App\Services;

use App\Exceptions\ServerException;
use App\Models\PlanoTrabalho;
use App\Services\ServiceBase;

class OcorrenciaService extends ServiceBase {

    public function validateStore($data, $unidade, $action)
    {
        if(!empty($data["plano_trabalho_id"])) {
            $planoTrabalho = PlanoTrabalho::find($data["plano_trabalho_id"]);
            $between = UtilService::asTimestamp($planoTrabalho->data_inicio) <= UtilService::asTimestamp($data["data_fim"]) && UtilService::asTimestamp($planoTrabalho->data_fim) >= UtilService::asTimestamp($data["data_inicio"]);
            if(empty($planoTrabalho)) throw new ServerException("ValidateOcorrencia", "Plano de trabalho da ocorrência não encontrado");
            /* RN_OCOR_1 */
            if($planoTrabalho->usuario_id != $data["usuario_id"]) throw new ServerException("ValidateOcorrencia", "Usuário do Plano de Trabalho deve obrigatoriamente ser o mesmo da ocorrência. [RN_OCOR_1]");
            /* RN_OCOR_2 */
            if(!$between) throw new ServerException("ValidateOcorrencia", "Ocorrência vinculada a plano de trabalho deverá ter algum perído coincidente com o do plano. (de " . UtilService::getDateFormatted($planoTrabalho->data_inicio) . " à " . UtilService::getDateFormatted($planoTrabalho->data_fim) . ") [RN_OCOR_2]");
        }
    }

}
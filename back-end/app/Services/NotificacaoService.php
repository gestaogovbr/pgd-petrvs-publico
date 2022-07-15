<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use DateTime;
use App\Services\WhatsappService;
use App\Mails\NotificacaoMail;
use App\Exceptions\LogError;
use App\Models\Usuario;
use App\Models\NotificacaoWhatsapp;
use Exception;
use Illuminate\Support\Facades\Mail as LaravelMail;

class NotificacaoService 
{


    public function sendDemandaDistribuicao($demanda) {
        try {
            $entidade_notificacoes = $demanda->unidade->entidade->notificacoes; 
            $unidade_notificacoes = $demanda->unidade->notificacoes;
            if($entidade_notificacoes["notifica_demanda_distribuicao"] && $unidade_notificacoes["notifica_demanda_distribuicao"] && !empty($demanda->usuario_id)) {
                $text = empty($unidade_notificacoes["template_demanda_distribuicao"]) ? $entidade_notificacoes["template_demanda_distribuicao"] : $unidade_notificacoes["template_demanda_distribuicao"];
                $this->applyParams($text, ["demanda_numero" => $demanda->numero]);
                $this->send($demanda->usuario, $demanda->unidade, $text, "notifica_demanda_distribuicao");
            }
        } catch (Throwable $e) {
            LogError::newError("Erro ao enviar notificação de distribuição de demanda", $e, ["usuario_id" => $demanda->usuario_id, "unidade_id" => $demanda->unidade_id], false);
        }
    }

    public function findByPhone($data) {
        try {
            $com9 = strlen($data["telefone"]) == 11 ? $data["telefone"] : substr($data["telefone"], 0, 2) . "9" . substr($data["telefone"], 2);
            $sem9 = strlen($data["telefone"]) == 10 ? $data["telefone"] : substr($data["telefone"], 0, 2) . substr($data["telefone"], 3);
            $usuario = Usuario::whereRaw("REGEXP_REPLACE(telefone, '[^0-9]', '') IN (:sem9, :com9)", ["sem9" => $sem9, "com9" => $com9])->first();
            if(isset($usuario)) {
                return $usuario;
            } else {
                throw new Exception('Usuário não encontrado');
            }
        } catch (Throwable $e) {
            LogError::newError($e->getMessage(), $e, ["telefone" => $data["telefone"]]);
        }
    }

    public function findSession($data)
    {
        try {
            $usuario = $this->findByPhone($data);
            $session = NotificacaoWhatsapp::where("usuario_id", $data["usuario_id"])->whereRaw("DATE_ADD(ultima_interacao, INTERVAL 30 MINUTE) > NOW() && finalizacao IS NULL")->first();
            return [
                "usuario" => $usuario,
                "session" => isset($session) ? $session->atual : null
            ];
        } catch (Throwable $e) {
            LogError::newError($e->getMessage(), $e, ["telefone" => $data["telefone"]]);
        }
    }



}

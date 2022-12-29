<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use DateTime;
use App\Services\WhatsappService;
use App\Mails\NotificacaoMail;
use App\Exceptions\LogError;
use Illuminate\Support\Facades\Mail as LaravelMail;

class NotificacoesService 
{

    public function checkNotifica($usuario, $notifica) {
        return !isset($usuario->notificacoes[$notifica]) || $usuario->notificacoes[$notifica];
    }

    public function send($usuario, $unidade, $mensagem, $notifica = null) {
        if(empty($notifica) || $this->checkNotifica($usuario, $notifica)) {
            $config = config("notificacoes");
            $entidade = $unidade->entidade;
            if($config["email"]["enviar"] && $usuario->notificacoes["enviar_email"] && $unidade->notificacoes["enviar_email"] && $entidade->notificacoes["enviar_email"] && !empty($usuario->email)) {
                try {
                    LaravelMail::to($usuario->email)->send(new NotificacaoMail($mensagem, $config["email"]["signature"]));
                } catch (\Throwable $e) {
                    LogError::newError("Erro ao enviar e-mail de notificação", $e, ["usuario_id" => $usuario->id, "unidade_id" => $unidade->id, "email" => $usuario->email, "mensagem" => $mensagem], false);
                }
            }
            if($config["whatsapp"]["enviar"] && $usuario->notificacoes["enviar_whatsapp"] && $unidade->notificacoes["enviar_whatsapp"] && $entidade->notificacoes["enviar_whatsapp"] && !empty($usuario->telefone)) {
                try {
                    WhatsappService::sendMessage($usuario->telefone, $mensagem);
                } catch (\Throwable $e) {
                    LogError::newError("Erro ao enviar mensagem Whatsapp de notificação", $e, ["usuario_id" => $usuario->id, "unidade_id" => $unidade->id, "telefone" => $usuario->telefone, "mensagem" => $mensagem], false);
                }
            }
        }
    }

    public function applyParams(&$text, $params) {
        foreach($params as $param => $value) $text = str_replace("{{" . $param . "}}", strval($value), $text);
        return $text;
    }
    
    public function sendDemandaDistribuicao($demanda) {
        try {
            $entidade_notificacoes = $demanda->unidade->entidade->notificacoes; 
            $unidade_notificacoes = $demanda->unidade->notificacoes;
            if($entidade_notificacoes["notifica_demanda_distribuicao"] && $unidade_notificacoes["notifica_demanda_distribuicao"] && !empty($demanda->usuario_id)) {
                $text = empty($unidade_notificacoes["template_demanda_distribuicao"]) ? $entidade_notificacoes["template_demanda_distribuicao"] : $unidade_notificacoes["template_demanda_distribuicao"];
                $this->applyParams($text, ["demanda_numero" => $demanda->numero]);
                $this->send($demanda->usuario, $demanda->unidade, $text, "notifica_demanda_distribuicao");
            }
        } catch (\Throwable $e) {
            LogError::newError("Erro ao enviar notificação de distribuição de demanda", $e, ["usuario_id" => $demanda->usuario_id, "unidade_id" => $demanda->unidade_id], false);
        }
    }

    public function sendDemandaConclusao($demanda) {
        try {
            $entidade_notificacoes = $demanda->unidade->entidade->notificacoes; 
            $unidade_notificacoes = $demanda->unidade->notificacoes;
            if($unidade_notificacoes["notifica_demanda_conclusao"] && $entidade_notificacoes["notifica_demanda_conclusao"]) {
                $text = empty($unidade_notificacoes["template_demanda_conclusao"]) ? $entidade_notificacoes["template_demanda_conclusao"] : $unidade_notificacoes["template_demanda_conclusao"];
                $this->applyParams($text, ["demanda_numero" => $demanda->numero, "demanda_responsavel" => $demanda->usuario->nome]);
                $this->send($demanda->demandante, $demanda->unidade, $text, "notifica_demanda_conclusao");
            }
        } catch (\Throwable $e) {
            LogError::newError("Erro ao enviar notificação de conclusão da demanda", $e, ["usuario_id" => $demanda->usuario_id, "unidade_id" => $demanda->unidade_id], false);
        }
    }

    public function sendDemandaAvaliacao($demanda) {
        try {
            $entidade_notificacoes = $demanda->unidade->entidade->notificacoes; 
            $unidade_notificacoes = $demanda->unidade->notificacoes;
            if($entidade_notificacoes["notifica_demanda_avaliacao"] && $unidade_notificacoes["notifica_demanda_avaliacao"]) {
                $text = empty($unidade_notificacoes["template_demanda_avaliacao"]) ? $entidade_notificacoes["template_demanda_avaliacao"] : $unidade_notificacoes["template_demanda_avaliacao"];
                $this->applyParams($text, ["demanda_numero" => $demanda->numero]);
                $this->send($demanda->usuario, $demanda->unidade, $text, "notifica_demanda_conclusao");
            }
        } catch (\Throwable $e) {
            LogError::newError("Erro ao enviar notificação de avaliação de demanda", $e, ["usuario_id" => $demanda->usuario_id, "unidade_id" => $demanda->unidade_id], false);
        }
    }

    public function sendDemandaModificacao($demanda) {
        try {
            $entidade_notificacoes = $demanda->unidade->entidade->notificacoes; 
            $unidade_notificacoes = $demanda->unidade->notificacoes;
            if($entidade_notificacoes["notifica_demanda_modificacao"] && $unidade_notificacoes["notifica_demanda_modificacao"]) {
                $text = empty($unidade_notificacoes["template_demanda_modificacao"]) ? $entidade_notificacoes["template_demanda_modificacao"] : $unidade_notificacoes["template_demanda_modificacao"];
                $this->applyParams($text, ["demanda_numero" => $demanda->numero, "demanda_responsavel" => $demanda->usuario->nome]);
                $this->send($demanda->demandante, $demanda->unidade, $text, "notifica_demanda_modificacao");
                $this->send($demanda->usuario, $demanda->unidade, $text, "notifica_demanda_modificacao");
            }
        } catch (\Throwable $e) {
            LogError::newError("Erro ao enviar notificação de modificação da demanda", $e, ["usuario_id" => $demanda->usuario_id, "unidade_id" => $demanda->unidade_id], false);
        }
    }

    public function sendDemandaComentario($demanda) {
        try {
            $entidade_notificacoes = $demanda->unidade->entidade->notificacoes; 
            $unidade_notificacoes = $demanda->unidade->notificacoes;
            if($entidade_notificacoes["notifica_demanda_comentario"] && $unidade_notificacoes["notifica_demanda_comentario"]) {
                $text = empty($unidade_notificacoes["template_demanda_comentario"]) ? $entidade_notificacoes["template_demanda_comentario"] : $unidade_notificacoes["template_demanda_comentario"];
                $this->applyParams($text, ["demanda_numero" => $demanda->numero, "demanda_responsavel" => $demanda->usuario->nome]);
                $this->send($demanda->demandante, $demanda->unidade, $text, "notifica_demanda_comentario");
                $this->send($demanda->usuario, $demanda->unidade, $text, "notifica_demanda_comentario");
            }
        } catch (\Throwable $e) {
            LogError::newError("Erro ao enviar notificação de comentario na demanda", $e, ["usuario_id" => $demanda->usuario_id, "unidade_id" => $demanda->unidade_id], false);
        }
    }

}

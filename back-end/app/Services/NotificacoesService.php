<?php

namespace App\Services;


use App\Jobs\ProcessEmails;
use App\Models\Notificacao;
use App\Models\NotificacaoDestinatario;


class NotificacoesService 
{

    public $notificacoes = [];

    public function __construct() {
        /* Foi necessário inicializar a variável no construtor devido a um BUG do php */
        $this->notificacoes = [
            "DMD_DISTRIBUICAO" => [
                "descricao" => "Notificação de distribuição da demanda",
                "destinatarios" => (fn(&$params) => [$params["demanda"]->usuario]),
                "unidade" => (fn(&$params) => $params["demanda"]->unidade),
                "validacao" => (fn(&$params) => !empty($params["demanda"]->usuario_id)),
                "dataset" => [["field" => "demanda_numero", "label" => "Número da demanda"]],
                "datasource" => (fn(&$params) => ["demanda_numero" => $params["demanda"]->numero]),
                "template" => "Uma nova demanda foi atribuída a você, acesse o PETRVS para visualizá-la! (ID: #{{demanda_numero}})"
            ],
            "DMD_MODIFICACAO" => [
                "descricao" => "Notificação de modificações na demanda",
                "destinatarios" => (fn(&$params) => [$params["demanda"]->usuario, $params["demanda"]->demandante]),
                "unidade" => (fn(&$params) => $params["demanda"]->unidade),
                "validacao" => (fn(&$params) => true),
                "dataset" => [["field" => "demanda_numero", "label" => "Número da demanda"], ["field" => "demanda_responsavel", "label" => "Nome do responsável pela demanda"]],
                "datasource" => (fn(&$params) => ["demanda_numero" => $params["demanda"]->numero, "demanda_responsavel" => $params["demanda"]->usuario->nome]),
                "template" => "A demanda #{{demanda_numero}}, atribuída à {{demanda_responsavel}}, foi atualizada, acesse o PETRVS para visualizá-la!"
            ],         
            "DMD_COMENTARIO" => [
                "descricao" => "Notificação de comentário na demanda",
                "destinatarios" => (fn(&$params) => [$params["demanda"]->usuario, $params["demanda"]->demandante]),
                "unidade" => (fn(&$params) => $params["demanda"]->unidade),
                "validacao" => (fn(&$params) => true),
                "dataset" => [["field" => "demanda_numero", "label" => "Número da demanda"], ["field" => "demanda_responsavel", "label" => "Nome do responsável pela demanda"]],
                "datasource" => (fn(&$params) => ["demanda_numero" => $params["demanda"]->numero, "demanda_responsavel" => $params["demanda"]->usuario->nome]),
                "template" => "Foi inserido um comentário na demanda #{{demanda_numero}}, atribuída a {{demanda_responsavel}}, acesse o PETRVS para visualizá-la!"
            ],         
            "DMD_CONCLUSAO" => [
                "descricao" => "Notificação de conclusão da demanda",
                "destinatarios" => (fn(&$params) => [$params["demanda"]->demandante]),
                "unidade" => (fn(&$params) => $params["demanda"]->unidade),
                "validacao" => (fn(&$params) => true),
                "dataset" => [["field" => "demanda_numero", "label" => "Número da demanda"], ["field" => "demanda_responsavel", "label" => "Nome do responsável pela demanda"]],
                "datasource" => (fn(&$params) => ["demanda_numero" => $params["demanda"]->numero, "demanda_responsavel" => $params["demanda"]->usuario->nome]),
                "template" => "A demanda #{{demanda_numero}}, atribuída à\ao {{demanda_responsavel}}, foi concluída, acesse o PETRVS para visualizá-la!"
            ],         
            "DMD_AVALIACAO" => [
                "descricao" => "Notificação de avaliação da demanda",
                "destinatarios" => (fn(&$params) => [$params["demanda"]->usuario]),
                "unidade" => (fn(&$params) => $params["demanda"]->unidade),
                "validacao" => (fn(&$params) => true),
                "dataset" => [["field" => "demanda_numero", "label" => "Número da demanda"]],
                "datasource" => (fn(&$params) => ["demanda_numero" => $params["demanda"]->numero]),
                "template" => "Sua demanda #{{demanda_numero}} foi avaliada, acesse o PETRVS para avaliá-la!"
            ],
            "PRG_PART_HABILITACAO" => [
                "descricao" => "Notificação de habilitação do participante",
                "destinatarios" => (fn(&$params) => [$params["programa_participante"]->usuario]),
                "unidade" => (fn(&$params) => $params["programa"]->unidade),
                "validacao" => (fn(&$params) => true),
                "dataset" => [["field" => "programa_nome", "label" => "Nome do Programa"]],
                "datasource" => (fn(&$params) => ["programa_nome" => $params["programa"]->nome]),
                "template" => "Você foi habilitado no programa {{programa_nome}}, acesse o PETRVS para continuar o seu trabalho!"
            ]
        ];
    }

    public function getOrDefault($key, $array, $default = true) {
        return !array_key_exists($key, $array) ? $default : $array[$key];
    }

    public function send($code, $params, $unidade = null) {
        $notificacaoDef = $this->getOrDefault($code, $this->notificacoes, null);
        if(!empty($notificacaoDef)) {
            $destinatarios = $notificacaoDef["destinatarios"]($params);
            $unidade = $unidade ?? $notificacaoDef["unidade"]($params);
            $entidade = $unidade?->entidade;
            $notificacaoEntidade = $entidade?->notificacoesTemplates->where("codigo", $code)->first() ?? ["enviar" => true, "template" => null]; //$this->getOrDefault($code, $entidade?->notificacoes || [], ["enviar" => true, "template" => null]);
            $notificacaoUnidade = $unidade?->notificacoesTemplates->where("codigo", $code)->first() ?? ["enviar" => true, "template" => null]; //$this->getOrDefault($code, $unidade?->notificacoes || [], ["enviar" => true, "template" => null]);
            $template = $notificacaoUnidade["template"] ?? $notificacaoEntidade["template"] ?? $notificacaoDef["template"];
            $message = $this->applyParams($template, $notificacaoDef["datasource"]($params));
            if(!empty($entidade) && $notificacaoEntidade["enviar"] && $notificacaoUnidade["enviar"]) {
                $config = config("notificacoes");
                $notificacao = new Notificacao([
                    "codigo" => $code,
                    "data_registro" => now(),
                    "mensagem" => $message
                ]);
                $notificacao->save();
                foreach($destinatarios as $destinatario) {
                    if($config["petrvs"]["enviar"] && $this->getOrDefault("enviar_petrvs", $destinatario->notificacoes)) {
                        NotificacaoDestinatario::create([
                            "tipo" => "petrvs",
                            "notificacao_id" => $notificacao->id,
                            "usuario_id" => $destinatario->id
                        ]);
                    }
                    if($config["email"]["enviar"] && $this->getOrDefault("enviar_email", $destinatario->notificacoes)) {
                        $email = NotificacaoDestinatario::create([
                            "tipo" => "email",
                            "notificacao_id" => $notificacao->id,
                            "usuario_id" => $destinatario->id
                        ]);
                        $email->save();
                        $details = [
                            "tenant" => tenant('id'),
                            "email" => $destinatario->email,
                            "message" => $message,
                            "notificacao_destinatario_id" => $email->id,
                            "signature" => config("notificacoes.email.signature") ?? ""
                        ];
                        ProcessEmails::dispatchSync($details);
                    }
                    if($config["whatsapp"]["enviar"] && $this->getOrDefault("enviar_whatsapp", $destinatario->notificacoes)) {
                        NotificacaoDestinatario::create([
                            "tipo" => "whatsapp",
                            "notificacao_id" => $notificacao->id,
                            "usuario_id" => $destinatario->id
                        ]);
                        //strip_tags() -> Remove as TAGS html do texto
                    }
                }
            }
        }
        /*
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
        }*/
    }

    public function applyParams(&$text, $params) {
        foreach($params as $param => $value) $text = str_replace("{{" . $param . "}}", strval($value), $text);
        return $text;
    }

    /*public function sendDemandaDistribuicao($demanda) {
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
    }*/

}

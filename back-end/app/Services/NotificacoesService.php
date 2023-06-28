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
                            "tipo" => "PETRVS",
                            "notificacao_id" => $notificacao->id,
                            "usuario_id" => $destinatario->id
                        ])->save();
                    }
                    if($config["email"]["enviar"] && $this->getOrDefault("enviar_email", $destinatario->notificacoes)) {
                        $email = NotificacaoDestinatario::create([
                            "tipo" => "EMAIL",
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
                        ProcessEmails::dispatch($details);
                    }
                    if($config["whatsapp"]["enviar"] && $this->getOrDefault("enviar_whatsapp", $destinatario->notificacoes)) {
                        NotificacaoDestinatario::create([
                            "tipo" => "WHATSAPP",
                            "notificacao_id" => $notificacao->id,
                            "usuario_id" => $destinatario->id
                        ])->save();
                        //strip_tags() -> Remove as TAGS html do texto
                    }
                }
            }
        }
    }

    public function applyParams(&$text, $params) {
        foreach($params as $param => $value) $text = str_replace("{{" . $param . "}}", strval($value), $text);
        return $text;
    }

}

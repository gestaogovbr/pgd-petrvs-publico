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
                "descricao" => "Notificação de distribuição da atividade",
                "destinatarios" => (fn(&$params) => [$params["atividade"]->usuario]),
                "unidade" => (fn(&$params) => $params["atividade"]->unidade),
                "validacao" => (fn(&$params) => !empty($params["atividade"]->usuario_id)),
                "dataset" => [["field" => "atividade_numero", "label" => "Número da atividade"]],
                "datasource" => (fn(&$params) => ["atividade_numero" => $params["atividade"]->numero]),
                "template" => "Uma nova atividade foi atribuída a você, acesse o PETRVS para visualizá-la! (ID: #{{atividade_numero}})"
            ],
            "DMD_MODIFICACAO" => [
                "descricao" => "Notificação de modificações na atividade",
                "destinatarios" => (fn(&$params) => [$params["atividade"]->usuario, $params["atividade"]->atividadente]),
                "unidade" => (fn(&$params) => $params["atividade"]->unidade),
                "validacao" => (fn(&$params) => true),
                "dataset" => [["field" => "atividade_numero", "label" => "Número da atividade"], ["field" => "atividade_responsavel", "label" => "Nome do responsável pela atividade"]],
                "datasource" => (fn(&$params) => ["atividade_numero" => $params["atividade"]->numero, "atividade_responsavel" => $params["atividade"]->usuario->nome]),
                "template" => "A atividade #{{atividade_numero}}, atribuída à {{atividade_responsavel}}, foi atualizada, acesse o PETRVS para visualizá-la!"
            ],         
            "DMD_COMENTARIO" => [
                "descricao" => "Notificação de comentário na atividade",
                "destinatarios" => (fn(&$params) => [$params["atividade"]->usuario, $params["atividade"]->atividadente]),
                "unidade" => (fn(&$params) => $params["atividade"]->unidade),
                "validacao" => (fn(&$params) => true),
                "dataset" => [["field" => "atividade_numero", "label" => "Número da atividade"], ["field" => "atividade_responsavel", "label" => "Nome do responsável pela atividade"]],
                "datasource" => (fn(&$params) => ["atividade_numero" => $params["atividade"]->numero, "atividade_responsavel" => $params["atividade"]->usuario->nome]),
                "template" => "Foi inserido um comentário na atividade #{{atividade_numero}}, atribuída a {{atividade_responsavel}}, acesse o PETRVS para visualizá-la!"
            ],         
            "DMD_CONCLUSAO" => [
                "descricao" => "Notificação de conclusão da atividade",
                "destinatarios" => (fn(&$params) => [$params["atividade"]->atividadente]),
                "unidade" => (fn(&$params) => $params["atividade"]->unidade),
                "validacao" => (fn(&$params) => true),
                "dataset" => [["field" => "atividade_numero", "label" => "Número da atividade"], ["field" => "atividade_responsavel", "label" => "Nome do responsável pela atividade"]],
                "datasource" => (fn(&$params) => ["atividade_numero" => $params["atividade"]->numero, "atividade_responsavel" => $params["atividade"]->usuario->nome]),
                "template" => "A atividade #{{atividade_numero}}, atribuída à\ao {{atividade_responsavel}}, foi concluída, acesse o PETRVS para visualizá-la!"
            ],         
            "DMD_AVALIACAO" => [
                "descricao" => "Notificação de avaliação da atividade",
                "destinatarios" => (fn(&$params) => [$params["atividade"]->usuario]),
                "unidade" => (fn(&$params) => $params["atividade"]->unidade),
                "validacao" => (fn(&$params) => true),
                "dataset" => [["field" => "atividade_numero", "label" => "Número da atividade"]],
                "datasource" => (fn(&$params) => ["atividade_numero" => $params["atividade"]->numero]),
                "template" => "Sua atividade #{{atividade_numero}} foi avaliada, acesse o PETRVS para avaliá-la!"
            ],
            "PRG_PART_HABILITACAO" => [
                "descricao" => "Notificação de habilitação do participante",
                "destinatarios" => (fn(&$params) => [$params["programa_participante"]->usuario]),
                "unidade" => (fn(&$params) => $params["programa"]->unidade),
                "validacao" => (fn(&$params) => true),
                "dataset" => [["field" => "programa_nome", "label" => "Nome do Programa"]],
                "datasource" => (fn(&$params) => ["programa_nome" => $params["programa"]->nome]),
                "template" => "Você foi habilitado no programa {{programa_nome}}.  Acesse o PETRVS para continuar o seu trabalho!"
            ],
            "PENT_ALTERACAO" => [
                "descricao" => "Notificação de alteração no plano de entregas",
                "destinatarios" => (fn(&$params) => $params["destinatarios"]),
                "unidade" => (fn(&$params) => $params["plano_entrega"]->unidade),
                "validacao" => (fn(&$params) => true),
                "dataset" => [["field" => "plano_numero", "label" => "Número do plano de entregas"],["field" => "servidor_nome", "label" => "Nome do Servidor"],["field" => "servidor_matricula", "label" => "Matrícula do Servidor"]],
                "datasource" => (fn(&$params) => ["plano_numero" => $params["plano_entrega"]->numero, "servidor_nome" => $params["servidor"]->nome, "servidor_matricula" => $params["servidor"]->matricula]),
                "template" => "O plano de entregas #{{ plano_numero }} foi alterado nesta data pelo servidor {{ servidor_nome }}, matricula {{ servidor_matricula }}."
            ]
        ];
    }

    public function getOrDefault($key, $array, $default = true) {
        return !array_key_exists($key, $array) ? $default : $array[$key];
    }

    public function send($code, $params, $unidade = null) {
        $notificacaoDef = $this->getOrDefault($code, $this->notificacoes, null);
        if(!empty($notificacaoDef)) {
            $enviados = [
                "petrvs" => [],
                "email" => [],
                "whatsapp" => []
            ];
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
                    if($config["petrvs"]["enviar"] && $this->getOrDefault("enviar_petrvs", $destinatario->notificacoes) && !in_array($destinatario->id, $enviados["petrvs"])) {
                        NotificacaoDestinatario::create([
                            "tipo" => "PETRVS",
                            "notificacao_id" => $notificacao->id,
                            "usuario_id" => $destinatario->id
                        ])->save();
                        $enviados["petrvs"][] = $destinatario->id;
                    }
                    if($config["email"]["enviar"] && $this->getOrDefault("enviar_email", $destinatario->notificacoes) && !in_array($destinatario->email, $enviados["email"])) {
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
                        $enviados["email"][] = $destinatario->email;
                        ProcessEmails::dispatch($details);
                    }
                    if($config["whatsapp"]["enviar"] && $this->getOrDefault("enviar_whatsapp", $destinatario->notificacoes) && !in_array($destinatario->telefone, $enviados["whatsapp"])) {
                        NotificacaoDestinatario::create([
                            "tipo" => "WHATSAPP",
                            "notificacao_id" => $notificacao->id,
                            "usuario_id" => $destinatario->id
                        ])->save();
                        $enviados["whatsapp"][] = $destinatario->telefone;
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

<?php

namespace App\Enums;

enum SequenceType: string
{
    case TEMPLATE = 'sequence_template_numero';
    case PLANO_ENTREGA = 'sequence_plano_entrega_numero';
    case PLANO_TRABALHO = 'sequence_plano_trabalho_numero';
    case PROJETO = 'sequence_projeto_numero';
    case DOCUMENTO = 'sequence_documento_numero';
    case ATIVIDADE = 'sequence_atividade_numero';
    case NOTIFICACAO = 'sequence_notificacao_numero';

    public function table(): string
    {
        return match ($this) {
            self::TEMPLATE => 'templates',
            self::PLANO_ENTREGA => 'planos_entregas',
            self::PLANO_TRABALHO => 'planos_trabalhos',
            self::PROJETO => 'projetos',
            self::DOCUMENTO => 'documentos',
            self::ATIVIDADE => 'atividades',
            self::NOTIFICACAO => 'notificacoes',
        };
    }

    public function column(): string
    {
        return match ($this) {
            self::TEMPLATE => 'template_numero',
            self::PLANO_ENTREGA => 'plano_entrega_numero',
            self::PLANO_TRABALHO => 'plano_trabalho_numero',
            self::PROJETO => 'projeto_numero',
            self::DOCUMENTO => 'documento_numero',
            self::ATIVIDADE => 'atividade_numero',
            self::NOTIFICACAO => 'notificacao_numero',
        };
    }
}

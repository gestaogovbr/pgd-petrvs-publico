import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { NotificacaoDestinatario } from './notificacao-destinatario.model';
import { Template } from './template.model';

export class NotificacoesConfig {
    enviar_petrvs: boolean = true;
    enviar_email: boolean = true;
    enviar_whatsapp: boolean = true;
    nao_notificar: string[] = [];
}

export type NotificacaoCodigo = "UNKNOW" | "DMD_DISTRIBUICAO" | "DMD_MODIFICACAO" | "DMD_COMENTARIO" | "DMD_CONCLUSAO" | "DMD_AVALIACAO";

export interface HasNotificacao {
    id: string;
    notificacoes: NotificacoesConfig
    notificacoes_templates?: Template[];
}

export class Notificacao extends Base {
    public codigo: NotificacaoCodigo = "UNKNOW"; // Código da mensagem;
    public data_registro: Date = new Date(); // Data e hora da inclusão da mensgaem
    public mensagem: string = ""; // Mensagem
    public numero: number = 0; // Número da mensagem (Gerado pelo sistema)
    public destinatarios: NotificacaoDestinatario[] = [];

    public constructor(data?: any) { super(); this.initialization(data); }
}
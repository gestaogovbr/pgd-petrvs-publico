import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { Notificacao } from './notificacao.model';
import { Usuario } from './usuario.model';

export type NotificacaoDestinatarioTipo = "PETRVS" | "EMAIL" | "WHATSAPP";

export type NotificacaoDestinatarioOpcoes = {};

export class NotificacaoDestinatario extends Base {
    public notificacao?: Notificacao;
    public usuario?: Usuario;

    public tipo: NotificacaoDestinatarioTipo = "PETRVS"; // Tipo de envio da mensagem
    public data_leitura: Date | null = null; // Data e hora da leitura
    public data_envio: Date | null = null; // Data e hora do envio
    public opcoes: NotificacaoDestinatarioOpcoes = {}; // Opções
    public notificacao_id: string = "";
    public usuario_id: string = "";

    public constructor(data?: any) { super(); this.initialization(data); }
}
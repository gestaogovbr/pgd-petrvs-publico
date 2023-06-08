import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';

export type NotificacaoCodigo = "UNKNOW" | "DMD_" | "PENT_";

export class Notificacao extends Base {
    public codigo: NotificacaoCodigo = "UNKNOW"; // Código da mensagem;
    public data_registro: Date = new Date(); // Data e hora da inclusão da mensgaem
    public mensagem: string = ""; // Mensagem
    public numero: number = 0; // Número da mensagem (Gerado pelo sistema)

    public constructor(data?: any) { super(); this.initialization(data); }
}
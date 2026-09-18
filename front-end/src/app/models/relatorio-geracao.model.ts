import { Base } from './base.model';

export enum RelatorioGeracaoStatus {
    PROCESSANDO = 'PROCESSANDO',
    CONCLUIDA = 'CONCLUIDA',
    ERRO = 'ERRO',
}

export class RelatorioGeracao extends Base {
    public nome: string = '';
    public tipo: string = '';
    public status: RelatorioGeracaoStatus | string = '';
    public status_label: string = '';
    public iniciado_em: Date | null = null;
    public finalizado_em: Date | null = null;
    public arquivo_nome: string = '';
    public erro_mensagem: string = '';

    public constructor(data?: any) {
        super();
        this.initialization(data);
    }
}

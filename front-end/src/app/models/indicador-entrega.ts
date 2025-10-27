import { Base } from './base.model';

interface IndicadorEntregaEntrega {
    categoria: string;
    total: number;
}

interface IndicadorEntregaAvaliacao {
    categoria: string;
    total: number;
}

export class IndicadorEntrega extends Base {
    public entregas: IndicadorEntregaEntrega[] = [];
    public avaliacoes: IndicadorEntregaAvaliacao[] = [];

    public constructor(data?: any) { super(); this.initialization(data); }
}
import { Base } from './base.model';

interface IndicadorEntregaEntrega {
    categoria: string;
    total: number;
}

interface IndicadorEntregaAvaliacao {
    categoria: string;
    total: number;
}

interface IndicadorEntregaHoras {
    entregas: number;
    trabalhos: number;
}

export class IndicadorEntrega extends Base {
    public entregas: IndicadorEntregaEntrega[] = [];
    public avaliacoes: IndicadorEntregaAvaliacao[] = [];
    public desempenho: IndicadorEntregaHoras = { entregas: 0, trabalhos: 0 };

    public constructor(data?: any) { super(); this.initialization(data); }
}
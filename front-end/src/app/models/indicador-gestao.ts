import { Base } from './base.model';

export class IndicadorGestao extends Base {
    public usuarios: IndicadorGestaoUsuario = { totalParticipantes: 0, total: 0 };
    public unidades: IndicadorGestaoUnidade = { possui_PE: 0, total: 0 };

    public constructor(data?: any) { super(); this.initialization(data); }
}

export interface IndicadorGestaoUsuario {
  totalParticipantes: number;
  total: number;
}

export interface IndicadorGestaoUnidade {
  possui_PE: number;
  total: number;
}
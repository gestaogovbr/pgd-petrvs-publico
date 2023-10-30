import { Base } from './base.model';
import { EixoTematico } from './eixo-tematico.model';
import { PlanejamentoObjetivo } from './planejamento-objetivo.model';
import { Planejamento } from './planejamento.model';
import { PlanoEntregaEntregaObjetivo } from './plano-entrega-entrega-objetivo.model';
import { PlanoEntregaEntrega } from './plano-entrega-entrega.model';
import { Unidade } from './unidade.model';

export class PlanejamentoOkr extends PlanejamentoObjetivo {
    public unidadesComEntregas?: { unidade: Unidade, entregas: PlanoEntregaEntrega[] }[];


    public constructor(data?: any) { super(); this.initialization(data); }
}
import { Base } from './base.model';
import { EixoTematico } from './eixo-tematico.model';
import { Planejamento } from './planejamento.model';
import { PlanoEntregaEntregaObjetivo } from './plano-entrega-entrega-objetivo.model';

export class PlanejamentoObjetivo extends Base {
    public planejamento?: Planejamento;
    public eixo_tematico?: EixoTematico;
    public objetivo_pai?: PlanejamentoObjetivo;
    public objetivo_superior?: PlanejamentoObjetivo;
    public objetivos?: PlanejamentoObjetivo[];
    
    public nome: string = ""; /* Nome do objetivo */
    public fundamentacao: string = ""; /* Fundamentação para a definição do objetivo */
    public sequencia: number = 0; 
    public path: string | null = null; 
    public integra_okr: boolean = true; 

    public planejamento_id: string | null = null; 
    public eixo_tematico_id: string | null = null; 
    public objetivo_pai_id: string | null = null;
    public objetivo_superior_id: string | null = null;
    public objetivos_entrega?: PlanoEntregaEntregaObjetivo[] | null;

    public constructor(data?: any) { super(); this.initialization(data); }
}
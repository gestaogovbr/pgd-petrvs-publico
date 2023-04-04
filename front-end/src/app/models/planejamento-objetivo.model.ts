import { Base } from './base.model';
import { EixoTematico } from './eixo-tematico.model';
import { Planejamento } from './planejamento.model';

export class PlanejamentoObjetivo extends Base {
    public planejamento?: Planejamento;
    public eixo_tematico?: EixoTematico;
    public objetivo_superior?: PlanejamentoObjetivo;
        
    public data_inicio: Date = new Date();  /* Data de criação */
    public data_fim: Date | null = null;  /* Data final do registro */
    public nome: string = ""; /* Nome do objetivo */
    public fundamentacao: string = ""; /* Fundamentação para a definição do objetivo */
    public planejamento_id: string | null = null; 
    public eixo_tematico_id: string | null = null; 
    public objetivo_superior_id: string | null = null; 

    public constructor(data?: any) { super(); this.initialization(data); }
}
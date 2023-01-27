import { Base } from './base.model';
import { EixoTematico } from './eixo-tematico.model';
import { Planejamento } from './planejamento.model';

export class PlanejamentoObjetivo extends Base {
    public planejamento?: Planejamento;
    public eixo_tematico?: EixoTematico;
    public objetivo_pai?: PlanejamentoObjetivo;
        
    public data_inicio: Date = new Date();  /* Data de criação */
    public data_fim: Date | null = null;  /* Data final do registro */
    public sequencia: number = 0; /* Sequencia dentro do grupo */
    public path: string = ""; /* Path dos nós pais separados por /, ou null caso seja um nó raiz */
    public nome: string = ""; /* Nome do objetivo */
    public objetivos?: PlanejamentoObjetivo[];
    public planejamento_id: string = ""; 
    public eixo_tematico_id: string = ""; 
    public objetivo_pai_id: string = ""; 

    public constructor(data?: any) { super(); this.initialization(data); }
}
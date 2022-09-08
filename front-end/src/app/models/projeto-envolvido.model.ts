import { Base } from './base.model';
import { ProjetoRecurso } from './projeto-recurso.model';
import { ProjetoRegra } from './projeto-regra.model';
import { Projeto } from './projeto.model';

export class ProjetoEnvolvido extends Base {
    public projeto?: Projeto;
    public recurso?: ProjetoRecurso;
    public regra?: ProjetoRegra;

    public projeto_id: string = "";
    public recurso_id: string = "";
    public regra_id: string | null = null;

    constructor(){
        super();
    }

}

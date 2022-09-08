import { Base } from './base.model';
import { Usuario } from './usuario.model';
import { Projeto } from './projeto.model';
import { Demanda } from './demanda.model';
import { Unidade } from './unidade.model';
import { MaterialServico, MaterialServicoUnidade } from './material-servico.model';

export type ProjetoRecursoTipo = 'HUMANO' | 'MATERIAL' | 'SERVICO' | 'CUSTO' | 'DEPARTAMENTO';

export class ProjetoRecurso extends Base {
    public projeto?: Projeto;
    public usuario?: Usuario;
    public unidade?: Unidade;
    public material_servico?: MaterialServico;

    public nome: string = ""; /* Nome do recurso */
    public tipo: ProjetoRecursoTipo = "MATERIAL"; /* Tipo do recurso */
    public unidade_medida: MaterialServicoUnidade = "UNIDADE"; /* Unidade do recurso */
    public valor: number = 0; /* Valor de cursto do recurso */
    public data_inicio: Date = new Date(); /* Data de criação */
    public data_fim: Date | null = null; /* Data fonal do registro */

    public projeto_id: string = "";
    public usuario_id: string | null = null;
    public unidade_id: string | null = null;
    public material_servico_id: string | null = null;

    constructor(){
        super();
    }

}
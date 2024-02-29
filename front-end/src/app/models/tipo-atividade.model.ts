import { LookupItem } from '../services/lookup.service';
import { Base, IIndexable } from './base.model';
import { Md5 } from 'ts-md5/dist/md5';
import { Unidade } from './unidade.model';

export type Complexidade = {id: string, grau: string, fator: number, tempo: number, padrao: boolean};

export class TipoAtividade extends Base {
    public nome: string = "";  //Nome da classe de atividade
    public esforco: number = 8; //Tempo previsto para a execução da atividade (Horas decimais)
    public dias_planejado: number = 0; //Sugestão de dias para conclusão da atividade independente de quando iniciado (influência no prazo da atividade)
    public etiquetas: LookupItem[] = []; //Nome das etiquetas predefinidas para a atividade
    public checklist: LookupItem[] = []; //Nome dos checklist predefinidas para a atividade
    public comentario: string = ""; //Comentário predefinido para a atividade

    public constructor(data?: any) { super(); this.initialization(data); }
}

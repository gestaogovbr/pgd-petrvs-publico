import { TipoAtividade } from 'src/app/models/tipo-atividade.model';
import { LookupItem } from '../services/lookup.service';
import { Base, IIndexable } from './base.model';
import { Md5 } from 'ts-md5/dist/md5';
import { Unidade } from './unidade.model';

export type Complexidade = {id: string, grau: string, fator: number, tempo: number, padrao: boolean};

export class Atividade extends Base {
    public observacoes: string | null = null; /* Observação sobre o afastamento */
    public inicio_afastamento: Date = new Date(); /* Inicio do afastamento  */
    public tipoAtividade?: TipoAtividade;
    public unidade?: Unidade;

    public nome: string = "";  //Nome da classe de atividade
    public tempo_pactuado: number = 8; //Tempo previsto para a execução da atividade
    public dias_planejado: number = 0; //Tempo em dias previsto para a atividade
    public tempo_minimo: number = 20; //Tempo despendido mínimo aceitável para a atividade (% do tempo pactuado)
    public recalcula_prazo: number = 0; //Recalcular o prazo de entrega depois de iniciada a demanda
    public desativa_produtividade: number = 0; //Desativar o cálculo de produtividade e controle de tempo de execução (para atividades do tipo monitoramento)
    public complexidade: Complexidade[] = [
      /*{id: Md5.hashStr(Math.random().toString()), grau: "Muito baixo", fator: 0.25, tempo: 2, padrao: false},
      {id: Md5.hashStr(Math.random().toString()), grau: "Baixo", fator: 0.5, tempo: 4, padrao: false},*/
      {id: Md5.hashStr(Math.random().toString()), grau: "Médio", fator: 1, tempo: 8, padrao: true}/*,
      {id: Md5.hashStr(Math.random().toString()), grau: "Alto", fator: 2, tempo: 16, padrao: false},
      {id: Md5.hashStr(Math.random().toString()), grau: "Muito alto", fator: 4, tempo: 32, padrao: false}*/
    ]; //Graus de complexidade da atividade (complexidade, fator, tempo_pactuado, default)
    //public tipo_processo_id: string = ""; //Configuração predefinidos de tipos associados de processos do Sei
    public tipos_processo: LookupItem[] = []; //Configuração predefinidos de tipos associados de processos do Sei
    public etiquetas_predefinidas: LookupItem[] = []; //Nome das etiquetas predefinidas para a demanda
    public checklist_predefinidos: LookupItem[] = []; //Nome dos checklist predefinidas para a demanda
    public comentario_predefinido: string = ""; //Comentário predefinido para a demanda
    public parametros_adotados: LookupItem[] = []; //Parametros adotados para definir a entrega da atividade (textual, para cumprir a IN65/2020-ME)
    public entregas_esperadas: LookupItem[] = []; //Quais as entregas esperadas (textual, para cumprir a IN65/2020-ME)
    public homologado: number = 0; //Se a atividade foi homologada pela unidade gestora do teletrabalho
    public data_homologacao: Date = new Date() //Data em que houve a homologação
    public data_inicio: Date = new Date(); //Data inicio da vigência
    public data_fim: Date | null = null; //Data final da vigência
    public unidade_id: string = "";
    public tipo_atividade_id: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}

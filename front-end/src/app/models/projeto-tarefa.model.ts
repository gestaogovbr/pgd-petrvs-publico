import { Base } from './base.model';
import { Usuario } from './usuario.model';
import { HasAlocacoes, HasTarefas, Projeto } from './projeto.model';
import { Atividade } from './atividade.model';
import { ProjetoAlocacao } from './projeto-alocacao.model';
import { LookupItem } from '../services/lookup.service';
import { Comentario, HasComentarios } from './comentario';
import { Documento } from './documento.model';

export type ProjetoTarefaStatus = "PLANEJADO" | "INICIADO" | "CONCLUIDO" | "FALHO" | "SUSPENSO" | "CANCELADO" | "AGUARDANDO";

export class ProjetoTarefa extends Base implements HasComentarios, HasAlocacoes, HasTarefas {
    public projeto?: Projeto;
    public tarefa_pai?: ProjetoTarefa;
    public terefa_projeto?: Projeto;
    public atividade?: Atividade;
    public usuario?: Usuario;
    public documento?: Documento;
    public alocacoes?: ProjetoAlocacao[];

    public indice: number = 0; /* Indice da sequencia da tarefa */
    public path: string = ""; /* Path dos nós pais */
    public nome: string = ""; /* Nome da tarefa */
    public descricao: string = ""; /* Descricao da tarefa */
    public data_inicio: Date = new Date(); /* Início da tarefa */
    public data_fim: Date = new Date(); /* Final da tarefa */
    public data_inicio_baseline: Date | null = null;  /* Início do projeto (Baseline) */
    public data_fim_baseline: Date | null = null;  /* Final do projeto (Baseline) */
    public duracao: number = 0.00; /* Duração da atividade. Se a duração for 0 e sintéfico for falso então irá se comportar apenas como um grupo */
    public progresso: number = 0.00; /* Percentual de progresso da tarefa */
    public inicio_marco: boolean = false; /* Se o início é um marco */
    public termino_marco: boolean = false; /* Se o término é um marco */
    public tem_filhos: boolean = false; /* Se é um registro sintético (resumo) */
    public agrupador: boolean = false; /* Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso) */
    public soma_progresso_filhos: boolean = true; /* Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos) */
    public status: ProjetoTarefaStatus = "PLANEJADO"; /* Status */
    public contraido: boolean = false; /* Se esta contraído */
    public custo: number = 0.00; /* Custo: Será a soma dos recursos, sou a soma dos filhos caso temFilhos e sintetico */
    public calcula_intervalo: boolean = true; /* Se calcula o início e término automaticamente pelos filhos (somente se tem_filhos) */
    public aloca_proprios_recursos: boolean = true; /* Se possui recursos próprios (somente se tem_filhos) */
    public soma_recusos_alocados_filhos: boolean = true; /* Mostra o somatório dos recursos filhos (somente se tem_filhos) */
    public custos_proprios: boolean = true; /* Se possui custos próprios (somente se tem_filhos) */
    public soma_custos_filhos: boolean = true; /* Se possui custos filhos (somente se tem_filhos) */
    public etiquetas: LookupItem[] = []; /* Etiquetas */
    public comentarios: Comentario[] = []; /* Comentarios do projeto */

    public projeto_id: string = "";
    public tarefa_pai_id: string | null = null;
    public terefa_projeto_id: string | null = null; /* Projeto que será incorporado como uma tarefa */
    public atividade_id: string = "";
    public usuario_id: string | null = null;
    public documento_id: string | null = null;

    public constructor(data?: any) { super(); this.initialization(data); }
}

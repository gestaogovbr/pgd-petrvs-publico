import { Base } from './base.model';
import { Usuario } from './usuario.model';
import { TipoProjeto } from './tipo-projeto.model';
import { ProjetoRegra } from './projeto-regra.model';
import { ProjetoRecurso } from './projeto-recurso.model';
import { ProjetoAlocacao } from './projeto-alocacao.model';
import { ProjetoTarefa } from './projeto-tarefa.model';
import { KanbanDocker } from '../components/kanban/kanban.component';
import { Comentario, HasComentarios } from './comentario';
import { Expediente } from './expediente.model';
import { ProjetoFase } from './projeto-fase.model';

export type ProjetoStatus = 'PLANEJADO' | 'INICIADO' | 'CONCLUIDO' | 'SUSPENSO' | 'CANCELADO';

export interface HasAlocacoes {
    id: string; /* Id do Projeto ou da Tarefa */
    aloca_proprios_recursos: boolean; /* Se possui recursos próprios */
    soma_recusos_alocados_filhos: boolean; /* Mostra o somatório dos recursos filhos */
    custos_proprios: boolean; /* Se possui custos próprios */
    soma_custos_filhos: boolean; /* Se possui custos filhos */
    custo: number;  /* Custo do projeto */
    alocacoes?: ProjetoAlocacao[]; /* Alocacoes */
}

export interface HasTarefas {
    tarefas?: ProjetoTarefa[]; /* Tarefas */
    calcula_intervalo: boolean; /* Se o termino é calculado automaticamente pelas tarefas */
    soma_progresso_filhos: boolean; /* Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos) */
    agrupador: boolean; /* Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso) */
    inicio?: Date;  /* Inicio do projeto */
    termino?: Date;  /* Fim do projeto */
    duracao: number; /* Duração do projeto */
    progresso: number; /* Percentual de progresso do projeto */
}

export class Projeto extends Base implements HasComentarios, HasAlocacoes, HasTarefas {
    public tipo_projeto?: TipoProjeto;
    public usuario?: Usuario;
    public regras?: ProjetoRegra[];
    public recursos?: ProjetoRecurso[];
    public alocacoes?: ProjetoAlocacao[];
    public tarefas?: ProjetoTarefa[];
    public fase?: ProjetoFase;

    public numero: number = 0;  /* Número do projeto */
    public nome: string = "";  /* Nome do projeto */
    public descricao: string = "";  /* Descrição do projeto */
    public finalidade: string = "";  /* Descrição do projeto */
    public status: ProjetoStatus = 'PLANEJADO';  /* Status do projeto */
    public data_inicio: Date = new Date();  /* Data de criação */
    public data_fim: Date | null = null;  /* Data final do registro */
    public inicio?: Date = new Date();  /* Inicio do projeto */
    public termino?: Date = new Date();  /* Fim do projeto */
    public inicio_baseline: Date | null = null;  /* Inicio do projeto (Baseline) */
    public termino_baseline: Date | null = null;  /* Fim do projeto (Baseline) */
    public custo: number = 0;  /* Custo do projeto */
    public calcula_custos: boolean = true; /* Se o projeto calcula custos */
    public tempo_corrido: boolean = false; /* Se o tempo é corrido ou usa a configuração de fins de semana, feriados e horário do expediente (quando usar horas) */
    public usa_horas: boolean = false; /* Se usa horas nas datas */
    public usa_baseline: boolean = true; /* Se usa baseline */
    public calcula_intervalo: boolean = true; /* Se o termino é calculado automaticamente pelas tarefas */
    public agrupador: boolean = false; /* Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso) */
    public soma_progresso_filhos: boolean = true; /* Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos) */
    public aloca_proprios_recursos: boolean = true; /* Se possui recursos próprios */
    public soma_recusos_alocados_filhos: boolean = true; /* Mostra o somatório dos recursos filhos */
    public custos_proprios: boolean = true; /* Se possui custos próprios */
    public soma_custos_filhos: boolean = true; /* Se possui custos filhos */
    public duracao: number = 0.00; /* Duração do projeto */
    public progresso: number = 0.00; /* Percentual de progresso do projeto */
    public expediente: Expediente | null = null; /* Configuração do expediente */
    public usuario_id: string | null = null;
    public tipo_projeto_id: string | null = null;
    public fase_id: string | null = null;
    public kanban_dockers: KanbanDocker[] = [];
    public comentarios: Comentario[] = []; /* Comentarios do projeto */
    public fases: ProjetoFase[] = [];

    public constructor(data?: any) { super(); this.initialization(data); }
}

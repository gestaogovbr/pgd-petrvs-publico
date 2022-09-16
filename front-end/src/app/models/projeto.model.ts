import { Base } from './base.model';
import { Usuario } from './usuario.model';
import { TipoProjeto } from './tipo-projeto.model';
import { ProjetoEnvolvido } from './projeto-envolvido.model';
import { ProjetoRegra } from './projeto-regra.model';
import { ProjetoRecurso } from './projeto-recurso.model';
import { ProjetoAlocacao } from './projeto-alocacao.model';
import { ProjetoTarefa } from './projeto-tarefa.model';
import { KanbanDocker } from '../components/kanban/kanban.component';

export type ProjetoStatus = 'PLANEJADO' | 'INICIADO' | 'CONCLUIDO' | 'SUSPENSO' | 'CANCELADO';

export class Projeto extends Base {
    public tipo_projeto?: TipoProjeto;
    public usuario?: Usuario;
    public envolvidos?: ProjetoEnvolvido[];
    public regras?: ProjetoRegra[];
    public recursos?: ProjetoRecurso[];
    public alocacoes?: ProjetoAlocacao[];
    public tarefas?: ProjetoTarefa[];

    public numero: number = 0;  /* Número do projeto */
    public nome: string = "";  /* Nome do projeto */
    public descricao: string = "";  /* Descrição do projeto */
    public finalidade: string = "";  /* Descrição do projeto */
    public status: ProjetoStatus = 'PLANEJADO';  /* Status do projeto */
    public data_inicio: Date = new Date();  /* Data de criação */
    public data_fim: Date | null = null;  /* Data final do registro */
    public inicio: Date = new Date();  /* Inicio do projeto */
    public termino: Date = new Date();  /* Fim do projeto */
    public custo: number = 0;  /* Custo do projeto */
    public calcula_custos: boolean = true; /* Se o projeto calcula custos */
    public tempo_corrido: boolean = false; /* Se o tempo é corrido ou usa a configuração de fins de semana, feriados e horário do expediente (quando usar horas) */
    public usar_horas: boolean = true; /* Se usa horas nas datas */
    public calcula_intervalo: boolean = true; /* Se o termino é calculado automaticamente pelas tarefas */
    public agrupador: boolean = false; /* Se é apenas um registro para agrupar tarefas filhas (somente se tem_filhos e não possui progresso) */
    public soma_progresso_filhos: boolean = true; /* Se o progresso é calculado pela média do progresso dos filhos ou lançado manual (somente se tem_filhos) */
    public aloca_proprios_recursos: boolean = true; /* Se possui recursos próprios */
    public soma_recusos_alocados_filhos: boolean = true; /* Mostra o somatório dos recursos filhos */
    public custos_proprios: boolean = true; /* Se possui custos próprios */
    public soma_custos_filhos: boolean = true; /* Se possui custos filhos */
    public duracao: number = 0.00; /* Duração do projeto */
    public progresso: number = 0.00; /* Percentual de progresso do projeto */
    public usuario_id: string | null = null;
    public tipo_projeto_id: string = "";
    public kanban_dockers: KanbanDocker[] = [];

    public constructor(data?: any) { super(); this.initialization(data); }
}

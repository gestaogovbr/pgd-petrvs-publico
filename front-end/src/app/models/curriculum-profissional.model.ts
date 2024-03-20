import { LookupItem } from '../services/lookup.service';
import { Base } from './base.model';
import { Cargo } from './cargo.model';
import { CentroTreinamento } from './centro-treinamento.model';
import { Curriculum } from './curriculum.model';
import { GrupoEspecializado } from './grupo-especializado.model';
import { HistoricoAtividadeExterna } from './historico-atividade-externa.model';
import { HistoricoAtividadeInterna } from './historico-atividade-interna.model';
import { HistoricoCursoExterno } from './historico-curso-externo.model';
import { HistoricoCursoInterno } from './historico-curso-interno.model';
import { HistoricoDocenciaExterna } from './historico-docencia-externa.model';
import { HistoricoDocenciaInterna } from './historico-docencia-interna.model';
import { HistoricoFuncao } from './historico-funcao.model';
import { HistoricoLotacao } from './historico-lotacao.model';
import { Unidade } from './unidade.model';

export class CurriculumProfissional extends Base {

  public curriculum?: Curriculum;
  public centro_treinamento?: CentroTreinamento;
  public cargo?: Cargo;
  public grupo_especializado?: GrupoEspecializado;
  public unidade_atual?: Unidade; //lotacao atual

  public historicos_funcoes: HistoricoFuncao[] = [];
  public historicos_lotacoes: HistoricoLotacao[] = [];// Unidades de lotação em toda carreira
  public historicos_atividades_externas: HistoricoAtividadeExterna[] = [];//Atividades desempenhadas externamente que podem contribuir para intituição
  public historicos_atividades_internas: HistoricoAtividadeInterna[] = [];//Atividades desempenhadas internamente que podem contribuir para intituição
  public historicos_docencias_externas: HistoricoDocenciaExterna[] = [];// Já foi docente fora da instituição
  public historicos_docencias_internas: HistoricoDocenciaInterna[] = [];// Já foi docente fora da instituição
  public historicos_cursos_externos: HistoricoCursoExterno[] = [];//Quais cursos você já fez e quais pretende fazer fora da Instituição
  public historicos_cursos_internos: HistoricoCursoInterno[] = [];//Quais os principais cursos que você já fez e pretende fazer na Instituição

  public ano_ingresso: number = 0; //Ano de ingresso na instituição
  public lotacao_atual: string = "";//Lotação atual do servidor
  public especifique_habilidades: LookupItem[] = [];//Atividades desempenhadas internamente que podem contribuir para intituição
  public viagem_nacional: number = 0;//Já fez viagem nacional a trabalho
  public viagem_internacional: number = 0; //Já fez viagem internacional a trabalho
  public interesse_bnt: number = 0; //Você tem interesse na participação do Banco Nacional de Talentos -PRF
  public pgd_inserido: string = ""; // Está ou não inserido no PGD da instituição e qual modalidade
  public pgd_interesse: string = "";//Tem interesse ou não no PGD da instituição e qual modalidade
  public telefone: string = "";// Telefone do chefe imediato caso tenha interesse no PGD
  public remocao: number = 0; // Tem interesse em remoção

  public curriculum_id?: string = ""; //ID Curriculum
  public centro_treinamento_id: string | null = null; //ID do CT 
  public cargo_id: string = ""; //ID do Cargo
  public grupo_especializado_id: string | null = null; //ID do Grupo Especializado

  public constructor(data?: any) { super(); this.initialization(data); }
}


import { AreaAtividadeExternaRoutingModule } from '../modules/cadastros/curriculum/area-atividade-externa/area-atividade-externa-routing.module';
import { LookupItem } from '../services/lookup.service';
import { AreaConhecimento } from './area-conhecimento.model';
import { Base } from './base.model';
import { Cargo } from './cargo.model';
import { CentroTreinamento } from './centro-treinamento.model';
import { Curriculum } from './currriculum.model';
import { GrupoEspecializado } from './grupo-especializado.model';
import { HistoricoAtividadeExternaCurriculum } from './historico-atividade-externa-currriculum.model';
import { HistoricoAtividadeInternaCurriculum } from './historico-atividade-interna-currriculum.model';
import { HistoricoCursoExternoCurriculum } from './historico-curso-externo-currriculum.model';
import { HistoricoCursoInternoCurriculum } from './historico-curso-interno-currriculum.model';
import { HistoricoDocenciaExternaCurriculum } from './historico-docencia-externa-currriculum.model';
import { HistoricoDocenciaInternaCurriculum } from './historico-docencia-interna-currriculum.model';
import { HistoricoFuncaoCurriculum } from './historico-funcao-currriculum.model';
import { HistoricoLotacaoCurriculum } from './historico-lotacao-currriculum.model';
import { Unidade } from './unidade.model';

export class CurriculumProfissional extends Base {

    public curriculum?: Curriculum;
    public centro_treinamento?:CentroTreinamento;
    public cargo?:Cargo;
    public grupo_especializado?:GrupoEspecializado;
    public area_conhecimento?: AreaConhecimento;
    public unidade?:Unidade;//lotacao atual
   
    public historico_funcao: HistoricoFuncaoCurriculum[] = [];
    public historico_lotacao: HistoricoLotacaoCurriculum[] = [];// Unidades de lotação em toda carreira
    public historico_atividade_externa: HistoricoAtividadeExternaCurriculum[] = [];//Atividades desempenhadas externamente que podem contribuir para intituição
    public historico_atividade_interna: HistoricoAtividadeInternaCurriculum[] = [];//Atividades desempenhadas internamente que podem contribuir para intituição
    public historico_docencia_externa: HistoricoDocenciaExternaCurriculum[] = [];// Já foi docente fora da instituição
    public historico_docencia_interna: HistoricoDocenciaInternaCurriculum[] = [];// Já foi docente fora da instituição
    public historico_curso_externo: HistoricoCursoExternoCurriculum[] = [];//Quais cursos você já fez e quais pretende fazer fora da Instituição
    public historico_curso_interno: HistoricoCursoInternoCurriculum[] = [];//Quais os principais cursos que você já fez e pretende fazer na Instituição
   
    public ano_ingresso: number = 0; //Ano de ingresso na instituição
    public lotacao_atual: string = "";//Lotação atual do servidor
    public especifique_habilidades: LookupItem[] = [];//Atividades desempenhadas internamente que podem contribuir para intituição
    public viagem_nacional : number = 0;//Já fez viagem nacional a trabalho
    public viagem_internacional: number = 0; //Já fez viagem internacional a trabalho
    public interesse_bnt: number = 0; //Você tem interesse na participação do Banco Nacional de Talentos -PRF
    public pgd_inserido: string = ""; // Esta ou não inserido no PGD da instituição e qual modalidade
    public pgd_interesse: string = "";//Tem interesse ou não no PGD da instituição e qual modalidade
    public telefone: string = "";// Telefone do chefe imediato caso tenha interesse no PGD
    public remocao: number = 0; // Tem interesse em remoção
        
    public curriculum_id? : string= ""; //ID Curriculum
    public centro_treinamento_id: string = ""; //ID do CT 
    public cargo_id: string = ""; //ID do Cargo
    public grupo_especializado_id: string = ""; //ID do Grupo Especializado
    public area_conhecimento_id: string = ""

            
    public constructor(data?: any) { super(); this.initialization(data); }
}


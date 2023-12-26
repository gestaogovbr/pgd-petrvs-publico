import { Base } from './base.model';
import { Cargo } from './cargo.model';
import { CentroTreinamento } from './centro-treinamento.model';
import { Curriculum } from './currriculum.model';
import { GrupoEspecializado } from './grupo-especializado.model';

export class CurriculumProfissional extends Base {

    public curriculum?: Curriculum;
    public centro_treinamento?:CentroTreinamento;
    public cargo?:Cargo;
    public grupo_especializado?:GrupoEspecializado;

    public ano_ingresso: string = ""; //Ano de ingresso na instituição
    public lotacao_atual: string = "";//Lotação atual do servidor
    public pgd_inserido: string = ""; // Esta ou não inserido no PGD da instituição e qual modalidade
    public pgd_interesse: string = "";//Tem interesse ou não no PGD da instituição e qual modalidade
    public telefone: string = "";// Telefone do chefe imediato caso tenha interesse no PGD
   
    public funcoes: [] = [];// Funções ocupadas em toda carreira como titular ou substituto
    public unidades_lotado: [] = [];// Unidades de lotação em toda carreira
    public atividades_fora: [] = [];//Atividades desempenhadas externamente que podem contribuir para intituição
    public atividades_internas: [] = [];//Atividades desempenhadas internamente que podem contribuir para intituição
    public especifique_habilidades: [] = [];//Atividades desempenhadas internamente que podem contribuir para intituição
    public docencia_fora: [] = [];// Já foi docente fora da instituição
    public docencia_interna: [] = [];// Já foi docente na instituição
    public curso_fora: [] = [];//Quais cursos você já fez e quais pretende fazer fora da Instituição
    public curso_interno: [] = [];//Quais os principais cursos que você já fez e pretende fazer na Instituição
   
    public viagem_nacional : number = 0;//Já fez viagem nacional a trabalho
    public viagem_internacional: number = 0; //Já fez viagem internacional a trabalho
    public interesse_bnt: number = 0; //Você tem interesse na participação do Banco Nacional de Talentos -PRF
    public remocao: number = 0; // Tem interesse em remoção
        
    public curriculum_id? : string= ""; //ID Curriculum
    public centro_treinamento_id: string = ""; //ID do CT 
    public cargo_id: string = ""; //ID do Cargo
    public grupo_especializado_id: string = ""; //ID do Grupo Especializado
            
    public constructor(data?: any) { super(); this.initialization(data); }
}

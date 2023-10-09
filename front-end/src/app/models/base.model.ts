export interface IIndexable {
    [key: string]: any;
}

export type EntityStatus = "ADD" | "EDIT" | "DELETE";

export type IntegranteAtribuicao = "LOTADO" | "GESTOR" | "COLABORADOR" | "GESTOR_DELEGADO" | "GESTOR_SUBSTITUTO" | "AVALIADOR_PLANO_ENTREGA" | "AVALIADOR_PLANO_TRABALHO" | "HOMOLOGADOR_PLANO_ENTREGA";

export abstract class Base implements IIndexable {
    public id: string = "";
    public created_at: Date = new Date();
    public updated_at: Date = new Date();
    public deleted_at: Date | null = null;
    public _status?: EntityStatus; /* Usado somente pelos componentes da UX */ 
    public _metadata?: any; /* Usado exclusivamente para armazenar dados adicionar */ 

    public initialization(data?: any) {
        if(data) Object.assign(this, data);
    }
}
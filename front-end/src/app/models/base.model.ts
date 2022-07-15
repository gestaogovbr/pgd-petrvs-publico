export interface IIndexable {
    [key: string]: any;
}

export type EntityStatus = "ADD" | "EDIT" | "DELETE";

export abstract class Base implements IIndexable {
    public id: string = "";
    public created_at: Date = new Date();
    public updated_at: Date = new Date();
    public _status?: EntityStatus; /* Usado somente pelos componentes da UX */ 

    constructor(){}
}
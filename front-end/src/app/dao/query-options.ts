import { QueryOrderBy } from "./dao-base.service";

export class QueryOptions {
    public where?: any;
    public orderBy?: QueryOrderBy[];
    public limit?: number;
    public deleted?: boolean;
    public join?: string[];
    
    constructor(data?: any) {
        if(data) Object.assign(this, data);
    }
}
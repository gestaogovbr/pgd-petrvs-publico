export type GanttTaskStatus = "STATUS_ACTIVE" | "STATUS_DONE" | "STATUS_FAILED" | "STATUS_SUSPENDED" | "STATUS_WAITING" | "STATUS_UNDEFINED";

export type GanttResourceUnity = "UNITY"  | "BOX"  | "METER" | "KILO" | "LITER" | "DOZEN" | "CURRENCY" | "HOUR" | "DAY" | "PACKAGE";

export type GanttResourceType = "MATERIAL" | "SERVICE" | "HUMAN" | "COST" | "DEPARTMENT";

/*export abstract class GanttBase {
    public constructor(data?: any) { if(data) Object.assign(this, data); }
    public initialization(data?: any) {
        if(data) Object.assign(this, data);
    }
}*/

export class GanttProject {
    public tasks: GanttTask[] = [];
    public resources: GanttResource[] = [];
    public roles: GanttRole[] = [];

    public constructor(data?: any) { if(data) Object.assign(this, data); }
}

export class GanttAssignment {
    public id?: string = "";
    public resource_id: string = "";
    //public resource?: GanttResource;
    public role_id?: string = undefined;
    public description: string = "";
    public quantity: number = 1;
    
    public constructor(data?: any) { if(data) Object.assign(this, data); }
}

export class GanttTask {
    public id: string = "";
    public index?: number = undefined;
    public name: string = "";
    public description: string = "";
    public extra?: any = undefined;
    public progress?: number = 100;
    public start: Date = new Date();
    public end: Date = new Date();
    public duration: number = 0;
    public startIsMilestone?: boolean = false;
    public endIsMilestone?: boolean = false;  
    public hasChild?: boolean = false;
    public tasks?: GanttTask[] = [];
    public status?: GanttTaskStatus = "STATUS_ACTIVE";
    public dependencies_ids?: string[] = [];
    public assignments?: GanttAssignment[] = [];
    public collapsed?: boolean = false;
    
    public constructor(data?: any) { if(data) Object.assign(this, data); }
}

export class GanttResource {
    public id: string = "";
    public name: string = "";
    public extra: any = undefined;
    public picture: string = ""; 
    public type: GanttResourceType = "MATERIAL";
    public unityCost: number = 0.00;
    public unity: GanttResourceUnity = "UNITY";
    
    public constructor(data?: any) { if(data) Object.assign(this, data); }
}

export class GanttRole {
    public id: string = "";
    public name: string = "";
    public extra: any = undefined;
    
    public constructor(data?: any) { if(data) Object.assign(this, data); }
}
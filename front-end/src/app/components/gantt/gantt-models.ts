import { GanttComponent } from "./gantt.component";

export type GanttTaskStatus = "STATUS_ACTIVE" | "STATUS_DONE" | "STATUS_FAILED" | "STATUS_SUSPENDED" | "STATUS_WAITING" | "STATUS_UNDEFINED";

export type GanttResourceUnity = "UNITY"  | "BOX"  | "METER" | "KILO" | "LITER" | "DOZEN" | "CURRENCY" | "HOUR" | "DAY" | "PACKAGE";

export type GanttResourceType = "MATERIAL" | "SERVICE" | "HUMAN" | "COST" | "DEPARTMENT";

/*export abstract class GanttBase {
    public constructor(data?: any) { if(data) Object.assign(this, data); }
    public initialization(data?: any) {
        if(data) Object.assign(this, data);
    }
}*/

export class GanttConfig {
    public hasTime: boolean = false;
    public hasCost: boolean = false;
}

export class GanttProject {
    public tasks: GanttTask[] = []; /* Todas as Tasks em formato de lista */
    public resources: GanttResource[] = [];
    public roles: GanttRole[] = [];
    /* Native Gantt properties */
    public selectedRow: number = 1;
    public deletedTaskIds: string[] = [];
    public serverTimeOffset?: number = undefined;
    public canWriteOnParent: boolean = true;
    public canWrite: boolean = true;
    public canAdd: boolean = false;
    public canDelete: boolean = false;
    public canInOutdent: boolean = false;
    public canMoveUpDown: boolean = true;
    public canSeePopEdit: boolean = false;
    public canSeeFullEdit: boolean = false;
    public canSeeDep: boolean = true;
    public canSeeCriticalPath: boolean = true;
    public canAddIssue: boolean = false;
    public cannotCloseTaskIfIssueOpen: boolean = false;
    public zoom?: string;
    /* Petrvs config */
    public config: GanttConfig = new GanttConfig();
    public dirty?: boolean;
    public root: GanttTask[] = []; /* Tasks em formato de arvore */

    public constructor(data?: any) { if(data) Object.assign(this, data); }
}

export class GanttAssignment {
    public id?: string = "";
    public resourceId: string = "";
    public extra?: any = undefined;
    public roleId?: string = undefined;
    public description: string = "";
    public effort: number = 0;
    public quantity: number = 1;
    
    public constructor(data?: any) { if(data) Object.assign(this, data); }
}

export class GanttTask {
    public id: string = "";
    public index?: number = undefined;
    public level: number = 0;
    public relevance: number = 0;
    public code: string = "";
    public name: string = "";
    public description: string = "";
    public type: string = "";
    public typeId: string = "";
    public extra?: any = undefined;
    public progress: number = 100;
    public start: Date = new Date();
    public end: Date = new Date();
    public duration: number = 0;
    public startIsMilestone: boolean = false;
    public endIsMilestone: boolean = false;  
    public hasChild: boolean = false;
    public collapsed: boolean = false;
    public progressByWorklog: boolean = false;
    public status: GanttTaskStatus = "STATUS_ACTIVE";
    public depends = "";
    public assigs: GanttAssignment[] = [];
    public master: any;
    public rowElement: any; //row editor html element
    public ganttElement: any; //gantt html element
    public canWrite: boolean = true;
    public canAdd: boolean = false;
    public canDelete: boolean = false;
    public canAddIssue: boolean = false;
    /* Petrvs */
    public ganttComponet?: GanttComponent;
    public isGroup?: boolean = false;
    public tasks?: GanttTask[] = [];
    public dependencies_ids?: string[] = [];
    public startBaseline?: Date = undefined;
    public endBaseline?: Date = undefined;
    
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

export class GanttLink {
    public from?: GanttTask;
    public to?: GanttTask;
    public lag: number = 0;
    public extra: any;

    public constructor(data?: any) { if(data) Object.assign(this, data); }
} 

export type GanttTaskStatus = "STATUS_ACTIVE" | "STATUS_DONE" | "STATUS_FAILED" | "STATUS_SUSPENDED" | "STATUS_WAITING" | "STATUS_UNDEFINED";

export class GanttAssignment {
    id?: string = "";
    resource_id?: string = "";
    resource?: GanttResource;
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
}

export class GanttResource {
    public id: string = "";
    public name: string = "";
    public picture: string = "";
}
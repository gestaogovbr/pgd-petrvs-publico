export class GanttAssignment {
    public id: string = "";
    public name: string = "";
    public picture: string = "";
}

export class GanttTask {
    public id: string = "";
    public name: string = "";
    public description: string = "";
    public extra: any = undefined;
    public progress: number = 0;
    public start: Date = new Date();
    public end: Date = new Date();
    public hasChild: boolean = false;
    public children: GanttTask[] = [];
    public assignment: GanttAssignment[] = [];
}